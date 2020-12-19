const raw = await Deno.readTextFile("19.in");
const p = console.log;

const compose = (id: string, rules: Map<string, string>): string => {
  let rule = rules.get(id) ?? "";
  let counter = 0;
  while (rule.search(/\d/) > -1) {
    counter++;
    // if (counter > 10) break
    rule = rule.replace(/\d+/, (m) => {
      return compose(m, rules);
    });
  }
  // p({id, rule})
  return rule;
};

const expand = (rule: string, iter: number): string => {
  let str = rule;
  const rep = (s: string, num: number) => {
    let ans = s;
    for (let i = 0; i < num; i++) {
      ans += " " + s;
    }
    return ans;
  };
  for (let i = 1; i <= iter; i++) {
    str += " | ";
    str += rule.split(" ").map((e) => rep(e, i)).join(" ");
  }
  return str;
};

const part = (raw: string, isPart2 = true) => {
  const rules: Map<string, string> = new Map();
  let isRule = true;
  const inputs = [];
  // let ans = 0
  for (const line of raw.split("\n")) {
    if (line.length === 0) {
      isRule = false;
      continue;
    }
    if (isRule) {
      const [num, rule] = line.split(": ");
      if (rule.includes('"')) {
        rules.set(num, rule[1]);
      } else {
        if (isPart2 && (num === "8" || num === "11")) {
          const ex = expand(rule, 4);
          rules.set(num, "(" + ex + ")");
        } else {
          rules.set(num, "(" + rule + ")");
        }
      }
    } else {
      inputs.push(line);
    }
  }
  const expression = compose("0", rules).replaceAll(" ", "").replace(/^/, "^")
    .replace(/$/, "$");
  const ans = inputs.filter((e) => e.search(expression) > -1).length;
  p({ ans });
};

console.time("p");
part(raw, false);
console.timeLog("p");
part(raw, true);
console.timeEnd("p");
