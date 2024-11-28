import React, { useState } from 'react';
import { validateIncome, validateInterestRate, validateAmortization, validateAnnualPropertyTax, validateHeatingCost, validateClientName } from '../utils/validation';

interface InputFormProps {
  onParametersChange: (
    name: string,
    income: number,
    interestRate: number,
    amortization: number,
    annualPropertyTax: number,
    heatingCost: number
  ) => void;
  initialName?: string;
  initialIncome?: number;
  initialInterestRate?: number;
  initialAmortization?: number;
  initialAnnualPropertyTax?: number;
  initialHeatingCost?: number;
}

export function InputForm({
  onParametersChange,
  initialName = '',
  initialIncome = 115000,
  initialInterestRate = 5.0,
  initialAmortization = 30,
  initialAnnualPropertyTax = 3600,
  initialHeatingCost = 150
}: InputFormProps) {
  const [clientName, setClientName] = useState(initialName);
  const [income, setIncome] = useState(initialIncome.toString());
  const [interestRate, setInterestRate] = useState(initialInterestRate.toString());
  const [amortization, setAmortization] = useState(initialAmortization.toString());
  const [annualPropertyTax, setAnnualPropertyTax] = useState(initialAnnualPropertyTax.toString());
  const [heatingCost, setHeatingCost] = useState(initialHeatingCost.toString());
  
  const [nameError, setNameError] = useState<string | null>(null);
  const [incomeError, setIncomeError] = useState<string | null>(null);
  const [interestRateError, setInterestRateError] = useState<string | null>(null);
  const [amortizationError, setAmortizationError] = useState<string | null>(null);
  const [propertyTaxError, setPropertyTaxError] = useState<string | null>(null);
  const [heatingCostError, setHeatingCostError] = useState<string | null>(null);

  const validateForm = () => {
    const nameValidation = validateClientName(clientName);
    const incomeValidation = validateIncome(income);
    const interestRateValidation = validateInterestRate(interestRate);
    const amortizationValidation = validateAmortization(amortization);
    const propertyTaxValidation = validateAnnualPropertyTax(annualPropertyTax);
    const heatingCostValidation = validateHeatingCost(heatingCost);
    
    setNameError(nameValidation);
    setIncomeError(incomeValidation);
    setInterestRateError(interestRateValidation);
    setAmortizationError(amortizationValidation);
    setPropertyTaxError(propertyTaxValidation);
    setHeatingCostError(heatingCostValidation);
    
    return !nameValidation && !incomeValidation && !interestRateValidation && 
           !amortizationValidation && !propertyTaxValidation && !heatingCostValidation;
  };

  const handleCalculate = () => {
    if (validateForm()) {
      onParametersChange(
        clientName,
        Number(income),
        Number(interestRate),
        Number(amortization),
        Number(annualPropertyTax),
        Number(heatingCost)
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-1">
            Client Name
          </label>
          <input
            type="text"
            id="clientName"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className={`amazon-input mt-1 block w-full ${nameError ? 'border-red-300' : ''}`}
          />
          {nameError && (
            <p className="mt-1 text-sm text-red-600">{nameError}</p>
          )}
        </div>

        <div>
          <label htmlFor="income" className="block text-sm font-medium text-gray-700 mb-1">
            Annual Income (CAD)
          </label>
          <input
            type="number"
            id="income"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className={`amazon-input mt-1 block w-full ${incomeError ? 'border-red-300' : ''}`}
          />
          {incomeError && (
            <p className="mt-1 text-sm text-red-600">{incomeError}</p>
          )}
        </div>

        <div>
          <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700 mb-1">
            Interest Rate (%)
          </label>
          <input
            type="number"
            id="interestRate"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            step="0.01"
            className={`amazon-input mt-1 block w-full ${interestRateError ? 'border-red-300' : ''}`}
          />
          {interestRateError && (
            <p className="mt-1 text-sm text-red-600">{interestRateError}</p>
          )}
        </div>

        <div>
          <label htmlFor="amortization" className="block text-sm font-medium text-gray-700 mb-1">
            Amortization Period (Years)
          </label>
          <input
            type="number"
            id="amortization"
            value={amortization}
            onChange={(e) => setAmortization(e.target.value)}
            className={`amazon-input mt-1 block w-full ${amortizationError ? 'border-red-300' : ''}`}
          />
          {amortizationError && (
            <p className="mt-1 text-sm text-red-600">{amortizationError}</p>
          )}
        </div>

        <div>
          <label htmlFor="propertyTax" className="block text-sm font-medium text-gray-700 mb-1">
            Annual Property Tax (CAD)
          </label>
          <input
            type="number"
            id="propertyTax"
            value={annualPropertyTax}
            onChange={(e) => setAnnualPropertyTax(e.target.value)}
            className={`amazon-input mt-1 block w-full ${propertyTaxError ? 'border-red-300' : ''}`}
          />
          {propertyTaxError && (
            <p className="mt-1 text-sm text-red-600">{propertyTaxError}</p>
          )}
        </div>

        <div>
          <label htmlFor="heatingCost" className="block text-sm font-medium text-gray-700 mb-1">
            Monthly Heating Cost (CAD)
          </label>
          <input
            type="number"
            id="heatingCost"
            value={heatingCost}
            onChange={(e) => setHeatingCost(e.target.value)}
            className={`amazon-input mt-1 block w-full ${heatingCostError ? 'border-red-300' : ''}`}
          />
          {heatingCostError && (
            <p className="mt-1 text-sm text-red-600">{heatingCostError}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleCalculate}
          className="amazon-button"
        >
          Calculate
        </button>
      </div>
    </div>
  );
}