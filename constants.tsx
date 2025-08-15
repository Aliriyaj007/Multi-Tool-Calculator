import React from 'react';
import type { CalculatorCategory } from './types';
import StandardCalculator from './components/calculators/StandardCalculator';
import BMICalculator from './components/calculators/BMICalculator';
import SquareCalculator from './components/calculators/SquareCalculator';
import LoanCalculator from './components/calculators/LoanCalculator';
import AgeCalculator from './components/calculators/AgeCalculator';
import PercentageCalculator from './components/calculators/PercentageCalculator';
import AverageCalculator from './components/calculators/AverageCalculator';
import FractionSimplifierCalculator from './components/calculators/FractionSimplifierCalculator';
import DecimalToFractionCalculator from './components/calculators/DecimalToFractionCalculator';
import PrimeNumberCheckerCalculator from './components/calculators/PrimeNumberCheckerCalculator';
import CircleCalculator from './components/calculators/CircleCalculator';
import RectangleCalculator from './components/calculators/RectangleCalculator';
import TriangleCalculator from './components/calculators/TriangleCalculator';
import CubeCalculator from './components/calculators/CubeCalculator';
import SphereCalculator from './components/calculators/SphereCalculator';
import DiscountCalculator from './components/calculators/DiscountCalculator';
import InvestmentCalculator from './components/calculators/InvestmentCalculator';
import CommissionCalculator from './components/calculators/CommissionCalculator';
import BMRCalculator from './components/calculators/BMRCalculator';
import WaterIntakeCalculator from './components/calculators/WaterIntakeCalculator';
import IdealWeightCalculator from './components/calculators/IdealWeightCalculator';
import TimeCalculator from './components/calculators/TimeCalculator';
import DaysUntilNewYearCalculator from './components/calculators/DaysUntilNewYearCalculator';

// Icons
import { CalculatorIcon, GeometryIcon, FinanceIcon, HealthIcon, TimeIcon } from './components/icons';

export const CALCULATOR_CATEGORIES: CalculatorCategory[] = [
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
