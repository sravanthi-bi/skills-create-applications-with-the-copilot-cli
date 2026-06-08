#!/usr/bin/env node

/**
 * Node.js CLI Calculator
 * Supported operations:
 *  - addition
 *  - subtraction
 *  - multiplication
 *  - division
 *
 * Usage examples:
 *   node src/calculator.js add 2 3
 *   node src/calculator.js subtract 5 2
 *   node src/calculator.js multiply 4 3
 *   node src/calculator.js divide 10 2
 *
 * Also supports symbols for operations: +, -, *, /
 * If no command-line args are provided the app runs in interactive mode.
 */

const readline = require('readline');

function toNumber(value) {
  const n = Number(value);
  if (Number.isNaN(n)) {
    throw new Error(`Invalid number: ${value}`);
  }
  return n;
}

function calculate(op, a, b) {
  switch (op) {
    case 'add':
    case '+':
      return a + b;
    case 'subtract':
    case 'sub':
    case '-':
      return a - b;
    case 'multiply':
    case 'mul':
    case '*':
      return a * b;
    case 'divide':
    case 'div':
    case '/':
      if (b === 0) throw new Error('Division by zero');
      return a / b;
    default:
      throw new Error(`Unsupported operation: ${op}`);
  }
}

function printUsage() {
  console.log('Usage: node src/calculator.js <operation> <num1> <num2>');
  console.log('Operations: add(+), subtract(-), multiply(*), divide(/)');
  console.log('Example: node src/calculator.js add 2 3');
}

async function interactive() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const question = (q) => new Promise((res) => rl.question(q, res));

  try {
    const op = (await question('Operation (add, subtract, multiply, divide or + - * /): ')).trim();
    const aRaw = (await question('First number: ')).trim();
    const bRaw = (await question('Second number: ')).trim();
    const a = toNumber(aRaw);
    const b = toNumber(bRaw);
    const result = calculate(op, a, b);
    console.log(`Result: ${result}`);
  } catch (err) {
    console.error('Error:', err.message);
    printUsage();
    process.exitCode = 2;
  } finally {
    rl.close();
  }
}

async function main() {
  const [, , op, arg1, arg2] = process.argv;

  if (!op) {
    await interactive();
    return;
  }

  if (!arg1 || !arg2) {
    console.error('Error: Two numeric arguments are required.');
    printUsage();
    process.exitCode = 1;
    return;
  }

  try {
    const a = toNumber(arg1);
    const b = toNumber(arg2);
    const result = calculate(op, a, b);
    console.log(result);
  } catch (err) {
    console.error('Error:', err.message);
    process.exitCode = 2;
  }
}

module.exports = { calculate, toNumber, main };

if (require.main === module) {
  main();
}
