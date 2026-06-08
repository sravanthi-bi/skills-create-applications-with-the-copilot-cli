const { calculate, toNumber } = require('../calculator');

describe('Calculator core functions', () => {
  test('addition: 2 + 3 = 5', () => {
    expect(calculate('add', 2, 3)).toBe(5);
    expect(calculate('+', 2, 3)).toBe(5);
  });

  test('subtraction: 10 - 4 = 6', () => {
    expect(calculate('subtract', 10, 4)).toBe(6);
    expect(calculate('-', 10, 4)).toBe(6);
  });

  test('multiplication: 45 * 2 = 90', () => {
    expect(calculate('multiply', 45, 2)).toBe(90);
    expect(calculate('*', 45, 2)).toBe(90);
  });

  test('division: 20 / 5 = 4', () => {
    expect(calculate('divide', 20, 5)).toBe(4);
    expect(calculate('/', 20, 5)).toBe(4);
  });

  test('division by zero throws', () => {
    expect(() => calculate('divide', 1, 0)).toThrow('Division by zero');
    expect(() => calculate('/', 1, 0)).toThrow('Division by zero');
  });

  test('invalid operation throws', () => {
    expect(() => calculate('unknown', 2, 3)).toThrow('Unsupported operation');
  });

  test('toNumber validates numeric input', () => {
    expect(toNumber('3')).toBe(3);
    expect(() => toNumber('abc')).toThrow('Invalid number');
  });
});
