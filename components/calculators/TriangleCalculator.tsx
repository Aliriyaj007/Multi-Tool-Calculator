import React, { useState, useMemo } from 'react';

const TriangleCalculator: React.FC = () => {
    const [base, setBase] = useState<string>('10');
    const [height, setHeight] = useState<string>('5');

    const area = useMemo(() => {
        const b = parseFloat(base);
        const h = parseFloat(height);
        if (isNaN(b) || isNaN(h) || b < 0 || h < 0) {
            return 'Invalid';
        }
        return (0.5 * b * h).toFixed(2);
    }, [base, height]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label htmlFor="base" className="block text-sm font-medium text-gray-300 mb-2">
                        Base
                    </label>
                    <input
                        type="number"
                        id="base"
                        value={base}
                        onChange={(e) => setBase(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="e.g. 10"
                    />
                </div>
                <div>
                     <label htmlFor="height" className="block text-sm font-medium text-gray-300 mb-2">
                        Height
                    </label>
                    <input
                        type="number"
                        id="height"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="e.g. 5"
                    />
                </div>
            </div>

            <div className="text-center bg-gray-900 p-6 rounded-lg">
                <p className="text-lg text-gray-400">Area</p>
                <p className="text-5xl font-bold text-cyan-400 my-2">{area}</p>
                <p className="text-gray-500">(0.5 × base × height)</p>
            </div>
             <div className="text-sm text-gray-500 p-3 bg-gray-900 rounded-md">
                <strong>Note:</strong> This calculates the area of a triangle given its base and perpendicular height. Other properties like perimeter require more information (e.g., all three side lengths).
            </div>
        </div>
    );
};

export default TriangleCalculator;
