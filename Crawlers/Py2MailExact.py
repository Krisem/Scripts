import requests
import re
import time


regex = re.compile(r'>(.*@.*)<')


InputFile = open("Mail.txt", "r")

with open("Output/Mail.xml", "a") as logfile:
    for word in InputFile:
        query = regex.findall(word)
        for results in query:
            logfile.write(results + '\n')

print "Destinations have been successfully added to logfile"