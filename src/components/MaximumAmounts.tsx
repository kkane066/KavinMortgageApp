import React from 'react';
import { PurchaseScenario } from '../utils/types';

interface MaximumAmountsProps {
  scenario: PurchaseScenario;
}

export function MaximumAmounts({ scenario }: MaximumAmountsProps) {
  const mortgagePayment = scenario.monthlyPayment - scenario.monthlyPropertyTax - scenario.monthlyHeatingCost;

  return (
    <div className="bg-gray-50 p-6 rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Maximum Amounts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-gray-600 mb-1">Maximum Purchase Price</p>
          <p className="text-3xl font-bold text-blue-600">
            ${scenario.maxPrice.toLocaleString()} CAD
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">Maximum Mortgage Amount</p>
          <p className="text-3xl font-bold text-green-600">
            ${scenario.mortgageAmount.toLocaleString()} CAD
          </p>
        </div>
        <div className="md:col-span-2">
          <p className="text-sm text-gray-600 mb-1">Total Monthly Payment</p>
          <p className="text-2xl font-semibold text-gray-800 mb-2">
            ${Math.round(scenario.monthlyPayment).toLocaleString()} CAD
          </p>
          <div className="text-sm text-gray-600 space-y-1">
            <p>Mortgage Payment: ${Math.round(mortgagePayment).toLocaleString()} CAD</p>
            <p>Property Tax: ${Math.round(scenario.monthlyPropertyTax).toLocaleString()} CAD</p>
            <p>Heating Cost: ${Math.round(scenario.monthlyHeatingCost).toLocaleString()} CAD</p>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">GDS Ratio</p>
          <p className="text-2xl font-semibold text-gray-800">
            {(scenario.gdsRatio * 100).toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
}