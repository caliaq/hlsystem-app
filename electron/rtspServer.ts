import express from 'express';
import { Server } from 'http';
import { WebSocketServer } from 'ws';
import { spawn, ChildProcess } from 'child_process';
import { createServer } from 'http';
import path from 'path';
import { execSync } from 'child_process';
import { promisify } from 'util';
import { exec } from 'child_process';

const execAsync = promisify(exec);

// Get FFmpeg path
function getFFmpegPath(): string {
  // Try simple 'ffmpeg' command first
  try {
    execSync('ffmpeg -version', { stdio: 'ignore', timeout: 5000 });
    console.log('FFmpeg found in PATH');
    return 'ffmpeg';
  } catch (e) {
    console.log('FFmpeg not found in PATH');
  }
  
  // Try common installation paths
  const commonPaths = [
    'C:\\ffmpeg\\bin\\ffmpeg.exe',
    'C:\\ffmpeg\\ffmpeg-2025-07-10-git-82aeee3c19-essentials_build\\bin\\ffmpeg.exe',
    'C:\\Program Files\\ffmpeg\\bin\\ffmpeg.exe',
    'C:\\Program Files (x86)\\ffmpeg\\bin\\ffmpeg.exe',
  ];
  
  for (const testPath of commonPaths) {
    try {
      console.log('Testing FFmpeg path:', testPath);
      execSync(`"${testPath}" -version`, { stdio: 'ignore', timeout: 5000 });
      console.log('FFmpeg found at:', testPath);
      return testPath;
    } catch (e) {
      console.log('FFmpeg not found at:', testPath);
      continue;
    }
  }
  
  // As a last resort, try to find a working FFmpeg from common download locations
  const downloadPaths = [
    'C:\\Users\\%USERNAME%\\Downloads\\ffmpeg\\bin\\ffmpeg.exe',
    'C:\\Tools\\ffmpeg\\bin\\ffmpeg.exe',
    'C:\\ffmpeg-master-latest-win64-gpl\\bin\\ffmpeg.exe',
  ];
  
  for (const testPath of downloadPaths) {
    try {
      const expandedPath = testPath.replace('%USERNAME%', process.env.USERNAME || '');
      console.log('Testing download path:', expandedPath);
      execSync(`"${expandedPath}" -version`, { stdio: 'ignore', timeout: 5000 });
      console.log('FFmpeg found at:', expandedPath);
      return expandedPath;
    } catch (e) {
      continue;
    }
  }
  
  throw new Error('FFmpeg not found. Please install FFmpeg:\\n' +
    '1. Download from https://ffmpeg.org/download.html\\n' +
    '2. Extract to C:\\\\ffmpeg\\\\ or add to PATH\\n' +
    '3. Or try: winget install Gyan.FFmpeg');
}

interface StreamInstance {
  ffmpegProcess: ChildProcess;
  server: Server;
  wsServer: WebSocketServer;
  port: number;
}


// Test RTSP connectivity
async function testRTSPConnection(rtspUrl: string, timeoutMs = 10000): Promise<{
  success: boolean;
  error?: string;
  details?: string;
}> {
  return new Promise((resolve) => {
    const ffmpegPath = getFFmpegPath();
    
    // Use FFprobe to test RTSP connection
    const testProcess = spawn(ffmpegPath, [
      '-rtsp_transport', 'tcp',
      '-i', rtspUrl,
      '-t', '1', // Test for 1 second
      '-f', 'null',
      '-'
    ]);

    let hasResponded = false;
    const timeout = setTimeout(() => {
      if (!hasResponded) {
        hasResponded = true;
        testProcess.kill();
        resolve({
          success: false,
          error: 'Connection timeout',
          details: `RTSP stream did not respond within ${timeoutMs}ms`
        });
      }
    }, timeoutMs);

    let errorOutput = '';
    testProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    testProcess.on('exit', (code) => {
      if (!hasResponded) {
        hasResponded = true;
        clearTimeout(timeout);
        
        if (code === 0 || errorOutput.includes('frame=')) {
          resolve({ success: true });
        } else {
          resolve({
            success: false,
            error: `FFmpeg exit code: ${code}`,
            details: errorOutput.substring(0, 500) // Limit error output
          });
        }
      }
    });

    testProcess.on('error', (error) => {
      if (!hasResponded) {
        hasResponded = true;
        clearTimeout(timeout);
        resolve({
          success: false,
          error: error.message,
          details: 'Failed to start FFmpeg process'
        });
      }
    });
  });
}

export class RTSPStreamServer {
  private streams: Map<string, StreamInstance> = new Map();
  private basePort = 9999;
  private currentPort = this.basePort;

  // Run system diagnostics
  private async runDiagnostics(): Promise<{
    ffmpegAvailable: boolean;
    ffmpegVersion: string | null;
    networkInfo: any;
    systemInfo: any;
  }> {
    const diagnostics = {
      ffmpegAvailable: false,
      ffmpegVersion: null as string | null,
      networkInfo: {},
      systemInfo: {}
    };

    // Check FFmpeg
    try {
      const ffmpegPath = getFFmpegPath();
      const { stdout } = await execAsync(`"${ffmpegPath}" -version`);
      diagnostics.ffmpegAvailable = true;
      diagnostics.ffmpegVersion = stdout.split('\n')[0];
      console.log('✅ FFmpeg available:', diagnostics.ffmpegVersion);
    } catch (error) {
      console.log('❌ FFmpeg not available:', error);
    }

    // Check network info
    try {
      const { stdout } = await execAsync('ipconfig');
      diagnostics.networkInfo = { ipconfig: stdout.substring(0, 500) }; // Limit output
    } catch (error) {
      console.log('Network info check failed:', error);
    }

    // Check system info
    try {
      diagnostics.systemInfo = {
        platform: process.platform,
        arch: process.arch,
        nodeVersion: process.version,
        env: {
          PATH: process.env.PATH ? 'SET' : 'NOT_SET',
          USERNAME: process.env.USERNAME || 'UNKNOWN'
        }
      };
    } catch (error) {
      console.log('System info check failed:', error);
    }

    return diagnostics;
  }

  async startStream(rtspUrl: string, streamId: string): Promise<number> {
    // Check if stream already exists
    if (this.streams.has(streamId)) {
      console.log(`Stream ${streamId} already exists, returning existing port`);
      return this.streams.get(streamId)!.port;
    }

    console.log(`🔄 Starting diagnostics for stream ${streamId}`);
    
    // Run system diagnostics
    const diagnostics = await this.runDiagnostics();
    console.log('System diagnostics:', JSON.stringify(diagnostics, null, 2));
    
    if (!diagnostics.ffmpegAvailable) {
      throw new Error(`FFmpeg is not available on this system. Please install FFmpeg:\n` +
        `1. Download from https://ffmpeg.org/download.html\n` +
        `2. Extract to C:\\ffmpeg\\ or add to PATH\n` +
        `3. Or try: winget install Gyan.FFmpeg`);
    }

    // Test RTSP connection first
    console.log(`🔄 Testing RTSP connection for ${streamId}: ${rtspUrl}`);
    const connectionTest = await testRTSPConnection(rtspUrl, 15000);
    
    if (!connectionTest.success) {
      const errorMsg = `Failed to connect to RTSP stream ${streamId}:\n` +
        `URL: ${rtspUrl}\n` +
        `Error: ${connectionTest.error}\n` +
        `Details: ${connectionTest.details}\n\n` +
        `Possible causes:\n` +
        `1. Camera is not reachable from this network\n` +
        `2. RTSP URL is incorrect\n` +
        `3. Camera requires authentication\n` +
        `4. Network firewall blocking connection`;
      
      console.error('❌ RTSP Connection Test Failed:', errorMsg);
      throw new Error(errorMsg);
    }
    
    console.log(`✅ RTSP connection test successful for ${streamId}`);

    const port = this.currentPort++;
    
    // Create HTTP server
    const server = createServer();
    
    // Create WebSocket server
    const wsServer = new WebSocketServer({ server });
    
    // Test RTSP URL first
    console.log(`Testing RTSP connection for ${streamId}: ${rtspUrl}`);
    
    // FFmpeg command to convert RTSP to WebSocket stream
    const ffmpegArgs = [
      '-rtsp_transport', 'tcp',
      '-i', rtspUrl,
      '-f', 'mpegts',
      '-codec:v', 'mpeg1video',
      '-s', '640x480',
      '-b:v', '1000k',
      '-r', '25',        // Changed from 15 to 25 (supported by MPEG-1)
      '-bf', '0',
      '-g', '50',        // GOP size
      '-codec:a', 'mp2',
      '-ar', '44100',
      '-ac', '1',
      '-b:a', '128k',
      '-muxdelay', '0.001',
      '-fflags', '+genpts',
      '-'
    ];

    // Start FFmpeg process
    console.log(`Starting FFmpeg for stream ${streamId} with URL: ${rtspUrl}`);
    console.log(`FFmpeg args:`, ffmpegArgs);
    
    const ffmpegPath = getFFmpegPath();
    console.log(`Using FFmpeg path: ${ffmpegPath}`);
    
    const ffmpegProcess = spawn(ffmpegPath, ffmpegArgs);
    
    // Handle FFmpeg stdout (video stream)
    let dataReceived = false;
    ffmpegProcess.stdout.on('data', (data) => {
      if (!dataReceived) {
        console.log(`First data chunk received for ${streamId}, size: ${data.length}`);
        dataReceived = true;
      }
      
      // Broadcast to all connected WebSocket clients
      wsServer.clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
          client.send(data);
        }
      });
    });

    // Handle FFmpeg errors
    ffmpegProcess.stderr.on('data', (data) => {
      const errorText = data.toString();
      // Filter out common non-critical audio timestamp warnings to reduce console spam
      if (!errorText.includes('Non-monotonic DTS') && 
          !errorText.includes('changing to') && 
          !errorText.includes('incorrect timestamps')) {
        console.error(`FFmpeg stderr for ${streamId}:`, errorText);
      }
    });

    ffmpegProcess.on('error', (error) => {
      console.error(`FFmpeg error for ${streamId}:`, error);
    });

    ffmpegProcess.on('close', (code) => {
      console.log(`FFmpeg process for ${streamId} exited with code ${code}`);
    });

    // Handle WebSocket connections
    wsServer.on('connection', (ws) => {
      console.log(`New WebSocket connection for stream ${streamId}`);
      
      ws.on('close', () => {
        console.log(`WebSocket connection closed for stream ${streamId}`);
      });

      ws.on('error', (error) => {
        console.error(`WebSocket error for stream ${streamId}:`, error);
      });
    });

    // Start HTTP server
    server.listen(port, () => {
      console.log(`RTSP stream server running on port ${port} for stream ${streamId}`);
    });

    // Store stream instance
    this.streams.set(streamId, { ffmpegProcess, server, wsServer, port });
    
    return port;
  }

  stopStream(streamId: string): void {
    const streamInstance = this.streams.get(streamId);
    if (streamInstance) {
      // Kill FFmpeg process
      streamInstance.ffmpegProcess.kill('SIGKILL');
      
      // Close WebSocket server
      streamInstance.wsServer.close();
      
      // Close HTTP server
      streamInstance.server.close();
      
      this.streams.delete(streamId);
      console.log(`Stopped stream ${streamId}`);
    }
  }

  stopAllStreams(): void {
    for (const [streamId] of this.streams) {
      this.stopStream(streamId);
    }
  }

  getStreamPort(streamId: string): number | null {
    const streamInstance = this.streams.get(streamId);
    return streamInstance ? streamInstance.port : null;
  }

  // Diagnostic function to check system capabilities
  async runDiagnostics(): Promise<{
    ffmpegAvailable: boolean;
    ffmpegVersion: string | null;
    networkInfo: any;
    systemInfo: any;
  }> {
    const diagnostics = {
      ffmpegAvailable: false,
      ffmpegVersion: null as string | null,
      networkInfo: {},
      systemInfo: {}
    };

    // Check FFmpeg
    try {
      const ffmpegPath = getFFmpegPath();
      const { stdout } = await execAsync(`"${ffmpegPath}" -version`);
      diagnostics.ffmpegAvailable = true;
      diagnostics.ffmpegVersion = stdout.split('\n')[0];
      console.log('✅ FFmpeg available:', diagnostics.ffmpegVersion);
    } catch (error) {
      console.log('❌ FFmpeg not available:', error);
    }

    // Check network info
    try {
      const { stdout } = await execAsync('ipconfig');
      diagnostics.networkInfo = { ipconfig: stdout.substring(0, 500) }; // Limit output
    } catch (error) {
      console.log('Network info check failed:', error);
    }

    // Check system info
    try {
      diagnostics.systemInfo = {
        platform: process.platform,
        arch: process.arch,
        nodeVersion: process.version,
        env: {
          PATH: process.env.PATH ? 'SET' : 'NOT_SET',
          USERNAME: process.env.USERNAME || 'UNKNOWN'
        }
      };
    } catch (error) {
      console.log('System info check failed:', error);
    }

    return diagnostics;
  }
}

export const rtspStreamServer = new RTSPStreamServer();
