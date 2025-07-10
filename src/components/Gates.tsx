import { useEffect, useState } from 'react';
import { getGate } from '../services/gateService';
import { Gate } from '../types/gate';

export default function Gates() {
    const [gate, setGate] = useState<Gate[]>([]);

    useEffect(() => {
        async function fetchGate() {
            try {
                const response = await getGate();
                if (Array.isArray(response)) {
                    setGate(response);
                } else if (response && typeof response === 'object') {
                    setGate([response]); // Wrap single object in an array
                } else {
                    console.error('Unexpected response format:', response);
                }
            } catch (error) {
                console.error('Error fetching gates:', error);
            }
        }
        fetchGate();
    }, []);

    return (
        <div>
            <h1>Gates</h1>
            {gate.map((g) => (
                <div key={g._id}>
                    <h2>{g.name}</h2>
                    <div>
                        <h3>Entry Camera</h3>
                        <video src={g.cameras.entry} controls autoPlay style={{ width: '400px' }} />
                    </div>
                    <div>
                        <h3>Exit Camera</h3>
                        <video src={g.cameras.exit} controls autoPlay style={{ width: '400px' }} />
                    </div>
                </div>
            ))}
        </div>
    );
}