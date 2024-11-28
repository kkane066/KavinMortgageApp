import React from 'react';

interface MaxPurchasePriceProps {
  maxPrice: number;
}

export function MaxPurchasePrice({ maxPrice }: MaxPurchasePriceProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Maximum Purchase Price</h2>
      <p className="text-3xl font-bold text-green-600">
        ${maxPrice.toLocaleString()} CAD
      </p>
    </div>
  );
}