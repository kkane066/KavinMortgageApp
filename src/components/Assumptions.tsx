import React from 'react';

interface AssumptionsProps {
  amortizationYears: number;
  annualPropertyTax: number;
  monthlyHeatingCost: number;
  interestRate: number;
  effectiveQualifyingRate: number;
}

export function Assumptions({ 
  amortizationYears,
  annualPropertyTax,
  monthlyHeatingCost,
  interestRate,
  effectiveQualifyingRate
}: AssumptionsProps) {
  return (
    <div className="mt-6 text-sm text-gray-500">
      <p>* Calculations assume:</p>
      <ul className="list-disc ml-5 mt-2">
        <li>{amortizationYears}-year amortization</li>
        <li>Contract rate of {interestRate}%</li>
        <li>Qualifying rate of {effectiveQualifyingRate}% (higher of {interestRate + 2}% or 5.25%)</li>
        <li>Annual property tax of ${annualPropertyTax.toLocaleString()} CAD</li>
        <li>Monthly heating costs of ${monthlyHeatingCost} CAD</li>
        <li>No other debt obligations</li>
        <li>CMHC insurance included for down payments less than 20%</li>
      </ul>
    </div>
  );
}