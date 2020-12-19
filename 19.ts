const raw = await Deno.readTextFile('19.in')
const p = console.log

const match = (ruleId: string, input: string, rules: Map<string, string[]>) => {
    const rule = rules.get(ruleId) ?? []
    // p({ ruleId,rule, input })
    if (rule.length === 1 && rule[0].search(/[a-z]/) > -1) {
        if (input[0] === rule[0]) return input.substring(1)
        else return input
    } else {
        let smallest = input
        for (const r of rule) {
            const rlist = r.split(' ')
            let test = input
            for (const rr of rlist) {
                test = match(rr, test, rules)
            }
            if (test.length < smallest.length) smallest = test
        }
    return smallest
    }
}

const part = (raw: string, isPart2 = true) => {
    const rules: Map<string, string[]> = new Map()
    let isRule = true
    let ans = 0
    for (const line of raw.split('\n')) {
        if (line.length === 0) {
            isRule = false
            continue
        }
        if (isRule) {
            const [num, rule] = line.split(": ")
            const ruleset = rule.replaceAll('"', '').split(" | ")
            if (isPart2 && num === '8') ruleset.push('42 8')
            if (isPart2 && num === '11') ruleset.push('42 11 31')
            rules.set(num, ruleset)
        } else {
            ans += match('0', line, rules).length === 0 ? 1 : 0
        }
    }
    p({ ans })

}

part(raw, false)