import React, { useState, useMemo } from 'react';

const IdealWeightCalculator: React.FC = () => {
    const [height, setHeight] = useState<string>('180');
    const [gender, setGender] = useState<'male' | 'female'>('male');
    const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');

    const idealWeight = useMemo(() => {
        let heightCm = parseFloat(height);

        if (isNaN(heightCm) || heightCm <= 0) {
            return { kg: '0', lbs: '0' };
        }

        if (unitSystem === 'imperial') {
            heightCm *= 2.54; // inches to cm
        }

        // Robinson Formula (1983)
        let baseHeight = 152.4; // 5 feet in cm
        if (heightCm < baseHeight) {
            return { kg: 'N/A', lbs: 'N/A' };
        }
        
        let weightKg: number;
        if (gender === 'male') {
            weightKg = 52 + 1.9 * ((heightCm - baseHeight) / 2.54);
        } else {
            weightKg = 49 + 1.7 * ((heightCm - baseHeight) / 2.54);
        }

        const weightLbs = weightKg * 2.20462;
        
        return {
            kg: weightKg.toFixed(1),
            lbs: weightLbs.toFixed(1),
        };

    }, [height, gender, unitSystem]);

    return (
        <div className="space-y-6">
            <div className="flex justify-center p-1 bg-gray-700 rounded-lg">
                <button onClick={() => setUnitSystem('metric')} className={`w-1/2 p-2 rounded-md font-semibold transition-colors ${unitSystem === 'metric' ? 'bg-cyan-600 text-white' : 'text-gray-300'}`}>Metric (cm)</button>
                <button onClick={() => setUnitSystem('imperial')} className={`w-1/2 p-2 rounded-md font-semibold transition-colors ${unitSystem === 'imperial' ? 'bg-cyan-600 text-white' : 'text-gray-300'}`}>Imperial (in)</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
                    <div className="flex justify-center p-1 bg-gray-900 rounded-lg">
                        <button onClick={() => setGender('male')} className={`w-1/2 p-2 rounded-md font-semibold transition-colors ${gender === 'male' ? 'bg-gray-700 text-white' : 'text-gray-400'}`}>Male</button>
                        <button onClick={() => setGender('female')} className={`w-1/2 p-2 rounded-md font-semibold transition-colors ${gender === 'female' ? 'bg-gray-700 text-white' : 'text-gray-400'}`}>Female</button>
                    </div>
                </div>
                 <div>
                    <label htmlFor="height" className="block text-sm font-medium text-gray-300 mb-2">Height ({unitSystem === 'metric' ? 'cm' : 'inches'})</label>
                    <input type="number" id="height" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" />
                </div>
            </div>

            <div className="text-center bg-gray-900 p-6 rounded-lg">
                <p className="text-lg text-gray-400">Ideal Body Weight</p>
                <p className="text-5xl font-bold text-cyan-400 my-2">{idealWeight.kg} kg</p>
                <p className="text-gray-400">or {idealWeight.lbs} lbs</p>
                <p className="text-sm text-gray-500 mt-2">Based on the Robinson formula. This is an estimate and doesn't account for body composition.</p>
            </div>
        </div>
    );
};

export default IdealWeightCalculator;
