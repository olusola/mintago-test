## Getting Started

    - Install all modules: npm i
    - Run App: npm run dev
    - Run test: npm run test

## Libraries

- Framework: Next.js with TypeScript
- Testing: Vitest
- Component Library: Shadcn (Radix base and Tailwind components)
- Charts: Recharts
- Forms and Validation: React Hook Form

## Notes

I spent approximately 7 hours to this project over the course of 3 days, my inital approach was to understand the base requirements and and identify any potential issues.

Initially, I implemented the interest calculation for both projected and desired pensions. However, I realized that my calculations were incorrect as I focused on 'simple interest' instead of 'compound interest'.

This led me to removing the interest implementation from both projected and desired calculations.

I created a logic in the helper file 'projectedPensionWithInterest' to demonstrate how compound interest would be calculated and used within the projected pension calculator.

```
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
```

## Test

Due to the limited time frame, I used TypeScript to ensure type safety for all data points and opted to test only the business logic and pure functions.

## Improvements

- Charts: Using a single chart could enhance the user experience by allowing the comparison of projected, desired and after retirment pension pot.

- Responsiveness: Improve the responsiveness of the charts.

- Features: Add the ability to add multiple or existing pension pots.
- Testing: Implement unit tests for the UI elements.
- Create a function to dynamically generate required form fields.
