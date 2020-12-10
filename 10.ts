const raw = await Deno.readTextFile('10.in')
const p = console.log

const part1 = (raw: string) => {
    const lines = raw.split('\n').map(Number).sort((a, b) => a - b)
    lines.unshift(0)
    lines.push(lines[lines.length - 1] + 3)
    const diff = []
    for (let i = 1; i < lines.length; i++) {
        diff[i - 1] = lines[i] - lines[i - 1]
    }
    const one = diff.filter(e => e === 1).length
    const three = diff.filter(e => e === 3).length
    return one * three
}
const weight =  (index: number, final: number, lines: number[], cache: Map<number, number>): number => {
    if (lines.length < 2) return 1
    const c = cache.get(index)
    if (c !== undefined) return c
    let i = 1
    const base = lines[0]
    let weigh = 0
    while(true) {
        if (lines[i] !== undefined && lines[i] - base <= 3){
            weigh += weight(index + i, final, lines.slice(i), cache)
            i++
        } else break
    }
    cache.set(index, weigh)
    return weigh
}

const part2 = (raw: string) => {
    const lines = raw.split('\n').map(Number).sort((a, b) => a - b)
    const final = lines[lines.length - 1] + 3
    lines.unshift(0)
    lines.push(final)
    return weight(0, final, lines, new Map())

}

console.time('p')
p(part1(raw))
console.timeLog('p')
p(part2(raw))
console.timeEnd('p')