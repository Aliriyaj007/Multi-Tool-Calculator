import React, { useMemo } from 'react';

const DaysUntilNewYearCalculator: React.FC = () => {
    const daysLeft = useMemo(() => {
        const today = new Date();
        const currentYear = today.getFullYear();
        const newYearDate = new Date(currentYear + 1, 0, 1); // Month is 0-indexed
        
        const timeDiff = newYearDate.getTime() - today.getTime();
        const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        
        return days;
    }, []);

    return (
        <div className="text-center bg-gray-900 p-8 rounded-lg">
            <p className="text-2xl text-gray-300">Days until next New Year</p>
            <p className="text-8xl font-bold text-cyan-400 my-4">{daysLeft}</p>
            <div className="text-4xl">🎉</div>
        </div>
    );
};

export default DaysUntilNewYearCalculator;
