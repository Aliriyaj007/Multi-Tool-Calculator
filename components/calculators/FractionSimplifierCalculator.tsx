import React, { useState, useMemo } from 'react';

const FractionSimplifierCalculator: React.FC = () => {
    const [numerator, setNumerator] = useState<string>('12');
    const [denominator, setDenominator] = useState<string>('30');

    const gcd = (a: number, b: number): number => {
        return b === 0 ? a : gcd(b, a % b);
    };

    const simplified = useMemo(() => {
        const num = parseInt(numerator);
        const den = parseInt(denominator);

        if (isNaN(num) || isNaN(den) || den === 0) {
            return { simplifiedNum: 'Invalid', simplifiedDen: 'Input' };
        }
        
        const commonDivisor = gcd(Math.abs(num), Math.abs(den));
        const sign = (num * den < 0) ? -1 : 1;

        return {
            simplifiedNum: (sign * Math.abs(num) / commonDivisor).toString(),
            simplifiedDen: (Math.abs(den) / commonDivisor).toString()
        };
    }, [numerator, denominator]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <input
                    type="number"
                    value={numerator}
                    onChange={(e) => setNumerator(e.target.value)}
                    className="w-full text-center bg-gray-900 border border-gray-700 text-white rounded-md p-3 text-2xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="Numerator"
                />
                <hr className="border-gray-600 block md:hidden" />
                <input
                    type="number"
                    value={denominator}
                    onChange={(e) => setDenominator(e.target.value)}
                    className="w-full text-center bg-gray-900 border border-gray-700 text-white rounded-md p-3 text-2xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="Denominator"
                />
            </div>

            <div className="flex items-center justify-center text-4xl text-gray-400">=</div>

            <div className="text-center bg-gray-900 p-6 rounded-lg">
                <p className="text-lg text-gray-400 mb-4">Simplified Fraction</p>
                <div className="flex flex-col items-center">
                    <span className="text-5xl font-bold text-cyan-400">{simplified.simplifiedNum}</span>
                    <hr className="w-24 border-t-2 border-cyan-400 my-2" />
                    <span className="text-5xl font-bold text-cyan-400">{simplified.simplifiedDen}</span>
                </div>
            </div>
        </div>
    );
};

export default FractionSimplifierCalculator;
