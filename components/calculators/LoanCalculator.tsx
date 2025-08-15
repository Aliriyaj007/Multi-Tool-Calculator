
import React, { useState, useMemo } from 'react';

const LoanCalculator: React.FC = () => {
    const [amount, setAmount] = useState<string>('10000');
    const [interest, setInterest] = useState<string>('5');
    const [term, setTerm] = useState<string>('5');

    const { monthlyPayment, totalInterest, totalPayment } = useMemo(() => {
        const P = parseFloat(amount); // Principal
        const r = parseFloat(interest) / 100 / 12; // Monthly interest rate
        const n = parseFloat(term) * 12; // Number of months

        if (isNaN(P) || isNaN(r) || isNaN(n) || P <= 0 || r < 0 || n <= 0) {
            return { monthlyPayment: '0.00', totalInterest: '0.00', totalPayment: '0.00' };
        }

        if (r === 0) { // No interest
            const M = P / n;
            return {
                monthlyPayment: M.toFixed(2),
                totalInterest: '0.00',
                totalPayment: P.toFixed(2),
            };
        }

        // Monthly payment formula
        const M = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const total = M * n;
        const totalInt = total - P;

        return {
            monthlyPayment: M.toFixed(2),
            totalInterest: totalInt.toFixed(2),
            totalPayment: total.toFixed(2),
        };
    }, [amount, interest, term]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-2">
                        Loan Amount ($)
                    </label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="e.g. 10000"
                    />
                </div>
                <div>
                    <label htmlFor="interest" className="block text-sm font-medium text-gray-300 mb-2">
                        Annual Interest Rate (%)
                    </label>
                    <input
                        type="number"
                        id="interest"
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="e.g. 5"
                    />
                </div>
                <div>
                    <label htmlFor="term" className="block text-sm font-medium text-gray-300 mb-2">
                        Loan Term (Years)
                    </label>
                    <input
                        type="number"
                        id="term"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="e.g. 5"
                    />
                </div>
            </div>

            <div className="text-center bg-gray-900 p-6 rounded-lg">
                <p className="text-lg text-gray-400">Monthly Payment</p>
                <p className="text-5xl font-bold text-cyan-400 my-2">${monthlyPayment}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                <div className="bg-gray-900 p-4 rounded-lg">
                    <p className="text-md text-gray-400">Total Interest Paid</p>
                    <p className="text-3xl font-semibold text-white my-1">${totalInterest}</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg">
                    <p className="text-md text-gray-400">Total Payment</p>
                    <p className="text-3xl font-semibold text-white my-1">${totalPayment}</p>
                </div>
            </div>
        </div>
    );
};

export default LoanCalculator;
