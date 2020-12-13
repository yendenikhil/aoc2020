const raw = await Deno.readTextFile("13.in");
const p = console.log;

const part1 = (raw: string) => {
  const time = Number(raw.split("\n")[0]);
  const ids = raw.split("\n")[1].split(",").filter((x) => x !== "x").map(
    Number,
  );
  let minid = 0;
  let min = time;
  for (const id of ids) {
    const rem = id - (time % id);
    if (rem < min) {
      minid = id;
      min = rem;
    }
  }
  p(min * minid);
};

const invmod = (u: bigint, v: bigint): bigint => {
  let u1 = 1n, u3 = u, v1 = 0n, v3 = v, iter = 1n;
  while (v3 !== 0n) {
    const q = u3 / v3;
    const t3 = u3 % v3;
    const t1 = u1 + q * v1;
    u1 = v1;
    v1 = t1;
    u3 = v3;
    v3 = t3;
    iter = -1n * iter;
  }
  if (u3 != 1n) {
    p(`no inverse exists`);
    return 0n;
  }
  if (iter < 0n) {
    return v - u1;
  } else {
    return u1;
  }
};

interface Bus {
  mod: bigint;
  rem: bigint;
}

const part2 = (raw: string) => {
  const ids: Bus[] = [];
  raw.split("\n")[1].split(",").forEach((bus, i) => {
    if (bus !== "x") {
      ids.push({
        mod: BigInt(bus),
        rem: (BigInt(bus) - BigInt(i)) % BigInt(bus),
      });
    }
  });
  const N = ids.map((e) => e.mod).reduce((a, b) => a * b, 1n);
  let res = 0n;
  for (const bus of ids) {
    const ai = bus.rem;
    const ni = bus.mod;
    const bi = N / ni;
    res += ai * bi * invmod(bi, ni);
  }
  p((res % N).toString());
};

console.time("p");
part1(raw);
console.timeLog("p");
part2(raw);
console.timeEnd("p");
