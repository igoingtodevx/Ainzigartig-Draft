import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateRoi } from '../lib/roi.js';

test('break-even recovers setup cost from monthly value after run cost', () => {
  const result = calculateRoi({
    people: 5,
    hoursPerWeek: 6,
    hourlyRate: 55,
    reducibleShare: 0.3,
    adoption: 0.7,
    monthlyCost: 800,
    setupCost: 6_000,
  });

  assert.equal(result.baselineHours, 1_560);
  assert.ok(Math.abs(result.recoverableHours - 327.6) < 0.001);
  assert.ok(Math.abs(result.annualGrossValue - 18_018) < 0.001);
  assert.ok(Math.abs(result.breakEvenMonths - 8.552) < 0.01);
});

test('there is no break-even when monthly run cost consumes the gross value', () => {
  const result = calculateRoi({
    people: 1,
    hoursPerWeek: 1,
    hourlyRate: 20,
    reducibleShare: 0.1,
    adoption: 0.5,
    monthlyCost: 100,
    setupCost: 1_000,
  });

  assert.equal(result.breakEvenMonths, null);
  assert.ok(result.yearOneNet < 0);
});

test('zero setup cost breaks even immediately only with a positive monthly contribution', () => {
  const result = calculateRoi({
    people: 2,
    hoursPerWeek: 4,
    hourlyRate: 50,
    reducibleShare: 0.5,
    adoption: 0.5,
    monthlyCost: 10,
    setupCost: 0,
  });

  assert.equal(result.breakEvenMonths, 0);
});
