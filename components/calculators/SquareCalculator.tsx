
import React, { useState, useMemo } from 'react';

const SquareCalculator: React.FC = () => {
    const [side, setSide] = useState<string>('10');

    const { area, perimeter } = useMemo(() => {
        const s = parseFloat(side);
        if (isNaN(s) || s < 0) {
            return { area: 'Invalid', perimeter: 'Invalid' };
        }
        return {
            area: (s * s).toFixed(2),
            perimeter: (4 * s).toFixed(2),
        };
    }, [side]);

    return (
        <div className="space-y-6">
            <div>
                <label htmlFor="side" className="block text-sm font-medium text-gray-300 mb-2">
                    Side Length
                </label>
                <div className="relative">
                    <input
                        type="number"
                        id="side"
                        value={side}
                        onChange={(e) => setSide(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="e.g. 10"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                <div className="bg-gray-900 p-6 rounded-lg">
                    <p className="text-lg text-gray-400">Area</p>
                    <p className="text-4xl font-bold text-white my-2">{area}</p>
                    <p className="text-gray-500">(side x side)</p>
                </div>
                <div className="bg-gray-900 p-6 rounded-lg">
                    <p className="text-lg text-gray-400">Perimeter</p>
                    <p className="text-4xl font-bold text-white my-2">{perimeter}</p>
                    <p className="text-gray-500">(4 x side)</p>
                </div>
            </div>
        </div>
    );
};

export default SquareCalculator;
