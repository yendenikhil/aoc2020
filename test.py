import fileinput 
import re
class a(int):
    def __mul__(self, b):
        return a(int(self) + b)
    def __add__(self, b):
        return a(int(self) + b)
    def __sub__(self, b):
        return a(int(self) * b)

def ev(expr, pt2=False):
    expr = re.sub(r"(\d+)", r"a(\1)", expr)
    expr = expr.replace("*", "-")
    if pt2:
        expr = expr.replace("+", "*")
    return eval(expr, {}, {"a": a})

lines = open('18.in').read().splitlines()
print("Part 1:", sum(ev(l) for l in lines))
print("Part 2:", sum(ev(l, pt2=True) for l in lines))
