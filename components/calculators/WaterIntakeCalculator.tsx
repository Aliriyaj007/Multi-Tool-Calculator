import React, { useState, useMemo } from 'react';

const WaterIntakeCalculator: React.FC = () => {
    const [weight, setWeight] = useState<string>('75');
    const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
    
    const { intakeLiters, intakeOunces } = useMemo(() => {
        let weightKg = parseFloat(weight);

        if (isNaN(weightKg) || weightKg <= 0) {
            return { intakeLiters: '0.0', intakeOunces: '0' };
        }

        if (unitSystem === 'imperial') {
            weightKg *= 0.453592; // lbs to kg
        }

        // A common recommendation: 35 ml per kg
        const intakeMl = weightKg * 35;
        const intakeL = intakeMl / 1000;
        const intakeOz = intakeL * 33.814;

        return {
            intakeLiters: intakeL.toFixed(1),
            intakeOunces: intakeOz.toFixed(0)
        };
    }, [weight, unitSystem]);

    return (
        <div className="space-y-6">
             <div className="flex justify-center p-1 bg-gray-700 rounded-lg">
                <button 
                    onClick={() => setUnitSystem('metric')} 
                    className={`w-1/2 p-2 rounded-md font-semibold transition-colors ${unitSystem === 'metric' ? 'bg-cyan-600 text-white' : 'text-gray-300'}`}>
                    Metric (kg)
                </button>
                <button 
                    onClick={() => setUnitSystem('imperial')}
                    className={`w-1/2 p-2 rounded-md font-semibold transition-colors ${unitSystem === 'imperial' ? 'bg-cyan-600 text-white' : 'text-gray-300'}`}>
                    Imperial (lbs)
                </button>
            </div>
            
            <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'})
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

            <div className="text-center bg-gray-900 p-6 rounded-lg">
                <p className="text-lg text-gray-400">Recommended Daily Water Intake</p>
                <p className="text-5xl font-bold text-cyan-400 my-2">{intakeLiters} L</p>
                <p className="text-gray-400">or {intakeOunces} oz</p>
                <p className="text-sm text-gray-500 mt-2">This is an estimate. Your needs may vary based on activity level and climate.</p>
            </div>
        </div>
    );
};

export default WaterIntakeCalculator;
