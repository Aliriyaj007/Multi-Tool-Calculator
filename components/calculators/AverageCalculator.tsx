import React, { useState, useMemo } from 'react';

const AverageCalculator: React.FC = () => {
    const [numbers, setNumbers] = useState<string>('10, 20, 30, 40, 50');

    const average = useMemo(() => {
        const numArray = numbers
            .split(',')
            .map(n => parseFloat(n.trim()))
            .filter(n => !isNaN(n));

        if (numArray.length === 0) {
            return '0.00';
        }

        const sum = numArray.reduce((acc, curr) => acc + curr, 0);
        return (sum / numArray.length).toFixed(2);
    }, [numbers]);

    return (
        <div className="space-y-6">
            <div>
                <label htmlFor="numbers" className="block text-sm font-medium text-gray-300 mb-2">
                    Enter numbers, separated by commas
                </label>
                <textarea
                    id="numbers"
                    value={numbers}
                    onChange={(e) => setNumbers(e.target.value)}
                    rows={4}
                    className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="e.g. 10, 20, 30, 40, 50"
                />
            </div>
            
            <div className="text-center bg-gray-900 p-6 rounded-lg">
                <p className="text-lg text-gray-400">Average</p>
                <p className="text-5xl font-bold text-cyan-400 my-2">{average}</p>
            </div>
        </div>
    );
};

export default AverageCalculator;
