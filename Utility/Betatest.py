__author__ = 'kristoffersemelenge'
# ./script.py > <filename>

import re

Input = open("Input.txt", "r")
regex = re.compile(r"\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b")

with open("Result.txt", "a") as logfile:
    for line in Input:
        query = regex.findall(line)
        for mail in query:
            logfile.write(query)
print("// - Output has been printed to logfile")
