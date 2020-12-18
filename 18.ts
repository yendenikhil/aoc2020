const raw = await Deno.readTextFile("18.in");
const p = console.log;

const solve = (line: string, mode: boolean): bigint => {
  const orig = line;
  while (line.includes("(")) {
    line = line.replace(
      /\(([\d+\+\* ]+)\)/,
      (match, p1) => String(solve(p1, mode)),
    );
  }
  if (mode) {
    while (line.includes("+")) {
      line = line.replace(/\d+ \+ \d+/, (match) => {
        const tokens = match.split(" ");
        return String(BigInt(tokens[0]) + BigInt(tokens[2]));
      });
    }
    while (line.includes("*")) {
      line = line.replace(/\d+ \* \d+/, (match) => {
        const tokens = match.split(" ");
        return String(BigInt(tokens[0]) * BigInt(tokens[2]));
      });
    }
    return BigInt(line);
  } else {
    while (line.includes("+") || line.includes("*")) {
      line = line.replace(/\d+ ([\*\+]) \d+/, (match, op) => {
        const tokens = match.split(" ");
        if (op === "+") {
          return String(BigInt(tokens[0]) + BigInt(tokens[2]));
        } else {
          return String(BigInt(tokens[0]) * BigInt(tokens[2]));
        }
      });
    }
    return BigInt(line);
  }
};

const part = (raw: string) => {
  const lines = raw.split("\n");
  let p1 = 0n;
  let p2 = 0n;
  for (const line of lines) {
    p1 += solve(line, false);
    p2 += solve(line, true);
  }
  p({ p1, p2 });
};

console.time("p");
part(raw);
console.timeEnd("p");
