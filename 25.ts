const p = console.log;
const cardpub = 11239946;
const doorpub = 10464955;
const mod = 20201227;

const findrounds = (key: number) => {
  const subjectnum = 7;
  let val = 1;
  let counter = 0;
  while (val !== key) {
    val = (val * subjectnum) % mod;
    counter++;
  }
  p({ counter });
  return counter;
};

const calcEncKey = (rounds: number, subjectnum: number) => {
  const sub = BigInt(subjectnum);
  const modn = BigInt(mod);
  let val = 1n;
  for (let i = 0; i < rounds; i++) {
    val = (val * sub) % modn;
  }
  p({ val });
};

const cardrounds = findrounds(cardpub);
calcEncKey(cardrounds, doorpub);
