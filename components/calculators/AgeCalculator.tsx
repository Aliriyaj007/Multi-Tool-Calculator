
import React, { useState, useMemo } from 'react';

const AgeCalculator: React.FC = () => {
    const today = new Date().toISOString().split('T')[0];
    const [birthDate, setBirthDate] = useState<string>(today);

    const { years, months, days } = useMemo(() => {
        if (!birthDate) return { years: 0, months: 0, days: 0 };

        const start = new Date(birthDate);
        const end = new Date();
        
        if (start > end) return { years: 0, months: 0, days: 0 };
        
        let years = end.getFullYear() - start.getFullYear();
        let months = end.getMonth() - start.getMonth();
        let days = end.getDate() - start.getDate();

        if (days < 0) {
            months--;
            const lastMonth = new Date(end.getFullYear(), end.getMonth(), 0);
            days += lastMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        return { years, months, days };
    }, [birthDate]);

    return (
        <div className="space-y-6">
            <div>
                <label htmlFor="birthdate" className="block text-sm font-medium text-gray-300 mb-2">
                    Select Your Date of Birth
                </label>
                <input
                    type="date"
                    id="birthdate"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    max={today}
                    className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                />
            </div>
            
            <div className="text-center bg-gray-900 p-6 rounded-lg">
                <p className="text-lg text-gray-400">Your Age Is</p>
                <div className="flex justify-center items-baseline space-x-2 md:space-x-4 mt-2">
                    <div>
                        <span className="text-5xl md:text-6xl font-bold text-cyan-400">{years}</span>
                        <span className="text-xl text-gray-300 ml-1">Years</span>
                    </div>
                    <div>
                        <span className="text-5xl md:text-6xl font-bold text-cyan-400">{months}</span>
                        <span className="text-xl text-gray-300 ml-1">Months</span>
                    </div>
                    <div>
                        <span className="text-5xl md:text-6xl font-bold text-cyan-400">{days}</span>
                        <span className="text-xl text-gray-300 ml-1">Days</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgeCalculator;
