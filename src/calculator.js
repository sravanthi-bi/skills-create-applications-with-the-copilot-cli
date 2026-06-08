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

function modulo(a, b) {
  if (b === 0) throw new Error('Division by zero');
  return a % b;
}

function power(base, exponent) {
  return Math.pow(base, exponent);
}

function squareRoot(n) {
  if (n < 0) throw new Error('Square root of negative number');
  return Math.sqrt(n);
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
    case 'mod':
    case '%':
      if (b === 0) throw new Error('Division by zero');
      return modulo(a, b);
    case 'pow':
    case '^':
      return power(a, b);
    case 'sqrt':
    case '√':
      return squareRoot(a);
    default:
      throw new Error(`Unsupported operation: ${op}`);
  }
}

function printUsage() {
  console.log('Usage: node src/calculator.js <operation> <num1> <num2>');
  console.log('Operations: add(+), subtract(-), multiply(*), divide(/), mod(%), pow(^), sqrt');
  console.log('Examples:');
  console.log('  node src/calculator.js add 2 3');
  console.log('  node src/calculator.js mod 10 3');
  console.log('  node src/calculator.js pow 2 5');
  console.log('  node src/calculator.js sqrt 9');
}

async function interactive() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const question = (q) => new Promise((res) => rl.question(q, res));

  try {
    const op = (await question('Operation (add, subtract, multiply, divide, mod, pow, sqrt or + - * / % ^ √): ')).trim();
    const aRaw = (await question('First number: ')).trim();
    const a = toNumber(aRaw);
    let result;

    if (op === 'sqrt' || op === '√') {
      result = squareRoot(a);
    } else {
      const bRaw = (await question('Second number: ')).trim();
      const b = toNumber(bRaw);
      result = calculate(op, a, b);
    }

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

  if (!arg1 || (!arg2 && op !== 'sqrt' && op !== '√')) {
    console.error('Error: Two numeric arguments are required (except for sqrt).');
    printUsage();
    process.exitCode = 1;
    return;
  }

  try {
    const a = toNumber(arg1);
    let result;

    if (op === 'sqrt' || op === '√') {
      result = calculate(op, a);
    } else {
      const b = toNumber(arg2);
      result = calculate(op, a, b);
    }

    console.log(result);
  } catch (err) {
    console.error('Error:', err.message);
    process.exitCode = 2;
  }
}


module.exports = { calculate, toNumber, main, modulo, power, squareRoot };

if (require.main === module) {
  main();
}
