import React from 'react';

interface InputParametersProps {
  clientName: string;
  annualIncome: number;
  interestRate: number;
  effectiveQualifyingRate: number;
  amortizationYears: number;
  annualPropertyTax: number;
  monthlyHeatingCost: number;
}

export function InputParameters({ 
  clientName,
  annualIncome,
  interestRate,
  effectiveQualifyingRate,
  amortizationYears,
  annualPropertyTax,
  monthlyHeatingCost
}: InputParametersProps) {
  return (
    <div className="border-b pb-4">
      <h2 className="text-lg font-semibold mb-2">Input Parameters</h2>
      {clientName && <p className="text-gray-600">Client Name: {clientName}</p>}
      <p className="text-gray-600">Annual Income: ${annualIncome.toLocaleString()} CAD</p>
      <p className="text-gray-600">Interest Rate: {interestRate}%</p>
      <p className="text-gray-600">Qualifying Rate: {effectiveQualifyingRate}%</p>
      <p className="text-gray-600">Amortization Period: {amortizationYears} years</p>
      <p className="text-gray-600">Annual Property Tax: ${annualPropertyTax.toLocaleString()} CAD</p>
      <p className="text-gray-600">Monthly Heating Cost: ${monthlyHeatingCost} CAD</p>
    </div>
  );
}