export function validateClientName(value: string): string | null {
  if (value.length > 100) return "Client name cannot exceed 100 characters";
  return null;
}

export function validateIncome(value: string): string | null {
  const income = Number(value);
  if (isNaN(income)) return "Income must be a number";
  if (income < 0) return "Income cannot be negative";
  if (income > 1000000) return "Income cannot exceed $1,000,000";
  return null;
}

export function validateInterestRate(value: string): string | null {
  const rate = Number(value);
  if (isNaN(rate)) return "Interest rate must be a number";
  if (rate < 0) return "Interest rate cannot be negative";
  if (rate > 25) return "Interest rate cannot exceed 25%";
  return null;
}

export function validateAmortization(value: string): string | null {
  const years = Number(value);
  if (isNaN(years)) return "Amortization must be a number";
  if (years < 5) return "Amortization must be at least 5 years";
  if (years > 30) return "Amortization cannot exceed 30 years";
  return null;
}

export function validateAnnualPropertyTax(value: string): string | null {
  const tax = Number(value);
  if (isNaN(tax)) return "Annual property tax must be a number";
  if (tax < 0) return "Annual property tax cannot be negative";
  if (tax > 50000) return "Annual property tax cannot exceed $50,000";
  return null;
}

export function validateHeatingCost(value: string): string | null {
  const cost = Number(value);
  if (isNaN(cost)) return "Heating cost must be a number";
  if (cost < 0) return "Heating cost cannot be negative";
  if (cost > 1000) return "Monthly heating cost cannot exceed $1,000";
  return null;
}