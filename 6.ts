const raw = await Deno.readTextFile("6.in");
const p = console.log;

const part1 = (raw: string) => {
  let count = 0;
  let group = new Set();
  for (const line of raw.split("\n")) {
    if (line.length === 0) {
      count += group.size;
      group = new Set();
    } else {
      line.split("").forEach((e) => group.add(e));
    }
  }
  return count;
};

const intersect = (a: string[], b: string[]) => {
  return a.filter((e) => b.includes(e));
};

const part2 = (raw: string) => {
  let count = 0;
  const full = "abcdefghijklmnopqrstuvwxyz".split("");
  let group = full.slice();
  for (const line of raw.split("\n")) {
    if (line.length === 0) {
      count += group.length;
      group = full.slice();
    } else {
      group = intersect(group, line.split(""));
    }
  }
  return count;
};

console.time("p");
p(part1(raw));
console.timeLog("p");
p(part2(raw));
console.timeEnd("p");
