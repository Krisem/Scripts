__author__ = 'kristoffersemelenge'
# ./script.py > <filename>

import re

Input = open("Input.txt", "r")
regex = re.compile(r"\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b")

print("YO")

with open("Result.txt", "a") as logfile:
    for line in Input:
        email = regex.findall(line)
        for line in input():
            logfile.write(email)

print("// - Output has been printed to logfile")

#Input = open("Input.txt", "r")
 #regex = re.compile("\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b")

# open("Result.txt", "a") as logfile:
    #for line in Input:
       # email = regex.findall(line)
        #for line in Input:
           # logfile.write(line)
#print("// - Output has been printed to logfile")



