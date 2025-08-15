
import React from 'react';

interface PlaceholderCalculatorProps {
  name: string;
}

const PlaceholderCalculator: React.FC<PlaceholderCalculatorProps> = ({ name }) => {
  return (
    <div className="flex flex-col items-center justify-center h-48 text-center text-gray-400">
      <div className="text-6xl mb-4">🚧</div>
      <h3 className="text-xl font-semibold text-white">{name}</h3>
      <p>This feature is currently under construction.</p>
      <p>Check back soon!</p>
    </div>
  );
};

export default PlaceholderCalculator;
