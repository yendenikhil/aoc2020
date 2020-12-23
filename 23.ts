const raw = "523764819";
// const raw = "389125467";
const p = console.log;

class Node {
  v: number;
  n: Node | null = null;
  constructor(num: number) {
    this.v = num;
  }
}

const buildcircle = (raw: string, length: number) => {
  const nums = raw.split("").map(Number);
  const head = new Node(nums[0]);
  let curr = head;
  nums.slice(1).forEach((n) => {
    curr.n = new Node(n);
    curr = curr.n;
  });
  for (let i = nums.length + 1; i <= length; i++) {
    curr.n = new Node(i);
    curr = curr.n;
  }
  curr.n = head;
  return head;
};

const buildMap = (head: Node) => {
  const map: Map<number, Node> = new Map();
  while (!map.has(head.v)) {
    map.set(head.v, head);
    if (head.n) head = head.n;
  }
  return map;
};

const play = (head: Node, max: number, rounds: number, resLength: number) => {
  const map = buildMap(head);
  for (let i = 0; i < rounds; i++) {
    if (!head.n || !head.n.n || !head.n.n.n || !head.n.n.n.n) break;
    const val = head.v;
    const pick = [head.n.v, head.n.n.v, head.n.n.n.v];
    head.n = head.n.n.n.n;
    let check = val - 1;
    if (check === 0) check = max;
    while (pick.includes(check)) {
      check--;
      if (check === 0) check = max;
    }
    const point = map.get(check);
    if (!point) break;
    const hold = point.n;
    point.n = new Node(pick[0]);
    point.n.n = new Node(pick[1]);
    point.n.n.n = new Node(pick[2]);
    point.n.n.n.n = hold;
    map.set(point.n.v, point.n);
    map.set(point.n.n.v, point.n.n);
    map.set(point.n.n.n.v, point.n.n.n);
    // let curr = head
    // for (let i = 0; i < 9; i++){
    //     p(curr.v)
    //     if (curr.n) curr = curr.n
    // }
    head = head.n;
  }
  while (head.v !== 1) {
    if (!head.n) break;
    head = head.n;
  }
  const ans = [];
  for (let i = 0; i < resLength; i++) {
    if (head.n) {
      ans.push(head.n.v);
      head = head.n;
    }
  }
  return ans;
};

const part1 = (raw: string) => {
  const buff = buildcircle(raw, 9);
  const ans = play(buff, 9, 100, 8);
  p(ans.join(""));
};
const part2 = (raw: string) => {
  const buff = buildcircle(raw, 1000000);
  const ans = play(buff, 1000000, 10000000, 2);
  p(ans.reduce((a, b) => a * b, 1));
};

console.time("p");
part1(raw);
console.timeLog("p");
part2(raw);
console.timeEnd("p");
