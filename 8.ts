const raw = await Deno.readTextFile("8.in");
const p = console.log;

interface Instr {
  name: string;
  val: number;
}

const build = (raw: string): Instr[] => {
  return raw.split("\n").map(
    (e) => {
      const [name, val] = e.split(" ");
      return {
        name,
        val: Number(val),
      } as Instr;
    },
  );
};

const exec = (code: Instr[]) => {
  const seen: number[] = [];
  let i = 0;
  let acc = 0;
  let broken = false;
  while (i < code.length) {
    if (seen.includes(i)) {
      broken = true;
      break;
    }
    seen.push(i);
    const { name, val } = code[i];
    switch (name) {
      case "acc":
        acc += val;
        i++;
        break;
      case "jmp":
        i += val;
        break;
      default:
        i++;
    }
  }
  return [acc, broken];
};

const part1 = (raw: string) => {
  return exec(build(raw))[0];
};

const part2 = (raw: string) => {
  const code = build(raw);
  const changes: number[] = code.map((e, i) => {
    if (e.name === "nop" || e.name === "jmp") return i;
    else return -1;
  }).filter((e) => e > -1);

  while (changes.length > 0) {
    const curr = changes.shift();
    if (!curr) break;
    const { name, val } = code[curr];
    const newName = name === "nop" ? "jmp" : "nop";
    const newcode = code.slice();
    newcode.splice(curr, 1, { name: newName, val });
    const res = exec(newcode);
    if (res[1] === false) {
      return res[0];
    }
  }
  p("still broken");
};

console.time("p");
p(part1(raw));
console.timeLog("p");
p(part2(raw));
console.timeEnd("p");
