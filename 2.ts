const p = console.log;
const raw = (await Deno.readTextFile("2.in"))
  .replaceAll(/[^\x01-\x7f]/g, "");
const part1 = (input: string) => {
  return input.split("\n")
    .map((e) => e.replace(":", "").split(" "))
    .filter((e) => {
      const [min, max] = e[0].split("-").map(Number);
      const before = e[2].length;
      const after = e[2].replaceAll(e[1], "").length;
      const diff = before - after;
      return min <= diff && diff <= max;
    }).length;
};
const part2 = (input: string) => {
  return input.split("\n")
    .map((e) => e.replace(":", "").split(" "))
    .filter((e) => {
      const [min, max] = e[0].split("-").map(Number);
      const chars = e[2].split("");
      return (chars[min - 1] === e[1] && chars[max - 1] !== e[1]) ||
        (chars[min - 1] !== e[1] && chars[max - 1] === e[1]);
    }).length;
};

console.time("p");
p(part1(raw));
console.timeLog("p");
p(part2(raw));
console.timeEnd("p");
