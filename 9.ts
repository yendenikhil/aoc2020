const raw = await Deno.readTextFile("9.in");
const p = console.log;

const part1 = (raw: string) => {
  const lines = raw.split("\n").map(BigInt);
  const queue: bigint[] = [...lines.splice(0, 25)];
  for (const num of lines) {
    let match = false;
    for (let i = 0; i < queue.length - 1; i++) {
      for (let j = i + 1; j < queue.length; j++) {
        if (queue[i] + queue[j] === num) match = true;
      }
    }
    if (!match) return num;
    queue.shift();
    queue.push(num);
  }
  return -1n;
};
const minmax = (list: bigint[]) => {
  let max = list[0];
  let min = list[0];
  for (const num of list) {
    if (min > num) min = num;
    if (max < num) max = num;
  }
  return min + max;
};
const part2 = (to: bigint, raw: string) => {
  const lines = raw.split("\n").map(BigInt);
  for (let i = 0; i < lines.length - 1; i++) {
    let sum = lines[i];
    for (let j = i + 1; j < lines.length; j++) {
      sum += lines[j];
      if (sum === to) {
        return minmax(lines.slice(i, j));
      } else if (sum > to) break;
    }
  }
};

console.time("p");
const p1 = part1(raw);
p(p1);
console.timeLog("p");
p(part2(p1, raw));
console.timeEnd("p");
