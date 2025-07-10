import { useEffect, useState } from 'react';
import { getGate } from '../services/gateService';
import { Gate } from '../types/gate';
import RTSPStream from './RTSPStream';

export default function Gates() {
    const [gate, setGate] = useState<Gate[]>([]);

    useEffect(() => {
        async function fetchGate() {
            try {
                const response = await getGate();
                // Ensure response is always an array and filter out null/undefined values
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
            <h1 className="text-2xl font-bold mb-6">Gates</h1>
            {gate.map((g) => (
                <div key={g._id} className="mb-8 p-4 border rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">{g.name}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-medium mb-2">Entry Camera</h3>
                            <RTSPStream
                                rtspUrl={g.cameras.entry}
                                streamId={`${g._id}-entry`}
                                width={640}
                                height={480}
                                className="rounded-md overflow-hidden"
                            />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium mb-2">Exit Camera</h3>
                            <RTSPStream
                                rtspUrl={g.cameras.exit}
                                streamId={`${g._id}-exit`}
                                width={640}
                                height={480}
                                className="rounded-md overflow-hidden"
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}