const raw = await Deno.readTextFile("22.in");
const p = console.log;

const readInput = (raw: string) => {
  let isRight = false;
  const left: number[] = [];
  const right: number[] = [];
  for (const line of raw.split("\n")) {
    if (line.startsWith("Player")) {
      continue;
    } else if (line.length === 0) {
      isRight = true;
    } else {
      if (isRight) {
        right.push(Number(line));
      } else {
        left.push(Number(line));
      }
    }
  }
  return { left, right };
};

const play1 = (left: number[], right: number[]) => {
  while (left.length > 0 && right.length > 0) {
    const l = left.shift() ?? 0;
    const r = right.shift() ?? 0;
    if (l > r) {
      left.push(l);
      left.push(r);
    } else {
      right.push(r);
      right.push(l);
    }
  }
  if (left.length === 0) return right;
  else return left;
};

const play2 = (
  left: number[],
  right: number[],
): { num: number; deck: number[] } => {
  const states: Set<string> = new Set();
  while (left.length > 0 && right.length > 0) {
    const key = left.join() + ":" + right.join();
    if (states.has(key)) {
      return { num: 1, deck: left };
    }
    const l = left.shift() ?? 0;
    const r = right.shift() ?? 0;
    if (l <= left.length && r <= right.length) {
      const { num } = play2(
        left.slice(0, l),
        right.slice(0, r),
      );
      if (num === 1) {
        left.push(l);
        left.push(r);
      } else {
        right.push(r);
        right.push(l);
      }
    } else {
      if (l > r) {
        left.push(l);
        left.push(r);
      } else {
        right.push(r);
        right.push(l);
      }
    }
    states.add(key);
  }
  if (left.length > 0) {
    return { num: 1, deck: left };
  } else {
    return { num: 2, deck: right };
  }
};

const part1 = (raw: string) => {
  const { left, right } = readInput(raw);
  const winner = play1(left, right);
  let ans = 0;
  for (let i = 1; i < winner.length + 1; i++) {
    ans += i * winner[winner.length - i];
  }
  p({ ans });
};
const part2 = (raw: string) => {
  const { left, right } = readInput(raw);
  const { deck: winner } = play2(left, right);
  let ans = 0;
  for (let i = 1; i < winner.length + 1; i++) {
    ans += i * winner[winner.length - i];
  }
  p({ ans });
};

console.time("p");
part1(raw);
console.timeLog("p");
part2(raw);
console.timeEnd("p");
