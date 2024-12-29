from database import addCoppia, getPersone
import random


def shuffleDB():
    names = getPersone()
    l = [ele[0] for ele in names]
    if len(l) % 2 != 0:
        l.pop(random.randint(0, len(l) - 1))
    for _ in range(len(l) // 2):
        first = l.pop(random.randint(0, len(l) - 1))
        second = l.pop(random.randint(0, len(l) - 1))
        addCoppia(first, second)


def shuffle():
    pairs = {}
    names = getPersone()
    l = [ele[0] for ele in names]
    if len(l) % 2 != 0:
        l.pop(random.randint(0, len(l) - 1))
    for _ in range(len(l) // 2):
        first = l.pop(random.randint(0, len(l) - 1))
        second = l.pop(random.randint(0, len(l) - 1))
        pairs[first] = second
    return pairs
