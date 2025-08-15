import React, { useState, useMemo } from 'react';

const SphereCalculator: React.FC = () => {
    const [radius, setRadius] = useState<string>('5');

    const { volume, surfaceArea } = useMemo(() => {
        const r = parseFloat(radius);
        if (isNaN(r) || r < 0) {
            return { volume: 'Invalid', surfaceArea: 'Invalid' };
        }
        return {
            volume: ((4 / 3) * Math.PI * r * r * r).toFixed(2),
            surfaceArea: (4 * Math.PI * r * r).toFixed(2),
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
                    placeholder="e.g. 5"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                <div className="bg-gray-900 p-6 rounded-lg">
                    <p className="text-lg text-gray-400">Volume</p>
                    <p className="text-4xl font-bold text-white my-2">{volume}</p>
                    <p className="text-gray-500">(4/3 × π × r³)</p>
                </div>
                <div className="bg-gray-900 p-6 rounded-lg">
                    <p className="text-lg text-gray-400">Surface Area</p>
                    <p className="text-4xl font-bold text-white my-2">{surfaceArea}</p>
                    <p className="text-gray-500">(4 × π × r²)</p>
                </div>
            </div>
        </div>
    );
};

export default SphereCalculator;
