import React, { useState, useCallback } from 'react';
import { calculateMaxPurchasePrice } from './utils/mortgageCalculator';
import { MIN_QUALIFYING_RATE, DOWN_PAYMENT_OPTIONS, STRESS_TEST_BUFFER } from './utils/constants';
import { InputForm } from './components/InputForm';
import { InputParameters } from './components/InputParameters';
import { MaximumAmounts } from './components/MaximumAmounts';
import { PurchaseScenarioChart } from './components/PurchaseScenarioChart';
import { ScenarioTable } from './components/ScenarioTable';
import { Assumptions } from './components/Assumptions';
import { PrintButton } from './components/PrintButton';
import { PurchaseScenario } from './utils/types';

export default function App() {
  const [clientName, setClientName] = useState('');
  const [annualIncome, setAnnualIncome] = useState(115000);
  const [interestRate, setInterestRate] = useState(5.0);
  const [amortizationYears, setAmortizationYears] = useState(30);
  const [annualPropertyTax, setAnnualPropertyTax] = useState(3600);
  const [monthlyHeatingCost, setMonthlyHeatingCost] = useState(150);
  
  const effectiveQualifyingRate = Math.max(MIN_QUALIFYING_RATE, interestRate + STRESS_TEST_BUFFER);
  
  const scenarios: PurchaseScenario[] = DOWN_PAYMENT_OPTIONS.map(downPaymentPercent => 
    calculateMaxPurchasePrice(
      annualIncome, 
      effectiveQualifyingRate, 
      downPaymentPercent, 
      amortizationYears,
      annualPropertyTax,
      monthlyHeatingCost
    )
  );
  
  const defaultScenario = scenarios.find(s => s.downPaymentPercent === 20) || scenarios[0];
  
  const handleParametersChange = useCallback((
    name: string,
    income: number,
    rate: number,
    amortization: number,
    propertyTax: number,
    heatingCost: number
  ) => {
    setClientName(name);
    setAnnualIncome(income);
    setInterestRate(rate);
    setAmortizationYears(amortization);
    setAnnualPropertyTax(propertyTax);
    setMonthlyHeatingCost(heatingCost);
  }, []);

  return (
    <div className="min-h-screen bg-amazon-light print:bg-white">
      <header className="bg-amazon-blue text-white py-4">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-2xl font-bold">Kavin Kan Mortgages Maximum Affordability Calculator</h1>
          {clientName && (
            <p className="text-amazon-yellow mt-1">Client: {clientName}</p>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-amazon-blue">Calculate Maximum Affordability</h2>
            <PrintButton />
          </div>
          
          <div className="space-y-8">
            <InputForm 
              onParametersChange={handleParametersChange}
              initialName={clientName}
              initialIncome={annualIncome}
              initialInterestRate={interestRate}
              initialAmortization={amortizationYears}
              initialAnnualPropertyTax={annualPropertyTax}
              initialHeatingCost={monthlyHeatingCost}
            />
            
            <InputParameters 
              clientName={clientName}
              annualIncome={annualIncome}
              interestRate={interestRate}
              effectiveQualifyingRate={effectiveQualifyingRate}
              amortizationYears={amortizationYears}
              annualPropertyTax={annualPropertyTax}
              monthlyHeatingCost={monthlyHeatingCost}
            />
            
            <div className="print:break-inside-avoid">
              <MaximumAmounts scenario={defaultScenario} />
            </div>
            
            <div className="print:break-inside-avoid">
              <PurchaseScenarioChart scenarios={scenarios} />
            </div>
            
            <div className="print:break-inside-avoid">
              <ScenarioTable scenarios={scenarios} />
            </div>
            
            <div className="print:break-inside-avoid border-t pt-6">
              <Assumptions 
                amortizationYears={amortizationYears}
                annualPropertyTax={annualPropertyTax}
                monthlyHeatingCost={monthlyHeatingCost}
                interestRate={interestRate}
                effectiveQualifyingRate={effectiveQualifyingRate}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}