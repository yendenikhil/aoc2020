const input = await Deno.readTextFile("1.in");
const p = console.log;

const part1 = (arr: number[]) => {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if ((arr[i] + arr[j]) === 2020) {
        return arr[i] * arr[j];
      }
    }
  }
  return -1;
};
const part2 = (arr: number[]) => {
  for (let i = 0; i < arr.length - 2; i++) {
    for (let j = i + 1; j < arr.length - 1; j++) {
      for (let k = j + 1; k < arr.length; k++) {
        if ((arr[i] + arr[j] + arr[k]) === 2020) {
          return arr[i] * arr[j] * arr[k];
        }
      }
    }
  }
  return -1;
};

console.time("p1");
p(part1(input.split("\n").map(Number)));
console.timeEnd("p1");
console.time("p2");
p(part2(input.split("\n").map(Number)));
console.timeEnd("p2");
