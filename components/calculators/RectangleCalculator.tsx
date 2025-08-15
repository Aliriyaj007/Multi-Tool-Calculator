import React, { useState, useMemo } from 'react';

const RectangleCalculator: React.FC = () => {
    const [width, setWidth] = useState<string>('10');
    const [length, setLength] = useState<string>('20');

    const { area, perimeter } = useMemo(() => {
        const w = parseFloat(width);
        const l = parseFloat(length);
        if (isNaN(w) || isNaN(l) || w < 0 || l < 0) {
            return { area: 'Invalid', perimeter: 'Invalid' };
        }
        return {
            area: (w * l).toFixed(2),
            perimeter: (2 * (w + l)).toFixed(2),
        };
    }, [width, length]);

    return (
        <div className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label htmlFor="width" className="block text-sm font-medium text-gray-300 mb-2">
                        Width
                    </label>
                    <input
                        type="number"
                        id="width"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="e.g. 10"
                    />
                </div>
                <div>
                     <label htmlFor="length" className="block text-sm font-medium text-gray-300 mb-2">
                        Length
                    </label>
                    <input
                        type="number"
                        id="length"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="e.g. 20"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                <div className="bg-gray-900 p-6 rounded-lg">
                    <p className="text-lg text-gray-400">Area</p>
                    <p className="text-4xl font-bold text-white my-2">{area}</p>
                    <p className="text-gray-500">(width × length)</p>
                </div>
                <div className="bg-gray-900 p-6 rounded-lg">
                    <p className="text-lg text-gray-400">Perimeter</p>
                    <p className="text-4xl font-bold text-white my-2">{perimeter}</p>
                    <p className="text-gray-500">(2 × (width + length))</p>
                </div>
            </div>
        </div>
    );
};

export default RectangleCalculator;
