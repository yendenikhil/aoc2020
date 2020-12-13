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

const EE = (x: bigint, y: bigint): [bigint, bigint, bigint] => {
  let x0 = 1n, x1 = 0n, y0 = 0n, y1 = 1n, q = 0n;
  while (y > 0) {
    q = x / y;
    const t1 = y;
    y = x % y;
    x = t1;

    const t2 = x1;
    x1 = x0 - q * x1;
    x0 = t2;

    const t3 = y1;
    y1 = y0 - q * y1;
    y0 = t3;
  }
  return [q, x0, y0];
};
const modInverse = (a: bigint, m: bigint): bigint => {
  const [g, x, y] = EE(a, m);
  if (g !== 1n) p(`error ${g}`);
  return x % m;
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
        rem: BigInt(i) % BigInt(bus),
      });
    }
  });
  p(ids);
  const N = ids.map((e) => e.mod).reduce((a, b) => a * b, 1n);
  let res = 0n;
  for (const bus of ids) {
    const ai = bus.rem;
    const ni = bus.mod;
    const bi = N / ni;
    p({ bi, ni, modI: modInverse(bi, ni) });
    res += ai * bi * modInverse(bi, ni);
  }
  p(N);
  p(res % N);
};

part1(raw);
part2(raw);
