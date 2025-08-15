import React, { useState, useMemo } from 'react';

const BMRCalculator: React.FC = () => {
    const [age, setAge] = useState<string>('30');
    const [gender, setGender] = useState<'male' | 'female'>('male');
    const [height, setHeight] = useState<string>('180');
    const [weight, setWeight] = useState<string>('75');
    const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
    
    const bmr = useMemo(() => {
        const ageVal = parseInt(age);
        let heightVal = parseFloat(height);
        let weightVal = parseFloat(weight);

        if (isNaN(ageVal) || isNaN(heightVal) || isNaN(weightVal) || ageVal <= 0 || heightVal <= 0 || weightVal <= 0) {
            return '0';
        }

        // Convert to metric if imperial
        if (unitSystem === 'imperial') {
            heightVal = heightVal * 2.54; // inches to cm
            weightVal = weightVal * 0.453592; // lbs to kg
        }

        // Mifflin-St Jeor Equation
        let bmrValue: number;
        if (gender === 'male') {
            bmrValue = (10 * weightVal) + (6.25 * heightVal) - (5 * ageVal) + 5;
        } else {
            bmrValue = (10 * weightVal) + (6.25 * heightVal) - (5 * ageVal) - 161;
        }
        return bmrValue.toFixed(0);

    }, [age, gender, height, weight, unitSystem]);

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
                    <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
                    <div className="flex justify-center p-1 bg-gray-900 rounded-lg">
                        <button onClick={() => setGender('male')} className={`w-1/2 p-2 rounded-md font-semibold transition-colors ${gender === 'male' ? 'bg-gray-700 text-white' : 'text-gray-400'}`}>Male</button>
                        <button onClick={() => setGender('female')} className={`w-1/2 p-2 rounded-md font-semibold transition-colors ${gender === 'female' ? 'bg-gray-700 text-white' : 'text-gray-400'}`}>Female</button>
                    </div>
                </div>
                 <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-300 mb-2">Age (years)</label>
                    <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" />
                </div>
                <div>
                    <label htmlFor="height" className="block text-sm font-medium text-gray-300 mb-2">Height ({unitSystem === 'metric' ? 'cm' : 'inches'})</label>
                    <input type="number" id="height" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" />
                </div>
                 <div>
                    <label htmlFor="weight" className="block text-sm font-medium text-gray-300 mb-2">Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'})</label>
                    <input type="number" id="weight" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" />
                </div>
            </div>

            <div className="text-center bg-gray-900 p-6 rounded-lg">
                <p className="text-lg text-gray-400">Basal Metabolic Rate (BMR)</p>
                <p className="text-5xl font-bold text-cyan-400 my-2">{bmr}</p>
                <p className="text-gray-400">Calories/day</p>
                <p className="text-sm text-gray-500 mt-2">Your BMR is the number of calories your body needs to function at rest.</p>
            </div>
        </div>
    );
};

export default BMRCalculator;
