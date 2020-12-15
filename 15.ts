const raw = await Deno.readTextFile("15.in");
const p = console.log;

const solve = (raw: string, iter: number) => {
  const turns: Map<number, number[]> = new Map();
  let curr = 0;
  let idx = 0;
  raw.split(",").map(Number).forEach((num, i) => {
    curr = num;
    idx = i;
    if (turns.has(num)) {
      const arr = turns.get(num);
      arr?.push(i);
    } else {
      const arr = [i];
      turns.set(num, arr);
    }
  });
  while (idx < iter - 1) {
    idx++;
    const arr = turns.get(curr);
    if (arr) {
      const len = arr.length;
      if (arr[len - 1] === idx - 1) {
        if (len > 1) {
          curr = idx - 1 - arr[len - 2];
        } else {
          curr = 0;
        }
      } else {
        curr = idx - arr[len - 1];
      }
    } else {
      curr = 0;
    }
    const update = turns.get(curr);
    if (update) {
      update.push(idx);
    } else {
      const newarr = [idx];
      turns.set(curr, newarr);
    }
  }
  p({ curr, idx });
};
console.time("p");
solve(raw, 2020);
console.timeLog("p");
solve(raw, 30000000);
console.timeEnd("p");
