import React, { useState, useMemo } from 'react';

const DiscountCalculator: React.FC = () => {
    const [price, setPrice] = useState<string>('100');
    const [discount, setDiscount] = useState<string>('20');

    const { finalPrice, saved } = useMemo(() => {
        const p = parseFloat(price);
        const d = parseFloat(discount);
        if (isNaN(p) || isNaN(d) || p < 0 || d < 0) {
            return { finalPrice: '0.00', saved: '0.00' };
        }
        const savedAmount = p * (d / 100);
        const final = p - savedAmount;
        return {
            finalPrice: final.toFixed(2),
            saved: savedAmount.toFixed(2),
        };
    }, [price, discount]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-2">
                        Original Price ($)
                    </label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="e.g. 100"
                    />
                </div>
                <div>
                    <label htmlFor="discount" className="block text-sm font-medium text-gray-300 mb-2">
                        Discount (%)
                    </label>
                    <input
                        type="number"
                        id="discount"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="e.g. 20"
                    />
                </div>
            </div>

            <div className="text-center bg-gray-900 p-6 rounded-lg">
                <p className="text-lg text-gray-400">Final Price</p>
                <p className="text-5xl font-bold text-cyan-400 my-2">${finalPrice}</p>
                <p className="text-green-400">You save ${saved}</p>
            </div>
        </div>
    );
};

export default DiscountCalculator;
