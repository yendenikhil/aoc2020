// const raw = '523764819'
let raw = "523764819".split("").map(Number);
const p = console.log;

const mod = raw.length;
const max = 10;
const numOfRounds = 100;
let idx = 0;
const rem = [4, 5, 6, 7, 8];
const pick = [1, 2, 3];

for (let i = 0; i < numOfRounds; i++) {
  // p(`==== move ${i + 1} ======`);
  const curr = raw[idx % mod];
  const newarr: number[] = [];
  const test: Set<number> = new Set();
  rem.forEach((num) => newarr.push(raw[(idx + num) % mod]));
  rem.forEach((num) => test.add(raw[(idx + num) % mod]));
  newarr.push(curr);
  let below = curr + max - 1;
  while (below > curr) {
    if (test.has(below % max)) {
//      p({ below: below % max });
  //    p({ newarr });
      const insertIndex = newarr.indexOf(below % max);
      pick.forEach((num) =>
        newarr.splice(
          (insertIndex + num) % mod,
          0,
          raw[
            (idx +
              num) %
            mod
          ],
        )
      );
      break;
    }
    below--;
  }
 // p({ raw, newarr });
  raw = newarr;
}

let ans = [];
idx = raw.indexOf(1) + 1;
for (let i = 0; i < 8; i++) {
  ans.push(raw[(idx + i) % mod]);
}

p(ans.join(""));
