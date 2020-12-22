const raw = await Deno.readTextFile("21.in");
const p = console.log;

const allIng: Map<string, number> = new Map();
const allAlg: Map<string, Set<string>> = new Map();

const intersect = (a: Set<string>, b: Set<string>) => {
  return new Set([...a].filter((e) => b.has(e)));
};

for (const line of raw.split("\n")) {
  const [ing, alg] = line.replace(")", "").split(" (contains ");
  p({ ing, alg });
  const ii = new Set(ing.split(" "));
  for (const i of ii) {
    const num = allIng.get(i) ?? 0;
    allIng.set(i, num + 1);
  }
  alg.split(", ").forEach((a) => {
    if (allAlg.has(a)) {
      const foundA = allAlg.get(a) ?? new Set();
      allAlg.set(a, intersect(foundA, ii));
    } else {
      allAlg.set(a, ii);
    }
  });
}

while (true) {
  let more = true;
  for (const key of allAlg.keys()) {
    const check = allAlg.get(key);
    if (!check) break;
    if (check.size === 1) {
      const val = [...check][0];
      for (const k of allAlg.keys()) {
        if (k !== key) {
          const alg = allAlg.get(k) ?? new Set();
          alg.delete(val);
        }
      }
    }
  }
  allAlg.forEach((v, k) => {
    if (v.size > 1) more = false;
  });
  if (more) break;
}

allAlg.forEach((v) => {
  [...v].forEach((e) => allIng.delete(e));
});

let ans = 0;
allIng.forEach((v) => ans += v);
p({ ans });

let list = "";
const sortedKey = [...allAlg.keys()].sort();
for (const key of sortedKey) {
  const s = allAlg.get(key) ?? new Set();
  const val = [...s][0];
  list += val + ",";
}
p(list);
