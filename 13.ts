const raw = await Deno.readTextFile('13.in')
const p = console.log

const part1 = (raw: string) => {
    const time = Number(raw.split('\n')[0])
    const ids = raw.split('\n')[1].split(',').filter(x => x !== 'x').map(Number)
    let minid = 0
    let min = time
    for (const id of ids) {
        const rem = id - (time % id)
        if (rem < min) {
            minid = id
            min = rem
        }
    }
    p(min * minid)
}

const gcd = (a: bigint, b: bigint): bigint => {
    if (a === 0n) return b
    if (b === 0n) return a
    if (a === b) return a
    if (a > b) return gcd(b, a % b)
    else return gcd(a, b % a)
}

const EE = (a: bigint, b: bigint): bigint => {
    let rOld = a
    let r = b
    let sOld = 1n
    let s = 0n
    let tOld = 0n
    let t = 1n
    while (r !== 0n) {
        const q = rOld / r
        const t1 = r 
        r = rOld - q * r 
        rOld = t1 
        const t2 = s 
        s = sOld - q * s 
        sOld = t2 
        const t3 = t 
        t = tOld - q * t 
        tOld = t3
    }
    return rOld

}
const modInverse = (n: bigint, b: bigint) => {
    const x = EE(n, b)
    return x % b
}

const part2 = (raw: string) => {
    const ids: [bigint, bigint][] = []
    raw.split('\n')[1].split(',').forEach((v, i) => {
        if (v !== 'x') ids.push([BigInt(i) + 1n, BigInt(v)])
    })
    p(ids)
    const N = ids.map(e => e[0]).reduce((a, b) => a * b, 1n)
    p({ N })
    let sum = 0n
    for (const id of ids) {
        const b = id[1]
        const n = N / id[0]
        const x = modInverse(n, b)
        p({ b, n, x, test: N / n})
        sum += n * b * x
    }
    p(sum % N)
}

part1(raw)
part2(raw)