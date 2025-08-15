import React, { useState, useMemo } from 'react';

const TimeCalculator: React.FC = () => {
    const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 16));
    const [operation, setOperation] = useState<'add' | 'subtract'>('add');
    const [days, setDays] = useState('0');
    const [hours, setHours] = useState('0');
    const [minutes, setMinutes] = useState('0');

    const resultDate = useMemo(() => {
        const date = new Date(startDate);
        if (isNaN(date.getTime())) {
            return 'Invalid start date';
        }

        const d = parseInt(days) || 0;
        const h = parseInt(hours) || 0;
        const m = parseInt(minutes) || 0;

        const multiplier = operation === 'add' ? 1 : -1;

        date.setDate(date.getDate() + (d * multiplier));
        date.setHours(date.getHours() + (h * multiplier));
        date.setMinutes(date.getMinutes() + (m * multiplier));

        return date.toLocaleString();
    }, [startDate, operation, days, hours, minutes]);
    
    return (
        <div className="space-y-6">
            <div>
                <label htmlFor="start-date" className="block text-sm font-medium text-gray-300 mb-2">Start Date & Time</label>
                <input
                    type="datetime-local"
                    id="start-date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                />
            </div>
            
            <div className="flex justify-center p-1 bg-gray-700 rounded-lg">
                <button onClick={() => setOperation('add')} className={`w-1/2 p-2 rounded-md font-semibold transition-colors ${operation === 'add' ? 'bg-cyan-600 text-white' : 'text-gray-300'}`}>Add</button>
                <button onClick={() => setOperation('subtract')} className={`w-1/2 p-2 rounded-md font-semibold transition-colors ${operation === 'subtract' ? 'bg-cyan-600 text-white' : 'text-gray-300'}`}>Subtract</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label htmlFor="days" className="block text-sm font-medium text-gray-300 mb-2">Days</label>
                    <input type="number" id="days" value={days} onChange={e => setDays(e.target.value)} className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3" />
                </div>
                <div>
                    <label htmlFor="hours" className="block text-sm font-medium text-gray-300 mb-2">Hours</label>
                    <input type="number" id="hours" value={hours} onChange={e => setHours(e.target.value)} className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3" />
                </div>
                <div>
                    <label htmlFor="minutes" className="block text-sm font-medium text-gray-300 mb-2">Minutes</label>
                    <input type="number" id="minutes" value={minutes} onChange={e => setMinutes(e.target.value)} className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3" />
                </div>
            </div>

            <div className="text-center bg-gray-900 p-6 rounded-lg">
                <p className="text-lg text-gray-400">Resulting Date & Time</p>
                <p className="text-3xl font-bold text-cyan-400 my-2">{resultDate}</p>
            </div>
        </div>
    );
};

export default TimeCalculator;
