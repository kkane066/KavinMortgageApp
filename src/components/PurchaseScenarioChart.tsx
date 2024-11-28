import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import { PurchaseScenario } from '../utils/types';

interface PurchaseScenarioChartProps {
  scenarios: PurchaseScenario[];
}

const formatCurrency = (value: number) => `$${Math.round(value).toLocaleString()}`;

const renderCustomLabel = (props: any) => {
  const { x, y, width, height, value } = props;
  const radius = 10;

  return (
    <g>
      <text
        x={x + width / 2}
        y={y - radius}
        fill="#666"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="12"
      >
        {formatCurrency(value)}
      </text>
    </g>
  );
};

export function PurchaseScenarioChart({ scenarios }: PurchaseScenarioChartProps) {
  const data = scenarios.map(scenario => ({
    downPayment: `${scenario.downPaymentPercent}%`,
    'Maximum Price': scenario.maxPrice,
    'Down Payment': scenario.downPaymentAmount,
    'Mortgage Amount': scenario.mortgageAmount,
  }));

  return (
    <div className="h-[500px] w-full mt-6">
      <h2 className="text-lg font-semibold mb-4">Purchase Scenarios Comparison</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data}
          margin={{
            top: 40,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="downPayment" />
          <YAxis tickFormatter={formatCurrency} />
          <Tooltip 
            formatter={(value: number) => `$${value.toLocaleString()} CAD`}
          />
          <Legend />
          <Bar dataKey="Maximum Price" fill="#4F46E5">
            <LabelList dataKey="Maximum Price" content={renderCustomLabel} />
          </Bar>
          <Bar dataKey="Down Payment" fill="#10B981">
            <LabelList dataKey="Down Payment" content={renderCustomLabel} />
          </Bar>
          <Bar dataKey="Mortgage Amount" fill="#6366F1">
            <LabelList dataKey="Mortgage Amount" content={renderCustomLabel} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}