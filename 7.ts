const raw = await Deno.readTextFile(Deno.args[0] ?? "7.in");
const p = console.log;

const part1 = (raw: string) => {
  // map for each bag which combinations it will be in
  const map: Map<string, string[]> = new Map();
  raw.split("\n").filter((line) => line.length > 0)
    .map((line) => {
      const [left, right] = line.split(" contain ");
      const val = [];
      // make sure that there are bags inside, else do not add the entry
      if (right.search(/no other/) === -1) {
        const val = left.replace(" bags", "");

        right.replace(".", "")
          .replaceAll(/ bags?/g, "")
          .replaceAll(/\d+ /g, "")
          .split(", ")
          .forEach((e) => {
            const entries = map.get(e) ?? [];
            entries.push(val);
            map.set(e, entries);
          });
      }
    });
  // recurrsively iterate over the bags to know all possible combinations
  const queue = ["shiny gold"];
  // we have to make sure that we take each bag exactly one time and no more
  const uniq = new Set();
  while (queue.length > 0) {
    const curr = queue.pop();
    if (!curr) continue;
    const entries = map.get(curr);
    //  p({curr, entries})
    if (!entries) continue;
    entries.forEach((e) => uniq.add(e));
    queue.push(...entries);
  }
  return uniq.size;
};

interface Bag {
  name: string;
  count: number;
}
const part2 = (raw: string) => {
  const map: Map<string, Bag[]> = new Map();
  raw.split("\n").filter((line) => line.length > 0)
    .map((line) => {
      const [left, right] = line.split(" contain ");
      const val = [];
      // make sure that there are bags inside, else do not add the entry
      if (right.search(/no other/) === -1) {
        const val = left.replace(" bags", "");
        const entries = right.split(", ").map((e) => {
          const arr = e.match(/(\d+) (.*) bag/);
          if (arr && arr.length > 2) {
            return { name: arr[2], count: Number(arr[1]) } as Bag;
          }
          return { name: "", count: -2 } as Bag;
        });
        map.set(val, entries);
      }
    });
  const queue = ["shiny gold"];
  let count = 0;
  while (queue.length > 0) {
    const curr = queue.pop();
    if (!curr) break;
    const entries = map.get(curr);
    if (!entries) continue;
    count += entries.map((e) => e.count).reduce((a, b) => a + b, 0);
    queue.push(...entries.flatMap((e) => {
      const ans = [];
      for (let i = 0; i < e.count; i++) {
        ans.push(e.name);
      }
      return ans;
    }));
  }
  return count;
};
console.time("p");
p(part1(raw));
console.timeLog("p");
p(part2(raw));
console.timeEnd("p");
