__author__ = 'kristoffersemelenge'

import re

Input = open("Inputdata.txt", "r")
regex = re.compile("[A-Za-z0-9._\-%]+@[A-Za-z0-9._\-%]+\.[A-Za-z0-9._\-%]+")

with open("Result.txt", "a") as logfile:
    for word in Input:
        query = regex.findall(word)
        for results in query:
            logfile.write(results + '\n')

print("// - Output has been printed to logfile")


