
import React, { useState, useMemo } from 'react';

const BMICalculator: React.FC = () => {
    const [height, setHeight] = useState<string>('180');
    const [weight, setWeight] = useState<string>('75');
    const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');

    const { bmi, category, color } = useMemo(() => {
        const h = parseFloat(height);
        const w = parseFloat(weight);

        if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
            return { bmi: 0, category: 'N/A', color: 'text-gray-400' };
        }

        let bmiValue: number;
        if (unitSystem === 'metric') {
            // BMI = kg / m^2
            bmiValue = w / ((h / 100) ** 2);
        } else {
            // BMI = (lbs / in^2) * 703
            bmiValue = (w / (h ** 2)) * 703;
        }

        if (bmiValue < 18.5) return { bmi: bmiValue, category: 'Underweight', color: 'text-blue-400' };
        if (bmiValue < 24.9) return { bmi: bmiValue, category: 'Normal weight', color: 'text-green-400' };
        if (bmiValue < 29.9) return { bmi: bmiValue, category: 'Overweight', color: 'text-yellow-400' };
        return { bmi: bmiValue, category: 'Obesity', color: 'text-red-400' };

    }, [height, weight, unitSystem]);

    return (
        <div className="space-y-6">
            <div className="flex justify-center p-1 bg-gray-700 rounded-lg">
                <button 
                    onClick={() => setUnitSystem('metric')} 
                    className={`w-1/2 p-2 rounded-md font-semibold transition-colors ${unitSystem === 'metric' ? 'bg-cyan-600 text-white' : 'text-gray-300'}`}>
                    Metric (cm, kg)
                </button>
                <button 
                    onClick={() => setUnitSystem('imperial')}
                    className={`w-1/2 p-2 rounded-md font-semibold transition-colors ${unitSystem === 'imperial' ? 'bg-cyan-600 text-white' : 'text-gray-300'}`}>
                    Imperial (in, lbs)
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="height" className="block text-sm font-medium text-gray-300 mb-2">
                        Height ({unitSystem === 'metric' ? 'cm' : 'inches'})
                    </label>
                    <input
                        type="number"
                        id="height"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder={unitSystem === 'metric' ? 'e.g. 180' : 'e.g. 71'}
                    />
                </div>
                <div>
                    <label htmlFor="weight" className="block text-sm font-medium text-gray-300 mb-2">
                        Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'})
                    </label>
                    <input
                        type="number"
                        id="weight"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder={unitSystem === 'metric' ? 'e.g. 75' : 'e.g. 165'}
                    />
                </div>
            </div>

            <div className="text-center bg-gray-900 p-6 rounded-lg">
                <p className="text-lg text-gray-400">Your BMI is</p>
                <p className="text-6xl font-bold text-white my-2">{bmi > 0 ? bmi.toFixed(1) : '-'}</p>
                <p className={`text-2xl font-semibold ${color}`}>{category}</p>
            </div>
        </div>
    );
};

export default BMICalculator;
