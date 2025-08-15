import React, { useState, useMemo } from 'react';

const DecimalToFractionCalculator: React.FC = () => {
    const [decimal, setDecimal] = useState<string>('0.75');

    const gcd = (a: number, b: number): number => {
        return b === 0 ? a : gcd(b, a % b);
    };

    const fraction = useMemo(() => {
        const dec = parseFloat(decimal);
        if (isNaN(dec)) {
            return { num: 'Invalid', den: 'Input' };
        }

        const decStr = decimal.toString();
        if (!decStr.includes('.')) {
            return { num: decStr, den: '1' };
        }
        
        const decimalPlaces = decStr.split('.')[1].length;
        let denominator = Math.pow(10, decimalPlaces);
        let numerator = dec * denominator;

        const commonDivisor = gcd(Math.round(numerator), denominator);
        
        return {
            num: (Math.round(numerator) / commonDivisor).toString(),
            den: (denominator / commonDivisor).toString(),
        };
    }, [decimal]);

    return (
        <div className="space-y-6">
            <div>
                <label htmlFor="decimal" className="block text-sm font-medium text-gray-300 mb-2">
                    Enter a decimal number
                </label>
                <input
                    type="number"
                    id="decimal"
                    value={decimal}
                    onChange={(e) => setDecimal(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="e.g. 0.75"
                />
            </div>
            
             <div className="text-center bg-gray-900 p-6 rounded-lg">
                <p className="text-lg text-gray-400 mb-4">Equivalent Fraction</p>
                <div className="flex flex-col items-center">
                    <span className="text-5xl font-bold text-cyan-400">{fraction.num}</span>
                    <hr className="w-24 border-t-2 border-cyan-400 my-2" />
                    <span className="text-5xl font-bold text-cyan-400">{fraction.den}</span>
                </div>
            </div>
        </div>
    );
};

export default DecimalToFractionCalculator;
