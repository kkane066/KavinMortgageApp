import React from 'react';
import { PurchaseScenario } from '../utils/types';

interface ScenarioTableProps {
  scenarios: PurchaseScenario[];
}

export function ScenarioTable({ scenarios }: ScenarioTableProps) {
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Down Payment
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Max Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Down Payment Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              CMHC Premium
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mortgage Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Monthly Payment
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Monthly Breakdown
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {scenarios.map((scenario) => {
            const mortgagePayment = scenario.monthlyPayment - scenario.monthlyPropertyTax - scenario.monthlyHeatingCost;
            return (
              <tr key={scenario.downPaymentPercent}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {scenario.downPaymentPercent}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${scenario.maxPrice.toLocaleString()} CAD
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${scenario.downPaymentAmount.toLocaleString()} CAD
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${Math.round(scenario.cmhcPremium).toLocaleString()} CAD
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${scenario.mortgageAmount.toLocaleString()} CAD
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${Math.round(scenario.monthlyPayment).toLocaleString()} CAD
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div className="space-y-1">
                    <p>Mortgage: ${Math.round(mortgagePayment).toLocaleString()}</p>
                    <p>Tax: ${Math.round(scenario.monthlyPropertyTax).toLocaleString()}</p>
                    <p>Heat: ${Math.round(scenario.monthlyHeatingCost).toLocaleString()}</p>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}