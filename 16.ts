const raw = await Deno.readTextFile("16.in");
const p = console.log;
const genrange = (start: string, end: string): number[] => {
  let i = Number(start);
  const ans: number[] = [];
  for (; i <= Number(end); i++) {
    ans.push(i);
  }
  return ans;
};

const checkNotValid = (rules: Set<number>[]) =>
  (token: number): boolean => {
    return !rules.some((r) => r.has(token));
  };

const part1 = (raw: string) => {
  const lines = raw.split("\n");
  const rules = [];
  // load the rule sets for number ranges
  for (const line of lines) {
    if (line.length === 0) break;
    const [left, right] = line.split(": ");
    const [first, second] = right.split(" or ");
    const entry: Set<number> = new Set();
    const f = first.split("-");
    const s = second.split("-");
    genrange(f[0], f[1]).forEach((n) => entry.add(n));
    genrange(s[0], s[1]).forEach((n) => entry.add(n));
    rules.push(entry);
  }
  // add up invalid numbers
  const c = checkNotValid(rules);
  let finalans = 0;
  for (let i = rules.length + 5; i < lines.length; i++) {
    const wrong = lines[i].split(",").map(Number).filter(c);
    // p({wrong})
    finalans += wrong.reduce((a, b) => a + b, 0);
  }
  p({ finalans });
};

const part2 = (raw: string) => {
  const lines = raw.split("\n");
  const rules: Map<string, Set<number>> = new Map();
  // load the rule sets for number ranges and name
  for (const line of lines) {
    if (line.length === 0) break;
    const [left, right] = line.split(": ");
    const [first, second] = right.split(" or ");
    const entry: Set<number> = new Set();
    const f = first.split("-");
    const s = second.split("-");
    genrange(f[0], f[1]).forEach((n) => entry.add(n));
    genrange(s[0], s[1]).forEach((n) => entry.add(n));
    rules.set(left, entry);
  }
  // filter in ONLY valid rows
  const ruleRange: Set<number>[] = [];
  rules.forEach((v) => ruleRange.push(v));
  const c = checkNotValid(ruleRange);
  const validrows = [];
  for (let i = ruleRange.length + 5; i < lines.length; i++) {
    const tokens = lines[i].split(",").map(Number);
    const wrong = tokens.filter(c);
    if (wrong.length === 0) validrows.push(tokens);
  }
  // first pass - see which all fields are valid on valid rows
  // for each field there might be more than one valid index per row
  const poss: Map<string, number[]> = new Map();
  const cl = validrows[0].length;
  for (const key of rules.keys()) {
    const rule = rules.get(key);
    if (!rule) break;
    const chance: number[] = [];
    validrows.forEach((row) => {
      row.forEach((token, i) => {
        if (chance[i] === undefined || chance[i] === 1) {
          if (rule.has(token)) chance[i] = 1;
          else chance[i] = 0;
        }
      });
    });
    poss.set(key, chance);
  }
  // now use process of elimination, check which field have
  // only one valid index, that we know is the field index with certainty
  // now look for field which have 2 valid index, out of which one
  // index is already taken in previour pass, so we know the other
  // index is for field 2 with certainty and so on.
  let con = 1;
  const ans: Map<number, string> = new Map();
  while (con <= cl) {
    poss.forEach((v, k) => {
      if (v.filter((e) => e === 1).length === con) {
        v.forEach((e, i) => {
          if (e === 1 && !ans.has(i)) {
            ans.set(i, k);
          }
        });
        con++;
      }
    });
  }
  // simple answer calculation
  let mult = 1;
  const mine = lines[ruleRange.length + 2].split(",").map(Number);
  ans.forEach((v, k) => {
    if (v.includes("departure")) {
      mult *= mine[k];
    }
  });
  p({ mult });
};

console.time("p");
part1(raw);
console.timeLog("p");
part2(raw);
console.timeEnd("p");
