import React, { useState, useMemo } from 'react';

const CommissionCalculator: React.FC = () => {
    const [saleAmount, setSaleAmount] = useState<string>('5000');
    const [rate, setRate] = useState<string>('3');

    const commission = useMemo(() => {
        const amount = parseFloat(saleAmount);
        const r = parseFloat(rate);
        if (isNaN(amount) || isNaN(r) || amount < 0 || r < 0) {
            return '0.00';
        }
        return (amount * (r / 100)).toFixed(2);
    }, [saleAmount, rate]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="saleAmount" className="block text-sm font-medium text-gray-300 mb-2">
                        Sale Amount ($)
                    </label>
                    <input
                        type="number"
                        id="saleAmount"
                        value={saleAmount}
                        onChange={(e) => setSaleAmount(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="e.g. 5000"
                    />
                </div>
                <div>
                    <label htmlFor="rate" className="block text-sm font-medium text-gray-300 mb-2">
                        Commission Rate (%)
                    </label>
                    <input
                        type="number"
                        id="rate"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="e.g. 3"
                    />
                </div>
            </div>

            <div className="text-center bg-gray-900 p-6 rounded-lg">
                <p className="text-lg text-gray-400">Commission Earned</p>
                <p className="text-5xl font-bold text-cyan-400 my-2">${commission}</p>
            </div>
        </div>
    );
};

export default CommissionCalculator;
