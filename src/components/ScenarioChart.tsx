import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PurchaseScenario } from '../utils/mortgageCalculator';

interface ScenarioChartProps {
  scenarios: PurchaseScenario[];
}

export function ScenarioChart({ scenarios }: ScenarioChartProps) {
  const data = scenarios.map(scenario => ({
    downPayment: `${scenario.downPaymentPercent}%`,
    'Maximum Price': scenario.maxPrice,
    'Down Payment': scenario.downPaymentAmount,
    'Mortgage Amount': scenario.mortgageAmount,
  }));

  return (
    <div className="w-full h-[400px] mt-8">
      <h2 className="text-lg font-semibold mb-4">Purchase Scenarios Comparison</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="downPayment" />
          <YAxis />
          <Tooltip 
            formatter={(value: number) => `$${value.toLocaleString()}`}
          />
          <Legend />
          <Bar dataKey="Maximum Price" fill="#4F46E5" />
          <Bar dataKey="Down Payment" fill="#10B981" />
          <Bar dataKey="Mortgage Amount" fill="#6366F1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}