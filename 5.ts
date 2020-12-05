const raw = await Deno.readTextFile("5.in");
const p = console.log;

const getIds = (raw: string) => {
  return raw.split("\n").map((e) =>
    e.replaceAll(/[FL]/g, "0").replaceAll(/[BR]/g, "1")
  ).map((e) => parseInt(e, 2));
};
const part1 = (raw: string) => {
  return getIds(raw).reduce((a, b) => a < b ? b : a, 0);
};

const part2 = (raw: string) => {
  const ids = getIds(raw).sort();
  for (let i = 1; i < ids.length; i++) {
    if (ids[i] - ids[i - 1] > 1) {
      return ids[i] - 1;
    }
  }
  return -1;
};

console.time("p");
p(part1(raw));
console.timeLog("p");
p(part2(raw));
console.timeEnd("p");
