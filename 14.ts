const raw = await Deno.readTextFile("14.in");
const p = console.log;

const changeVal = (input: string, mask: string): number => {
  const bin = Number(input).toString(2).padStart(36, "0").split("");
  mask.split("").forEach((v, i) => {
    if (v !== "X") {
      bin[i] = v;
    }
  });
  return parseInt(bin.join(""), 2);
};

const changeAddress = (input: string, mask: string): number[] => {
  const bin = Number(input).toString(2).padStart(36, "0").split("");
  mask.split("").forEach((v, i) => {
    if (v !== "0") {
      bin[i] = v;
    }
  });
  let ans = [["0"]];
  for (const c of bin) {
    if (c !== "X") {
      ans.forEach((e) => e.push(c));
    } else {
      ans = ans.flatMap((e) => {
        const one = e.slice();
        const zero = e.slice();
        one.push("1");
        zero.push("0");
        return [zero, one];
      });
    }
  }
  return ans.map((e) => parseInt(e.join(""), 2));
};

const part1 = (raw: string) => {
  const lines = raw.split("\n");
  const values: Map<number, number> = new Map();
  let mask = "";
  for (const line of lines) {
    const [left, right] = line.split(" = ");
    if (left === "mask") {
      mask = right;
    } else {
      const pos = Number(left.replace("mem[", "").replace("]", ""));
      const updated = changeVal(right, mask);
      values.set(pos, updated);
    }
  }
  let sum = 0;
  for (const k of values.keys()) {
    sum += values.get(k) ?? 0;
  }
  p({ sum });
};

const part2 = (raw: string) => {
  const lines = raw.split("\n");
  const values: Map<number, number> = new Map();
  let mask = "";
  for (const line of lines) {
    const [left, right] = line.split(" = ");
    if (left === "mask") {
      mask = right;
    } else {
      const pos = left.replace("mem[", "").replace("]", "");
      const val = Number(right);
      const updated = changeAddress(pos, mask);
      updated.forEach((e) => values.set(e, val));
    }
  }
  let sum = 0;
  for (const k of values.keys()) {
    sum += values.get(k) ?? 0;
  }
  p({ sum });
};

console.time("p");
part1(raw);
console.timeLog("p");
part2(raw);
console.timeEnd("p");
