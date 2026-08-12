/**
 * Models capacity value, not guaranteed cash savings. Break-even is based on
 * the monthly gross value after recurring monthly cost; setup cost is the
 * amount that must be recovered.
 */
export function calculateRoi({ people, hoursPerWeek, hourlyRate, reducibleShare, adoption, monthlyCost, setupCost }) {
  const baselineHours = people * hoursPerWeek * 52;
  const recoverableHours = baselineHours * reducibleShare * adoption;
  const annualGrossValue = recoverableHours * hourlyRate;
  const annualRecurringCost = monthlyCost * 12;
  const yearOneCost = setupCost + annualRecurringCost;
  const yearOneNet = annualGrossValue - yearOneCost;
  const monthlyNetAfterRunCost = annualGrossValue / 12 - monthlyCost;
  const breakEvenMonths = monthlyNetAfterRunCost > 0 ? setupCost / monthlyNetAfterRunCost : null;

  return {
    baselineHours,
    recoverableHours,
    annualGrossValue,
    annualRecurringCost,
    yearOneCost,
    yearOneNet,
    monthlyNetAfterRunCost,
    breakEvenMonths,
  };
}
