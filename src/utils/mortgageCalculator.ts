import {
  MONTHS_PER_YEAR,
  GDS_RATIO
} from './constants';
import { PurchaseScenario } from './types';
import { calculateCMHCPremium } from './cmhc';

export function calculateMonthlyMortgagePayment(
  principal: number,
  annualRate: number,
  amortizationYears: number
): number {
  const monthlyRate = annualRate / 100 / MONTHS_PER_YEAR;
  const numberOfPayments = amortizationYears * MONTHS_PER_YEAR;
  
  if (monthlyRate === 0) return principal / numberOfPayments;
  
  const monthlyPayment =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
  return monthlyPayment;
}

export function calculateMonthlyPropertyTax(annualPropertyTax: number): number {
  return annualPropertyTax / MONTHS_PER_YEAR;
}

function calculateMaxMortgageFromPayment(
  maxMonthlyPayment: number,
  annualRate: number,
  amortizationYears: number
): number {
  const monthlyRate = annualRate / 100 / MONTHS_PER_YEAR;
  const numberOfPayments = amortizationYears * MONTHS_PER_YEAR;
  
  if (monthlyRate === 0) {
    return maxMonthlyPayment * numberOfPayments;
  }
  
  return maxMonthlyPayment * 
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1) / 
    (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments));
}

function findMaxPriceFromMonthlyPayment(
  maxMonthlyPayment: number,
  qualifyingRate: number,
  downPaymentPercent: number,
  amortizationYears: number,
  annualPropertyTax: number,
  monthlyHeatingCost: number
): {
  maxPrice: number;
  mortgageAmount: number;
  monthlyPayment: number;
  actualGDS: number;
} {
  let low = 0;
  let high = maxMonthlyPayment * MONTHS_PER_YEAR * amortizationYears * 2;
  let result = {
    maxPrice: 0,
    mortgageAmount: 0,
    monthlyPayment: 0,
    actualGDS: 0
  };

  while (Math.abs(high - low) > 1) {
    const mid = Math.floor((low + high) / 2);
    const propertyTax = calculateMonthlyPropertyTax(annualPropertyTax);
    const heatingCost = monthlyHeatingCost;
    
    const availableMortgagePayment = maxMonthlyPayment - propertyTax - heatingCost;
    
    if (availableMortgagePayment <= 0) {
      high = mid - 1;
      continue;
    }

    const maxMortgage = calculateMaxMortgageFromPayment(
      availableMortgagePayment,
      qualifyingRate,
      amortizationYears
    );

    const downPayment = mid * (downPaymentPercent / 100);
    const cmhcPremium = calculateCMHCPremium(mid, downPaymentPercent);
    const requiredMortgage = mid - downPayment + cmhcPremium;

    if (Math.abs(maxMortgage - requiredMortgage) < 1) {
      result = {
        maxPrice: mid,
        mortgageAmount: requiredMortgage,
        monthlyPayment: availableMortgagePayment + propertyTax + heatingCost,
        actualGDS: (availableMortgagePayment + propertyTax + heatingCost) / (maxMonthlyPayment / GDS_RATIO)
      };
      break;
    } else if (maxMortgage > requiredMortgage) {
      result = {
        maxPrice: mid,
        mortgageAmount: requiredMortgage,
        monthlyPayment: availableMortgagePayment + propertyTax + heatingCost,
        actualGDS: (availableMortgagePayment + propertyTax + heatingCost) / (maxMonthlyPayment / GDS_RATIO)
      };
      low = mid;
    } else {
      high = mid;
    }
  }

  return result;
}

export function calculateMaxPurchasePrice(
  annualIncome: number,
  qualifyingRate: number,
  downPaymentPercent: number,
  amortizationYears: number,
  annualPropertyTax: number,
  monthlyHeatingCost: number
): PurchaseScenario {
  const monthlyIncome = annualIncome / MONTHS_PER_YEAR;
  const maxMonthlyPayment = monthlyIncome * GDS_RATIO;
  
  const { maxPrice, mortgageAmount, monthlyPayment, actualGDS } = findMaxPriceFromMonthlyPayment(
    maxMonthlyPayment,
    qualifyingRate,
    downPaymentPercent,
    amortizationYears,
    annualPropertyTax,
    monthlyHeatingCost
  );
  
  const downPaymentAmount = maxPrice * (downPaymentPercent / 100);
  const cmhcPremium = calculateCMHCPremium(maxPrice, downPaymentPercent);
  
  return {
    downPaymentPercent,
    maxPrice,
    downPaymentAmount,
    mortgageAmount,
    monthlyPayment,
    gdsRatio: actualGDS,
    tdsRatio: actualGDS,
    cmhcPremium,
    monthlyPropertyTax: calculateMonthlyPropertyTax(annualPropertyTax),
    monthlyHeatingCost
  };
}