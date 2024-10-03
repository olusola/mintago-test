import { describe, expect, it } from 'vitest';
import {
  desiredPensionPot,
  getWorkingYears,
  getYearsOfContribution,
  getYearsOfRetirement,
  pensionPotAfterRetirement,
  projectedPensionPot,
  totalContributionPerYear,
} from './helpers';
import {
  expectedDesiredPot,
  expectedPensionPotAfterRetirement,
  expectedProjectedPensionPot,
} from './mockData';
import test from 'node:test';

describe('projectedPensionPot', () => {
  it('should return correct projected pension pot', () => {
    const result = projectedPensionPot({
      jobStartingAge: 25,
      employerContribution: 20,
      retirementAge: 30,
      personalContribution: 20,
    });

    expect(result).toEqual(expectedProjectedPensionPot);
  });
});

describe('desiredPensionPot', () => {
  it('should return correct annual desired pot ', () => {
    const result = desiredPensionPot(10000, 30);
    expect(result).toEqual(expectedDesiredPot);
  });
});

describe('pensionPotAfterRetirement', () => {
  it('should return correct annual pension pot after retirement', () => {
    const result = pensionPotAfterRetirement({
      retirementAge: 78,
      jobStartingAge: 25,
      employerContribution: 20,
      personalContribution: 20,
    });

    expect(result).toEqual(expectedPensionPotAfterRetirement);
  });
});

test('getYearsOfContribution', () => {
  const result = getYearsOfContribution(30, 25);
  expect(result).toBe(5);
});

test('getWorkingYears', () => {
  const result = getWorkingYears(30, 25);
  expect(result).toBe(5);
});

test('getYearsOfRetirement', () => {
  const result = getYearsOfRetirement(100, 78);
  expect(result).toBe(22);
});

test('totalContributionPerYear', () => {
  const result = totalContributionPerYear(20, 20);
  expect(result).toBe(40);
});
