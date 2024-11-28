import React from 'react';

export function PrintButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className="print:hidden amazon-button"
    >
      Print to PDF
    </button>
  );
}