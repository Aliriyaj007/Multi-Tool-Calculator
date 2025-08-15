
import React, { useState, useMemo } from 'react';
import { CALCULATOR_CATEGORIES } from './constants';
import type { Calculator, CalculatorCategory } from './types';

const App: React.FC = () => {
  const [activeCalculator, setActiveCalculator] = useState<Calculator>(CALCULATOR_CATEGORIES[0].calculators[0]);
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set([CALCULATOR_CATEGORIES[0].name]));

  const ActiveCalculatorComponent = useMemo(() => {
    return activeCalculator.component;
  }, [activeCalculator]);

  const toggleCategory = (categoryName: string) => {
    setOpenCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName);
      } else {
        newSet.add(categoryName);
      }
      return newSet;
    });
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 md:w-72 bg-gray-800 flex flex-col border-r border-gray-700">
        <header className="p-4 border-b border-gray-700 flex items-center space-x-3">
          <span className="text-2xl">🧮</span>
          <h1 className="text-xl font-bold text-white">Multi-Tool Calc</h1>
        </header>
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {CALCULATOR_CATEGORIES.map((category: CalculatorCategory) => (
            <div key={category.name}>
              <button
                onClick={() => toggleCategory(category.name)}
                className="w-full flex justify-between items-center p-2 text-left text-gray-300 hover:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <div className="flex items-center space-x-3">
                  <category.icon className="w-5 h-5" />
                  <span className="font-semibold">{category.name}</span>
                </div>
                <svg
                  className={`w-5 h-5 transition-transform duration-200 ${
                    openCategories.has(category.name) ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {openCategories.has(category.name) && (
                <ul className="pl-6 mt-2 space-y-1">
                  {category.calculators.map((calc: Calculator) => (
                    <li key={calc.name}>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveCalculator(calc);
                        }}
                        className={`block p-2 text-sm rounded-md transition-colors ${
                          activeCalculator.name === calc.name
                            ? 'bg-cyan-600 text-white font-bold'
                            : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                        }`}
                      >
                        {calc.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h2 className="text-3xl font-bold text-white">{activeCalculator.name}</h2>
            <p className="text-gray-400 mt-1">{activeCalculator.description}</p>
          </header>
          <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700">
            <ActiveCalculatorComponent />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
