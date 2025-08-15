import React, { useState, useMemo } from 'react';

const CircleCalculator: React.FC = () => {
    const [radius, setRadius] = useState<string>('10');

    const { area, circumference } = useMemo(() => {
        const r = parseFloat(radius);
        if (isNaN(r) || r < 0) {
            return { area: 'Invalid', circumference: 'Invalid' };
        }
        return {
            area: (Math.PI * r * r).toFixed(2),
            circumference: (2 * Math.PI * r).toFixed(2),
        };
    }, [radius]);

    return (
        <div className="space-y-6">
            <div>
                <label htmlFor="radius" className="block text-sm font-medium text-gray-300 mb-2">
                    Radius
                </label>
                <input
                    type="number"
                    id="radius"
                    value={radius}
                    onChange={(e) => setRadius(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="e.g. 10"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                <div className="bg-gray-900 p-6 rounded-lg">
                    <p className="text-lg text-gray-400">Area</p>
                    <p className="text-4xl font-bold text-white my-2">{area}</p>
                    <p className="text-gray-500">(π × r²)</p>
                </div>
                <div className="bg-gray-900 p-6 rounded-lg">
                    <p className="text-lg text-gray-400">Circumference</p>
                    <p className="text-4xl font-bold text-white my-2">{circumference}</p>
                    <p className="text-gray-500">(2 × π × r)</p>
                </div>
            </div>
        </div>
    );
};

export default CircleCalculator;
