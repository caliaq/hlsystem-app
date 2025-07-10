import { useEffect, useState } from 'react';
import { getGate, openGate, closeGate } from '../services/gateService';
import { Gate } from '../types/gate';
import RTSPStream from './RTSPStream';

export default function Gates() {
    const [gate, setGate] = useState<Gate[]>([]);
    const [isGateOpen, setIsGateOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleGateToggle = async () => {
        setIsLoading(true);
        try {
            if (isGateOpen) {
                await closeGate();
                setIsGateOpen(false);
            } else {
                await openGate();
                setIsGateOpen(true);
            }
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
                    onClick={handleGateToggle}
                    disabled={isLoading}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                        isGateOpen
                            ? 'bg-red-600 hover:bg-red-700 text-white'
                            : 'bg-green-600 hover:bg-green-700 text-white'
                    } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isLoading ? 'Loading...' : isGateOpen ? 'Close Gate' : 'Open Gate'}
                </button>
            </div>
            {gate.map((g) => (
                <div key={g._id} className="mb-8 p-4 rounded-lg">
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
        </div>
    );
}
