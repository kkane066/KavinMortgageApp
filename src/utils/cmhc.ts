// CMHC Insurance Premium Rates (as of 2023)
export function calculateCMHCPremium(purchasePrice: number, downPaymentPercent: number): number {
  if (downPaymentPercent >= 20) return 0;
  
  const premiumRate = 
    downPaymentPercent >= 15 ? 0.028 :
    downPaymentPercent >= 10 ? 0.031 :
    downPaymentPercent >= 5 ? 0.04 : 0;
    
  const mortgageAmount = purchasePrice * (1 - downPaymentPercent / 100);
  return mortgageAmount * premiumRate;
}