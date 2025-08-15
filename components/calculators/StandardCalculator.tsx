
import React, { useState } from 'react';

const StandardCalculator: React.FC = () => {
    const [display, setDisplay] = useState<string>("0");
    const [expression, setExpression] = useState<string>("");

    const handleButtonClick = (value: string) => {
        if (display.length > 20) return;

        switch (value) {
            case 'C':
                setDisplay("0");
                setExpression("");
                break;
            case 'CE':
                 setDisplay("0");
                break;
            case '←':
                setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
                break;
            case '=':
                try {
                    // A simple, safer alternative to eval()
                    const result = new Function(`return ${expression.replace(/%/g, '/100')}`)();
                    const formattedResult = Number(result.toFixed(10)).toString();
                    setDisplay(formattedResult);
                    setExpression(formattedResult);
                } catch (error) {
                    setDisplay("Error");
                    setExpression("");
                }
                break;
            case '±':
                if (display !== "0") {
                    const newDisplay = display.startsWith('-') ? display.slice(1) : '-' + display;
                    setDisplay(newDisplay);
                    setExpression(prev => prev.slice(0, -display.length) + newDisplay);
                }
                break;
            case 'sin':
            case 'cos':
            case 'tan':
            case 'log':
            case 'ln':
                handleScientific(value);
                break;
            case '√':
                 try {
                    const num = parseFloat(display);
                    const result = Math.sqrt(num).toString();
                    setDisplay(result);
                    setExpression(result);
                } catch {
                    setDisplay("Error");
                }
                break;
            case 'x²':
                 try {
                    const num = parseFloat(display);
                    const result = (num * num).toString();
                    setDisplay(result);
                    setExpression(result);
                } catch {
                    setDisplay("Error");
                }
                break;
            default:
                // Handle operators and numbers
                if (['+', '-', '*', '/'].includes(value)) {
                    if (expression === "" && display !== "0") {
                        setExpression(display + value);
                    } else if (expression !== "") {
                         setExpression(prev => prev + value);
                    }
                    setDisplay("0");
                } else { // It's a number or dot
                    if (display === "0" && value !== '.') {
                        setDisplay(value);
                        setExpression(prev => prev + value);
                    } else if (!display.includes('.') || value !== '.') {
                         setDisplay(prev => prev + value);
                         setExpression(prev => prev + value);
                    }
                }
        }
    };
    
    const handleScientific = (func: string) => {
        try {
            const num = parseFloat(display);
            let result: number;
            switch(func) {
                case 'sin': result = Math.sin(num * Math.PI / 180); break;
                case 'cos': result = Math.cos(num * Math.PI / 180); break;
                case 'tan': result = Math.tan(num * Math.PI / 180); break;
                case 'log': result = Math.log10(num); break;
                case 'ln': result = Math.log(num); break;
                default: return;
            }
            const formattedResult = Number(result.toFixed(10)).toString();
            setDisplay(formattedResult);
            setExpression(formattedResult);
        } catch {
            setDisplay("Error");
        }
    };

    const buttons = [
        ['sin', 'cos', 'tan', 'C', 'CE'],
        ['log', 'ln', '√', 'x²', '←'],
        ['7', '8', '9', '/', '%'],
        ['4', '5', '6', '*', '±'],
        ['1', '2', '3', '-', '='],
        ['0', '.', '+']
    ];

    const getButtonClass = (btn: string) => {
        if (['/', '*', '-', '+', '='].includes(btn)) return 'bg-cyan-600 hover:bg-cyan-500';
        if (['C', 'CE', '←'].includes(btn)) return 'bg-gray-600 hover:bg-gray-500';
        if (btn === '=') return 'row-span-2';
        return 'bg-gray-700 hover:bg-gray-600';
    };

    return (
        <div className="w-full max-w-sm mx-auto bg-gray-900 rounded-lg shadow-lg p-4">
            <div className="bg-gray-800 text-white text-4xl text-right p-4 rounded-md mb-4 break-words">
                {display}
            </div>
             <div className="text-gray-400 text-sm text-right h-6 mb-2 break-words overflow-x-auto">
                {expression || ' '}
            </div>
            <div className="grid grid-cols-5 gap-2">
                {buttons.flat().map((btn, i) => {
                    const isEquals = btn === '=';
                    const isZero = btn === '0';
                    return (
                        <button
                            key={i}
                            onClick={() => handleButtonClick(btn)}
                            className={`
                                text-white text-xl font-semibold rounded-md transition-colors duration-150
                                h-16 
                                ${getButtonClass(btn)}
                                ${isEquals ? 'row-span-2 h-auto' : ''}
                                ${isZero ? 'col-span-2' : ''}
                            `}
                        >
                            {btn}
                        </button>
                    )
                })}
            </div>
        </div>
    );
};

export default StandardCalculator;
