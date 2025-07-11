import { useEffect, useState } from 'react';
import { getGate, toggleGate } from '../services/gateService';
import { Gate } from '../types/gate';
import RTSPStream from './RTSPStream';
import RTSPDiagnostics from './RTSPDiagnostics';

export default function Gates() {
    const [gate, setGate] = useState<Gate[]>([]);
    const [isGateOpen, setIsGateOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showDiagnostics, setShowDiagnostics] = useState(false);

    const handleGateToggle = async () => {
        setIsLoading(true);
        try {
            await toggleGate();
            setIsGateOpen(!isGateOpen);
        } catch (error) {
            console.error('Error toggling gate:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        async function fetchGate() {
            try {
                const response = await getGate();
                if (response && Array.isArray(response)) {
                    setGate(response.filter(g => g && g._id));
                } else if (response && (response as any)._id) {
                    setGate([response as Gate]);
                } else {
                    setGate([]);
                }
            } catch (error) {
                console.error('Error fetching gates:', error);
                setGate([]);
            }
        }
        fetchGate();
    }, []);

    return (
        <div className="p-6">
            <div className="mb-6 flex justify-between items-center">
                <button
                    onClick={() => setShowDiagnostics(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Camera Diagnostics
                </button>
                
                <button
                    onClick={handleGateToggle}
                    disabled={isLoading}
                    className={`px-6 py-2 mx-auto rounded-lg font-medium transition-colors ${
                        isGateOpen
                            ? 'bg-red-600 hover:bg-red-700 text-white'
                            : 'bg-green-600 hover:bg-green-700 text-white'
                    } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isLoading ? 'Loading...' : isGateOpen ? 'Close Gate' : 'Open Gate'}
                </button>
                
                <div></div> {/* Spacer for center alignment */}
            </div>
            {gate.map((g) => (
                <div key={g._id} className="mb-2 rounded-lg">
                    {/* <h2 className="text-xl font-semibold mb-4">{g.name}</h2> */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div>
                            <div className="aspect-video w-full rounded-md overflow-hidden bg-black">
                                <RTSPStream
                                    rtspUrl={g.cameras.entry}
                                    streamId={`${g._id}-entry`}
                                    className="w-full h-full"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="aspect-video w-full rounded-md overflow-hidden bg-black">
                                <RTSPStream
                                    rtspUrl={g.cameras.exit}
                                    streamId={`${g._id}-exit`}
                                    className="w-full h-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            
            {/* Diagnostics Modal */}
            <RTSPDiagnostics 
                isOpen={showDiagnostics} 
                onClose={() => setShowDiagnostics(false)} 
            />
        </div>
    );
}
