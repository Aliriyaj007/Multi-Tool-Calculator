
import type React from 'react';

export interface Calculator {
  name: string;
  description: string;
  component: React.FC;
}

export interface CalculatorCategory {
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  calculators: Calculator[];
}
