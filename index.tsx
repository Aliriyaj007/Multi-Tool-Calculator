import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

//================================================================
// TYPES
//================================================================
interface Calculator {
  name: string;
  description: string;
  component: React.FC;
}

interface CalculatorCategory {
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  calculators: Calculator[];
}

//================================================================
// ICONS
//================================================================
const CalculatorIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const GeometryIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const FinanceIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const HealthIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const TimeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

//================================================================
// CALCULATOR COMPONENTS
//================================================================

const StandardCalculator: React.FC = () => {
    const [display, setDisplay] = React.useState<string>("0");
    const [expression, setExpression] = React.useState<string>("");

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

const PercentageCalculator: React.FC = () => {
    const [percentage, setPercentage] = React.useState<string>('10');
    const [baseValue, setBaseValue] = React.useState<string>('50');

    const result = React.useMemo(() => {
        const p = parseFloat(percentage);
        const b = parseFloat(baseValue);
        if (isNaN(p) || isNaN(b)) {
            return 'Invalid input';
        }
        return ((p / 100) * b).toFixed(2);
    }, [percentage, baseValue]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="percentage" className="block text-sm font-medium text-gray-300 mb-2">
                        Percentage (%)
                    </label>
                    <input
                        type="number"
                        id="percentage"
                        value={percentage}
                        onChange={(e) => setPercentage(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="e.g. 10"
                    />
                </div>
                <div>
                    <label htmlFor="baseValue" className="block text-sm font-medium text-gray-300 mb-2">
                        Of
                    </label>
                    <input
                        type="number"
                        id="baseValue"
                        value={baseValue}
                        onChange={(e) => setBaseValue(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="e.g. 50"
                    />
                </div>
            </div>

            <div className="text-center bg-gray-900 p-6 rounded-lg">
                <p className="text-lg text-gray-400">Result</p>
                <p className="text-5xl font-bold text-cyan-400 my-2">{result}</p>
                <p className="text-gray-500">{percentage}% of {baseValue} is {result}</p>
            </div>
        </div>
    );
};

const AverageCalculator: React.FC = () => {
    const [numbers, setNumbers] = React.useState<string>('10, 20, 30, 40, 50');

    const average = React.useMemo(() => {
        const numArray = numbers
            .split(',')
            .map(n => parseFloat(n.trim()))
            .filter(n => !isNaN(n));

        if (numArray.length === 0) {
            return '0.00';
        }

        const sum = numArray.reduce((acc, curr) => acc + curr, 0);
        return (sum / numArray.length).toFixed(2);
    }, [numbers]);

    return (
        <div className="space-y-6">
            <div>
                <label htmlFor="numbers" className="block text-sm font-medium text-gray-300 mb-2">
                    Enter numbers, separated by commas
                </label>
                <textarea
                    id="numbers"
                    value={numbers}
                    onChange={(e) => setNumbers(e.target.value)}
                    rows={4}
                    className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="e.g. 10, 20, 30, 40, 50"
                />
            </div>
            
            <div className="text-center bg-gray-900 p-6 rounded-lg">
                <p className="text-lg text-gray-400">Average</p>
                <p className="text-5xl font-bold text-cyan-400 my-2">{average}</p>
            </div>
        </div>
    );
};

const FractionSimplifierCalculator: React.FC = () => {
    const [numerator, setNumerator] = React.useState<string>('12');
    const [denominator, setDenominator] = React.useState<string>('30');

    const gcd = (a: number, b: number): number => {
        return b === 0 ? a : gcd(b, a % b);
    };

    const simplified = React.useMemo(() => {
        const num = parseInt(numerator);
        const den = parseInt(denominator);

        if (isNaN(num) || isNaN(den) || den === 0) {
            return { simplifiedNum: 'Invalid', simplifiedDen: 'Input' };
        }
        
        const commonDivisor = gcd(Math.abs(num), Math.abs(den));
        const sign = (num * den < 0) ? -1 : 1;

        return {
            simplifiedNum: (sign * Math.abs(num) / commonDivisor).toString(),
            simplifiedDen: (Math.abs(den) / commonDivisor).toString()
        };
    }, [numerator, denominator]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <input
                    type="number"
                    value={numerator}
                    onChange={(e) => setNumerator(e.target.value)}
                    className="w-full text-center bg-gray-900 border border-gray-700 text-white rounded-md p-3 text-2xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="Numerator"
                />
                <hr className="border-gray-600 block md:hidden" />
                <input
                    type="number"
                    value={denominator}
                    onChange={(e) => setDenominator(e.target.value)}
                    className="w-full text-center bg-gray-900 border border-gray-700 text-white rounded-md p-3 text-2xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="Denominator"
                />
            </div>

            <div className="flex items-center justify-center text-4xl text-gray-400">=</div>

            <div className="text-center bg-gray-900 p-6 rounded-lg">
                <p className="text-lg text-gray-400 mb-4">Simplified Fraction</p>
                <div className="flex flex-col items-center">
                    <span className="text-5xl font-bold text-cyan-400">{simplified.simplifiedNum}</span>
                    <hr className="w-24 border-t-2 border-cyan-400 my-2" />
                    <span className="text-5xl font-bold text-cyan-400">{simplified.simplifiedDen}</span>
                </div>
            </div>
        </div>
    );
};

const DecimalToFractionCalculator: React.FC = () => {
    const [decimal, setDecimal] = React.useState<string>('0.75');

    const gcd = (a: number, b: number): number => {
        return b === 0 ? a : gcd(b, a % b);
    };

    const fraction = React.useMemo(() => {
        const dec = parseFloat(decimal);
        if (isNaN(dec)) {
            return { num: 'Invalid', den: 'Input' };
        }

        const decStr = decimal.toString();
        if (!decStr.includes('.')) {
            return { num: decStr, den: '1' };
        }
        
        const decimalPlaces = decStr.split('.')[1].length;
        let denominator = Math.pow(10, decimalPlaces);
        let numerator = dec * denominator;

        const commonDivisor = gcd(Math.round(numerator), denominator);
        
        return {
            num: (Math.round(numerator) / commonDivisor).toString(),
            den: (denominator / commonDivisor).toString(),
        };
    }, [decimal]);

    return (
        <div className="space-y-6">
            <div>
                <label htmlFor="decimal" className="block text-sm font-medium text-gray-300 mb-2">
                    Enter a decimal number
                </label>
                <input
                    type="number"
                    id="decimal"
                    value={decimal}
                    onChange={(e) => setDecimal(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="e.g. 0.75"
                />
            </div>
            
             <div className="text-center bg-gray-900 p-6 rounded-lg">
                <p className="text-lg text-gray-400 mb-4">Equivalent Fraction</p>
                <div className="flex flex-col items-center">
                    <span className="text-5xl font-bold text-cyan-400">{fraction.num}</span>
                    <hr className="w-24 border-t-2 border-cyan-400 my-2" />
                    <span className="text-5xl font-bold text-cyan-400">{fraction.den}</span>
                </div>
            </div>
        </div>
    );
};

const PrimeNumberCheckerCalculator: React.FC = () => {
    const [number, setNumber] = React.useState<string>('17');

    const isPrime = React.useMemo(() => {
        const num = parseInt(number);
        if (isNaN(num) || num < 2 || !Number.isInteger(num)) {
            return { text: 'Invalid Input', color: 'text-yellow-400' };
        }
        if (num === 2) {
            return { text: 'Prime', color: 'text-green-400' };
        }
        if (num % 2 === 0) {
            return { text: 'Not Prime', color: 'text-red-400' };
        }
        for (let i = 3; i <= Math.sqrt(num); i += 2) {
            if (num % i === 0) {
                return { text: 'Not Prime', color: 'text-red-400' };
            }
        }
        return { text: 'Prime', color: 'text-green-400' };
    }, [number]);

    return (
        <div className="space-y-6">
            <div>
                <label htmlFor="number" className="block text-sm font-medium text-gray-300 mb-2">
                    Enter an integer
                </label>
                <input
                    type="number"
                    id="number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="e.g. 17"
                />
            </div>
            
            <div className="text-center bg-gray-900 p-6 rounded-lg">
                 <p className="text-lg text-gray-400">Result</p>
                 <p className={`text-5xl font-bold my-2 ${isPrime.color}`}>{isPrime.text}</p>
                 <p className="text-gray-500">The number {number} is {isPrime.text.toLowerCase()}.</p>
            </div>
        </div>
    );
};

const SquareCalculator: React.FC = () => {
    const [side, setSide] = React.useState<string>('10');

    const { area, perimeter } = React.useMemo(() => {
        const s = parseFloat(side);
        if (isNaN(s) || s < 0) {
            return { area: 'Invalid', perimeter: 'Invalid' };
        }
        return {
            area: (s * s).toFixed(2),
            perimeter: (4 * s).toFixed(2),
        };
    }, [side]);

    return (
        <div className="space-y-6">
            <div>
                <label htmlFor="side" className="block text-sm font-medium text-gray-300 mb-2">
                    Side Length
                </label>
                <div className="relative">
                    <input
                        type="number"
                        id="side"
                        value={side}
                        onChange={(e) => setSide(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="e.g. 10"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                <div className="bg-gray-900 p-6 rounded-lg">
                    <p className="text-lg text-gray-400">Area</p>
                    <p className="text-4xl font-bold text-white my-2">{area}</p>
                    <p className="text-gray-500">(side x side)</p>
                </div>
                <div className="bg-gray-900 p-6 rounded-lg">
                    <p className="text-lg text-gray-400">Perimeter</p>
                    <p className="text-4xl font-bold text-white my-2">{perimeter}</p>
                    <p className="text-gray-500">(4 x side)</p>
                </div>
            </div>
        </div>
    );
};

const CircleCalculator: React.FC = () => {
    const [radius, setRadius] = React.useState<string>('10');

    const { area, circumference } = React.useMemo(() => {
        const r = parseFloat(radius);
        if (isNaN(r) || r < 0) {
            return { area: 'Invalid', circumference: 'Invalid' };
        }
        return {
            area: (Math.PI * r * r).toFixed(2),
            circumference: (2 * Math.PI * r).toFixed(2),
        };
    }, [radius]);

    return (
        <div className="space-y-6">
            <div>
                <label htmlFor="radius" className="block text-sm font-medium text-gray-300 mb-2">
                    Radius
                </label>
                <input
                    type="number"
                    id="radius"
                    value={radius}
                    onChange={(e) => setRadius(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="e.g. 10"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                <div className="bg-gray-900 p-6 rounded-lg">
                    <p className="text-lg text-gray-400">Area</p>
                    <p className="text-4xl font-bold text-white my-2">{area}</p>
                    <p className="text-gray-500">(π × r²)</p>
                </div>
                <div className="bg-gray-900 p-6 rounded-lg">
                    <p className="text-lg text-gray-400">Circumference</p>
                    <p className="text-4xl font-bold text-white my-2">{circumference}</p>
                    <p className="text-gray-500">(2 × π × r)</p>
                </div>
            </div>
        </div>
    );
};

const RectangleCalculator: React.FC = () => {
    const [width, setWidth] = React.useState<string>('10');
    const [length, setLength] = React.useState<string>('20');

    const { area, perimeter } = React.useMemo(() => {
        const w = parseFloat(width);
        const l = parseFloat(length);
        if (isNaN(w) || isNaN(l) || w < 0 || l < 0) {
            return { area: 'Invalid', perimeter: 'Invalid' };
        }
        return {
            area: (w * l).toFixed(2),
            perimeter: (2 * (w + l)).toFixed(2),
        };
    }, [width, length]);

    return (
        <div className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label htmlFor="width" className="block text-sm font-medium text-gray-300 mb-2">
                        Width
                    </label>
                    <input
                        type="number"
                        id="width"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="e.g. 10"
                    />
                </div>
                <div>
                     <label htmlFor="length" className="block text-sm font-medium text-gray-300 mb-2">
                        Length
                    </label>
                    <input
                        type="number"
                        id="length"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="e.g. 20"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                <div className="bg-gray-900 p-6 rounded-lg">
                    <p className="text-lg text-gray-400">Area</p>
                    <p className="text-4xl font-bold text-white my-2">{area}</p>
                    <p className="text-gray-500">(width × length)</p>
                </div>
                <div className="bg-gray-900 p-6 rounded-lg">
                    <p className="text-lg text-gray-400">Perimeter</p>
                    <p className="text-4xl font-bold text-white my-2">{perimeter}</p>
                    <p className="text-gray-500">(2 × (width + length))</p>
                </div>
            </div>
        </div>
    );
};

const TriangleCalculator: React.FC = () => {
    const [base, setBase] = React.useState<string>('10');
    const [height, setHeight] = React.useState<string>('5');

    const area = React.useMemo(() => {
        const b = parseFloat(base);
        const h = parseFloat(height);
        if (isNaN(b) || isNaN(h) || b < 0 || h < 0) {
            return 'Invalid';
        }
        return (0.5 * b * h).toFixed(2);
    }, [base, height]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label htmlFor="base" className="block text-sm font-medium text-gray-300 mb-2">
                        Base
                    </label>
                    <input
                        type="number"
                        id="base"
                        value={base}
                        onChange={(e) => setBase(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="e.g. 10"
                    />
                </div>
                <div>
                     <label htmlFor="height" className="block text-sm font-medium text-gray-300 mb-2">
                        Height
                    </label>
                    <input
                        type="number"
                        id="height"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="e.g. 5"
                    />
                </div>
            </div>

            <div className="text-center bg-gray-900 p-6 rounded-lg">
                <p className="text-lg text-gray-400">Area</p>
                <p className="text-5xl font-bold text-cyan-400 my-2">{area}</p>
                <p className="text-gray-500">(0.5 × base × height)</p>
            </div>
             <div className="text-sm text-gray-500 p-3 bg-gray-900 rounded-md">
                <strong>Note:</strong> This calculates the area of a triangle given its base and perpendicular height. Other properties like perimeter require more information (e.g., all three side lengths).
            </div>
        </div>
    );
};

const CubeCalculator: React.FC = () => {
    const [side, setSide] = React.useState<string>('5');

    const { volume, surfaceArea } = React.useMemo(() => {
        const s = parseFloat(side);
        if (isNaN(s) || s < 0) {
            return { volume: 'Invalid', surfaceArea: 'Invalid' };
        }
        return {
            volume: (s * s * s).toFixed(2),
            surfaceArea: (6 * s * s).toFixed(2),
        };
    }, [side]);

    return (
        <div className="space-y-6">
            <div>
                <label htmlFor="side" className="block text-sm font-medium text-gray-300 mb-2">
                    Side Length
                </label>
                <input
                    type="number"
                    id="side"
                    value={side}
                    onChange={(e) => setSide(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="e.g. 5"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                <div className="bg-gray-900 p-6 rounded-lg">
                    <p className="text-lg text-gray-400">Volume</p>
                    <p className="text-4xl font-bold text-white my-2">{volume}</p>
                    <p className="text-gray-500">(side³)</p>
                </div>
                <div className="bg-gray-900 p-6 rounded-lg">
                    <p className="text-lg text-gray-400">Surface Area</p>
                    <p className="text-4xl font-bold text-white my-2">{surfaceArea}</p>
                    <p className="text-gray-500">(6 × side²)</p>
                </div>
            </div>
        </div>
    );
};

const SphereCalculator: React.FC = () => {
    const [radius, setRadius] = React.useState<string>('5');

    const { volume, surfaceArea } = React.useMemo(() => {
        const r = parseFloat(radius);
        if (isNaN(r) || r < 0) {
            return { volume: 'Invalid', surfaceArea: 'Invalid' };
        }
        return {
            volume: ((4 / 3) * Math.PI * r * r * r).toFixed(2),
            surfaceArea: (4 * Math.PI * r * r).toFixed(2),
        };
    }, [radius]);

    return (
        <div className="space-y-6">
            <div>
                <label htmlFor="radius" className="block text-sm font-medium text-gray-300 mb-2">
                    Radius
                </label>
                <input
                    type="number"
                    id="radius"
                    value={radius}
                    onChange={(e) => setRadius(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="e.g. 5"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                <div className="bg-gray-900 p-6 rounded-lg">
                    <p className="text-lg text-gray-400">Volume</p>
                    <p className="text-4xl font-bold text-white my-2">{volume}</p>
                    <p className="text-gray-500">(4/3 × π × r³)</p>
                </div>
                <div className="bg-gray-900 p-6 rounded-lg">
                    <p className="text-lg text-gray-400">Surface Area</p>
                    <p className="text-4xl font-bold text-white my-2">{surfaceArea}</p>
                    <p className="text-gray-500">(4 × π × r²)</p>
                </div>
            </div>
        </div>
    );
};

const LoanCalculator: React.FC = () => {
    const [amount, setAmount] = React.useState<string>('10000');
    const [interest, setInterest] = React.useState<string>('5');
    const [term, setTerm] = React.useState<string>('5');

    const { monthlyPayment, totalInterest, totalPayment } = React.useMemo(() => {
        const P = parseFloat(amount); // Principal
        const r = parseFloat(interest) / 100 / 12; // Monthly interest rate
        const n = parseFloat(term) * 12; // Number of months

        if (isNaN(P) || isNaN(r) || isNaN(n) || P <= 0 || r < 0 || n <= 0) {
            return { monthlyPayment: '0.00', totalInterest: '0.00', totalPayment: '0.00' };
        }

        if (r === 0) { // No interest
            const M = P / n;
            return {
                monthlyPayment: M.toFixed(2),
                totalInterest: '0.00',
                totalPayment: P.toFixed(2),
            };
        }

        // Monthly payment formula
        const M = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const total = M * n;
        const totalInt = total - P;

        return {
            monthlyPayment: M.toFixed(2),
            totalInterest: totalInt.toFixed(2),
            totalPayment: total.toFixed(2),
        };
    }, [amount, interest, term]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-2">
                        Loan Amount ($)
                    </label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="e.g. 10000"
                    />
                </div>
                <div>
                    <label htmlFor="interest" className="block text-sm font-medium text-gray-300 mb-2">
                        Annual Interest Rate (%)
                    </label>
                    <input
                        type="number"
                        id="interest"
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="e.g. 5"
                    />
                </div>
                <div>
                    <label htmlFor="term" className="block text-sm font-medium text-gray-300 mb-2">
                        Loan Term (Years)
                    </label>
                    <input
                        type="number"
                        id="term"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="e.g. 5"
                    />
                </div>
            </div>

            <div className="text-center bg-gray-900 p-6 rounded-lg">
                <p className="text-lg text-gray-400">Monthly Payment</p>
                <p className="text-5xl font-bold text-cyan-400 my-2">${monthlyPayment}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                <div className="bg-gray-900 p-4 rounded-lg">
                    <p className="text-md text-gray-400">Total Interest Paid</p>
                    <p className="text-3xl font-semibold text-white my-1">${totalInterest}</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg">
                    <p className="text-md text-gray-400">Total Payment</p>
                    <p className="text-3xl font-semibold text-white my-1">${totalPayment}</p>
                </div>
            </div>
        </div>
    );
};

const DiscountCalculator: React.FC = () => {
    const [price, setPrice] = React.useState<string>('100');
    const [discount, setDiscount] = React.useState<string>('20');

    const { finalPrice, saved } = React.useMemo(() => {
        const p = parseFloat(price);
        const d = parseFloat(discount);
        if (isNaN(p) || isNaN(d) || p < 0 || d < 0) {
            return { finalPrice: '0.00', saved: '0.00' };
        }
        const savedAmount = p * (d / 100);
        const final = p - savedAmount;
        return {
            finalPrice: final.toFixed(2),
            saved: savedAmount.toFixed(2),
        };
    }, [price, discount]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-2">
                        Original Price ($)
                    </label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="e.g. 100"
                    />
                </div>
                <div>
                    <label htmlFor="discount" className="block text-sm font-medium text-gray-300 mb-2">
                        Discount (%)
                    </label>
                    <input
                        type="number"
                        id="discount"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="e.g. 20"
                    />
                </div>
            </div>

            <div className="text-center bg-gray-900 p-6 rounded-lg">
                <p className="text-lg text-gray-400">Final Price</p>
                <p className="text-5xl font-bold text-cyan-400 my-2">${finalPrice}</p>
                <p className="text-green-400">You save ${saved}</p>
            </div>
        </div>
    );
};

const InvestmentCalculator: React.FC = () => {
    const [principal, setPrincipal] = React.useState<string>('1000');
    const [rate, setRate] = React.useState<string>('5');
    const [term, setTerm] = React.useState<string>('10');
    const [compounding, setCompounding] = React.useState<string>('12'); // Monthly

    const futureValue = React.useMemo(() => {
        const P = parseFloat(principal);
        const r = parseFloat(rate) / 100;
        const t = parseFloat(term);
        const n = parseInt(compounding);

        if (isNaN(P) || isNaN(r) || isNaN(t) || isNaN(n) || P < 0 || r < 0 || t < 0) {
            return '0.00';
        }
        
        // Formula: A = P(1 + r/n)^(nt)
        const A = P * Math.pow(1 + (r / n), n * t);
        return A.toFixed(2);
    }, [principal, rate, term, compounding]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label htmlFor="principal" className="block text-sm font-medium text-gray-300 mb-2">
                        Initial Investment ($)
                    </label>
                    <input type="number" id="principal" value={principal} onChange={(e) => setPrincipal(e.target.value)} className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" />
                </div>
                <div>
                    <label htmlFor="rate" className="block text-sm font-medium text-gray-300 mb-2">
                        Annual Interest Rate (%)
                    </label>
                    <input type="number" id="rate" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" />
                </div>
                <div>
                    <label htmlFor="term" className="block text-sm font-medium text-gray-300 mb-2">
                        Term (Years)
                    </label>
                    <input type="number" id="term" value={term} onChange={(e) => setTerm(e.target.value)} className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" />
                </div>
                 <div>
                    <label htmlFor="compounding" className="block text-sm font-medium text-gray-300 mb-2">
                        Compounding Frequency
                    </label>
                    <select id="compounding" value={compounding} onChange={(e) => setCompounding(e.target.value)} className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500">
                        <option value="1">Annually</option>
                        <option value="2">Semi-Annually</option>
                        <option value="4">Quarterly</option>
                        <option value="12">Monthly</option>
                        <option value="365">Daily</option>
                    </select>
                </div>
            </div>

            <div className="text-center bg-gray-900 p-6 rounded-lg">
                <p className="text-lg text-gray-400">Future Value</p>
                <p className="text-5xl font-bold text-cyan-400 my-2">${futureValue}</p>
            </div>
        </div>
    );
};

const CommissionCalculator: React.FC = () => {
    const [saleAmount, setSaleAmount] = React.useState<string>('5000');
    const [rate, setRate] = React.useState<string>('3');

    const commission = React.useMemo(() => {
        const amount = parseFloat(saleAmount);
        const r = parseFloat(rate);
        if (isNaN(amount) || isNaN(r) || amount < 0 || r < 0) {
            return '0.00';
        }
        return (amount * (r / 100)).toFixed(2);
    }, [saleAmount, rate]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="saleAmount" className="block text-sm font-medium text-gray-300 mb-2">
                        Sale Amount ($)
                    </label>
                    <input
                        type="number"
                        id="saleAmount"
                        value={saleAmount}
                        onChange={(e) => setSaleAmount(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="e.g. 5000"
                    />
                </div>
                <div>
                    <label htmlFor="rate" className="block text-sm font-medium text-gray-300 mb-2">
                        Commission Rate (%)
                    </label>
                    <input
                        type="number"
                        id="rate"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="e.g. 3"
                    />
                </div>
            </div>

            <div className="text-center bg-gray-900 p-6 rounded-lg">
                <p className="text-lg text-gray-400">Commission Earned</p>
                <p className="text-5xl font-bold text-cyan-400 my-2">${commission}</p>
            </div>
        </div>
    );
};

const BMICalculator: React.FC = () => {
    const [height, setHeight] = React.useState<string>('180');
    const [weight, setWeight] = React.useState<string>('75');
    const [unitSystem, setUnitSystem] = React.useState<'metric' | 'imperial'>('metric');

    const { bmi, category, color } = React.useMemo(() => {
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

const BMRCalculator: React.FC = () => {
    const [age, setAge] = React.useState<string>('30');
    const [gender, setGender] = React.useState<'male' | 'female'>('male');
    const [height, setHeight] = React.useState<string>('180');
    const [weight, setWeight] = React.useState<string>('75');
    const [unitSystem, setUnitSystem] = React.useState<'metric' | 'imperial'>('metric');
    
    const bmr = React.useMemo(() => {
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

const WaterIntakeCalculator: React.FC = () => {
    const [weight, setWeight] = React.useState<string>('75');
    const [unitSystem, setUnitSystem] = React.useState<'metric' | 'imperial'>('metric');
    
    const { intakeLiters, intakeOunces } = React.useMemo(() => {
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

const IdealWeightCalculator: React.FC = () => {
    const [height, setHeight] = React.useState<string>('180');
    const [gender, setGender] = React.useState<'male' | 'female'>('male');
    const [unitSystem, setUnitSystem] = React.useState<'metric' | 'imperial'>('metric');

    const idealWeight = React.useMemo(() => {
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

const AgeCalculator: React.FC = () => {
    const today = new Date().toISOString().split('T')[0];
    const [birthDate, setBirthDate] = React.useState<string>(today);

    const { years, months, days } = React.useMemo(() => {
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

const TimeCalculator: React.FC = () => {
    const [startDate, setStartDate] = React.useState(new Date().toISOString().slice(0, 16));
    const [operation, setOperation] = React.useState<'add' | 'subtract'>('add');
    const [days, setDays] = React.useState('0');
    const [hours, setHours] = React.useState('0');
    const [minutes, setMinutes] = React.useState('0');

    const resultDate = React.useMemo(() => {
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

const DaysUntilNewYearCalculator: React.FC = () => {
    const daysLeft = React.useMemo(() => {
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


//================================================================
// CONSTANTS
//================================================================
const CALCULATOR_CATEGORIES: CalculatorCategory[] = [
  {
    name: "Standard & Scientific",
    icon: CalculatorIcon,
    calculators: [
      { name: "Standard Calculator", description: "Perform basic and scientific calculations.", component: StandardCalculator },
      { name: "Percentage", description: "Calculate percentages, tips, and discounts.", component: PercentageCalculator },
      { name: "Average", description: "Find the average of a set of numbers.", component: AverageCalculator },
      { name: "Fraction Simplifier", description: "Simplify fractions to their lowest terms.", component: FractionSimplifierCalculator },
      { name: "Decimal to Fraction", description: "Convert decimal numbers to fractions.", component: DecimalToFractionCalculator },
      { name: "Prime Number Checker", description: "Check if a number is prime.", component: PrimeNumberCheckerCalculator },
    ]
  },
  {
    name: "Geometry",
    icon: GeometryIcon,
    calculators: [
      { name: "Square", description: "Calculate the area and perimeter of a square.", component: SquareCalculator },
      { name: "Circle", description: "Calculate the area and circumference of a circle.", component: CircleCalculator },
      { name: "Rectangle", description: "Calculate the area and perimeter of a rectangle.", component: RectangleCalculator },
      { name: "Triangle", description: "Calculate properties of a triangle.", component: TriangleCalculator },
      { name: "Cube", description: "Calculate volume and surface area of a cube.", component: CubeCalculator },
      { name: "Sphere", description: "Calculate volume and surface area of a sphere.", component: SphereCalculator },
    ]
  },
  {
    name: "Financial",
    icon: FinanceIcon,
    calculators: [
      { name: "Loan Calculator", description: "Estimate monthly loan payments.", component: LoanCalculator },
      { name: "Discount", description: "Calculate the final price after a discount.", component: DiscountCalculator },
      { name: "Investment", description: "Calculate compound interest on investments.", component: InvestmentCalculator },
      { name: "Commission", description: "Calculate sales commission.", component: CommissionCalculator },
    ]
  },
  {
    name: "Health & Fitness",
    icon: HealthIcon,
    calculators: [
      { name: "BMI Calculator", description: "Calculate Body Mass Index.", component: BMICalculator },
      { name: "BMR Calculator", description: "Calculate Basal Metabolic Rate.", component: BMRCalculator },
      { name: "Water Intake", description: "Estimate your daily water needs.", component: WaterIntakeCalculator },
      { name: "Ideal Weight", description: "Calculate your ideal body weight.", component: IdealWeightCalculator },
    ]
  },
  {
    name: "Date & Time",
    icon: TimeIcon,
    calculators: [
      { name: "Age Calculator", description: "Calculate age from a date of birth.", component: AgeCalculator },
      { name: "Time Calculator", description: "Add or subtract units of time.", component: TimeCalculator },
      { name: "Days Until New Year", description: "Count down the days to the new year.", component: DaysUntilNewYearCalculator },
    ]
  }
];

//================================================================
// APP COMPONENT
//================================================================
const App: React.FC = () => {
  const [activeCalculator, setActiveCalculator] = React.useState<Calculator>(CALCULATOR_CATEGORIES[0].calculators[0]);
  const [openCategories, setOpenCategories] = React.useState<Set<string>>(new Set([CALCULATOR_CATEGORIES[0].name]));

  const ActiveCalculatorComponent = React.useMemo(() => {
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


//================================================================
// RENDER
//================================================================
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);