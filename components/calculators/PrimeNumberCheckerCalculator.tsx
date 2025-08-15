import React, { useState, useMemo } from 'react';

const PrimeNumberCheckerCalculator: React.FC = () => {
    const [number, setNumber] = useState<string>('17');

    const isPrime = useMemo(() => {
        const num = parseInt(number);
        if (isNaN(num) || num < 2 || !Number.isInteger(num)) {
            return { text: 'Invalid Input', color: 'text-yellow-400' };
        }
        if (num === 2) {
            return { text: 'Prime', color: 'text-green-400' };
        }
        if (num % 2 === 0) {
            return { text: 'Not Prime', color: 'text-red-400' };
        }
        for (let i = 3; i <= Math.sqrt(num); i += 2) {
            if (num % i === 0) {
                return { text: 'Not Prime', color: 'text-red-400' };
            }
        }
        return { text: 'Prime', color: 'text-green-400' };
    }, [number]);

    return (
        <div className="space-y-6">
            <div>
                <label htmlFor="number" className="block text-sm font-medium text-gray-300 mb-2">
                    Enter an integer
                </label>
                <input
                    type="number"
                    id="number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="e.g. 17"
                />
            </div>
            
            <div className="text-center bg-gray-900 p-6 rounded-lg">
                 <p className="text-lg text-gray-400">Result</p>
                 <p className={`text-5xl font-bold my-2 ${isPrime.color}`}>{isPrime.text}</p>
                 <p className="text-gray-500">The number {number} is {isPrime.text.toLowerCase()}.</p>
            </div>
        </div>
    );
};

export default PrimeNumberCheckerCalculator;
