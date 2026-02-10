export function getFibonacci(n) {
  if (!Number.isInteger(n) || n < 0) return [];
  if (n === 0) return [];
  n = Math.min(n, 100);
  const series = [0];
  if (n === 1) return series;
  series.push(1);
  for (let i = 2; i < n; i++) {
    const next = BigInt(series[i-1]) + BigInt(series[i-2]);
    series.push(Number(next));
  }
  return series;
}

export function filterPrimes(numbers) {
  if (!Array.isArray(numbers)) return [];
  return numbers.filter(num => {
    if (!Number.isInteger(num) || num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    let i = 5;
    while (i * i <= num) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
      i += 6;
    }
    return true;
  });
}

export function calculateLCM(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0 || !numbers.every(Number.isInteger)) return 0;
  numbers = numbers.map(Math.abs);
  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
  const lcm = (a, b) => (a * b) / gcd(a, b);
  let result = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    result = lcm(result, numbers[i]);
  }
  return result;
}

export function calculateHCF(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0 || !numbers.every(Number.isInteger)) return 0;
  numbers = numbers.map(Math.abs);
  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
  let result = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    result = gcd(result, numbers[i]);
    if (result === 1) return 1;
  }
  return result;
}