import React, { useState, useMemo } from 'react';

const InvestmentCalculator: React.FC = () => {
    const [principal, setPrincipal] = useState<string>('1000');
    const [rate, setRate] = useState<string>('5');
    const [term, setTerm] = useState<string>('10');
    const [compounding, setCompounding] = useState<string>('12'); // Monthly

    const futureValue = useMemo(() => {
        const P = parseFloat(principal);
        const r = parseFloat(rate) / 100;
        const t = parseFloat(term);
        const n = parseInt(compounding);

        if (isNaN(P) || isNaN(r) || isNaN(t) || isNaN(n) || P < 0 || r < 0 || t < 0) {
            return '0.00';
        }
        
        // Formula: A = P(1 + r/n)^(nt)
        const A = P * Math.pow(1 + (r / n), n * t);
        return A.toFixed(2);
    }, [principal, rate, term, compounding]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label htmlFor="principal" className="block text-sm font-medium text-gray-300 mb-2">
                        Initial Investment ($)
                    </label>
                    <input type="number" id="principal" value={principal} onChange={(e) => setPrincipal(e.target.value)} className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" />
                </div>
                <div>
                    <label htmlFor="rate" className="block text-sm font-medium text-gray-300 mb-2">
                        Annual Interest Rate (%)
                    </label>
                    <input type="number" id="rate" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" />
                </div>
                <div>
                    <label htmlFor="term" className="block text-sm font-medium text-gray-300 mb-2">
                        Term (Years)
                    </label>
                    <input type="number" id="term" value={term} onChange={(e) => setTerm(e.target.value)} className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" />
                </div>
                 <div>
                    <label htmlFor="compounding" className="block text-sm font-medium text-gray-300 mb-2">
                        Compounding Frequency
                    </label>
                    <select id="compounding" value={compounding} onChange={(e) => setCompounding(e.target.value)} className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500">
                        <option value="1">Annually</option>
                        <option value="2">Semi-Annually</option>
                        <option value="4">Quarterly</option>
                        <option value="12">Monthly</option>
                        <option value="365">Daily</option>
                    </select>
                </div>
            </div>

            <div className="text-center bg-gray-900 p-6 rounded-lg">
                <p className="text-lg text-gray-400">Future Value</p>
                <p className="text-5xl font-bold text-cyan-400 my-2">${futureValue}</p>
            </div>
        </div>
    );
};

export default InvestmentCalculator;
