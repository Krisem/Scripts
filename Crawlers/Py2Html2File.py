import requests
import re

regex = re.compile('">(.*) \(\w+\)')

url = 'http://www.norwegian.com/dk/destinationer/sneogski/'
response = requests.get(url)
html = response.content
with open("Output/Inputdata2.txt", "a") as input:
    input.write(html)

Input = open("Output/Inputdata2.txt", "r")

print "Sne og Ski ferdig"

url2 = 'https://www.norwegian.com/dk/destinationer/storby/'
response2 = requests.get(url2)
html2 = response2.content
with open("Output/Inputdata2.txt", "a") as input:
    input.write(html2)

print "Storby Ferdig"

url3 = 'https://www.norwegian.com/dk/destinationer/sol-og-strand/'
response3 = requests.get(url3)
html3 = response3.content
with open("Output/Inputdata2.txt", "a") as input:
    input.write(html3)

with open("Output/Result2.csv", "a") as logfile:
    for word in Input:
        query = regex.findall(word)
        for results in query:
            logfile.write(results + '\n')
print "sol og strand ferdig"
