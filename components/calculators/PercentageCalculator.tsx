import React, { useState, useMemo } from 'react';

const PercentageCalculator: React.FC = () => {
    const [percentage, setPercentage] = useState<string>('10');
    const [baseValue, setBaseValue] = useState<string>('50');

    const result = useMemo(() => {
        const p = parseFloat(percentage);
        const b = parseFloat(baseValue);
        if (isNaN(p) || isNaN(b)) {
            return 'Invalid input';
        }
        return ((p / 100) * b).toFixed(2);
    }, [percentage, baseValue]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="percentage" className="block text-sm font-medium text-gray-300 mb-2">
                        Percentage (%)
                    </label>
                    <input
                        type="number"
                        id="percentage"
                        value={percentage}
                        onChange={(e) => setPercentage(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="e.g. 10"
                    />
                </div>
                <div>
                    <label htmlFor="baseValue" className="block text-sm font-medium text-gray-300 mb-2">
                        Of
                    </label>
                    <input
                        type="number"
                        id="baseValue"
                        value={baseValue}
                        onChange={(e) => setBaseValue(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="e.g. 50"
                    />
                </div>
            </div>

            <div className="text-center bg-gray-900 p-6 rounded-lg">
                <p className="text-lg text-gray-400">Result</p>
                <p className="text-5xl font-bold text-cyan-400 my-2">{result}</p>
                <p className="text-gray-500">{percentage}% of {baseValue} is {result}</p>
            </div>
        </div>
    );
};

export default PercentageCalculator;
