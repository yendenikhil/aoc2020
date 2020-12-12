const p = console.log;
const fib = (n: number, cache = new Map()): bigint => {
  if (n <= 2) return 1n;
  if (cache.has(n)) return cache.get(n) ?? -1n;
  p({ n, cache });
  const ans = fib(n - 1, cache) + fib(n - 2, cache);
  cache.set(n, ans);
  return ans;
};
console.time("p");
p(fib(6000));
console.timeEnd("p");
