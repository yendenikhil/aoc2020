const raw = await Deno.readTextFile(Deno.args[0] ?? "7.in");
const p = console.log;

const createList = async (raw: string) => {
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
  return map;
};

const part1 = async (raw: string) => {
  const map = await createList(raw);
  const queue = ["shiny gold"];
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

p(await part1(raw));
