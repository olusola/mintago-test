import { PensionPotTypes } from './types';

const maxAge: number = 81;

export const jobStartingAge: number = 25;

export const totalContributionPerYear = (
  employerContribution: number,
  personalContribution: number
) => (employerContribution + personalContribution) * 12;

export const getWorkingYears = (
  retirementAge: number,
  jobStartingAge: number
) => retirementAge - jobStartingAge;

export const getYearsOfRetirement = (maxAge: number, retirementAge: number) =>
  maxAge - retirementAge;

const formatCurrencyValue = (value: number) => Math.ceil(value * 100) / 100;

export const getYearsOfContribution = (
  retirementAge: number,
  jobStartingAge: number
) => retirementAge - jobStartingAge;

export const projectedPensionPot = ({
  jobStartingAge,
  retirementAge,
  personalContribution,
  employerContribution,
}: PensionPotTypes) => {
  const workingYears = getWorkingYears(retirementAge, jobStartingAge);

  return Array.from({ length: workingYears }, (_, i) => {
    const age = i + jobStartingAge;
    const totalContribution =
      totalContributionPerYear(employerContribution, personalContribution) *
      (i + 1);

    const totalContributionWithInterest = totalContribution;

    return {
      age,
      totalContributionWithInterest: formatCurrencyValue(
        totalContributionWithInterest
      ),
    };
  });
};

export const pensionPotAfterRetirement = ({
  retirementAge,
  jobStartingAge,
  employerContribution,
  personalContribution,
}: PensionPotTypes) => {
  const yearsOfRetirement = getYearsOfRetirement(maxAge, retirementAge);

  const yearsOfContribution = getYearsOfContribution(
    retirementAge,
    jobStartingAge
  );

  const fullPot =
    totalContributionPerYear(employerContribution, personalContribution) *
    yearsOfContribution;

  const usage = fullPot / yearsOfRetirement;

  return Array.from({ length: yearsOfRetirement }, (_, i) => {
    const age = i + retirementAge;
    const pot = fullPot - usage * i;

    return {
      age,
      pot: formatCurrencyValue(pot),
    };
  });
};

export const desiredPensionPot = (
  desiredIncomePerYear: number,
  retirementAge: number
) => {
  const totalRetirementIncome = (maxAge - retirementAge) * desiredIncomePerYear;

  const workingYears = getWorkingYears(retirementAge, jobStartingAge);

  const requiredAnnualContribution = totalRetirementIncome / workingYears;

  return Array.from({ length: workingYears }, (_, i) => {
    const age = i + jobStartingAge;
    const contributionToMake = (i + 1) * requiredAnnualContribution;
    return {
      age,
      contributionToMake: formatCurrencyValue(contributionToMake),
    };
  });
};

export const projectedPensionWithInterest = ({
  retirementAge,
  personalContribution,
  employerContribution,
}: PensionPotTypes) => {
  const workingYears = getWorkingYears(retirementAge, jobStartingAge);

  const totalContribution = totalContributionPerYear(
    employerContribution,
    personalContribution
  );

  const annualInterestRate: number = 1.049;
  const projectedPot: number[] = [];

  for (let i = 0; i < workingYears; i++) {
    if (i === 0) {
      projectedPot[i] = totalContribution * annualInterestRate;
    } else {
      projectedPot[i] =
        (projectedPot[i - 1] + totalContribution) * annualInterestRate;
    }
  }

  return projectedPot;
};
