import requests
import re


Input = open("Inputdata2.txt", "r")
regex = re.compile('">(.*) \(\w+\)')


url3 = 'https://www.norwegian.com/dk/'
response3 = requests.get(url3)
html3 = response3.content
with open("Output/inputdata2.txt", "a") as input:
    input.write(html3)
print "Parsing of " + url3 + " completed, content added to: inputdata2.txt. Applying regex."

with open("Output/Result2.csv", "a") as logfile:
    for word in Input:
        query = regex.findall(word)
        for results in query:
            logfile.write(results + '\n')
print "Destinations have been successfully added to Result2.csv"
