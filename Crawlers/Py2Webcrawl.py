import requests
import re
from BeautifulSoup import BeautifulSoup

regex = re.compile(';">(\w+)+&#32\;\(\w+\)')

url = 'http://www.norwegian.com/dk/destinationer/sneogski/'
response = requests.get(url)
html = response.content

soup = BeautifulSoup(html)
table = soup.find('div', attrs={'class': 'cityName'})
print table

with open("Result2.txt", "a") as logfile:
    for city in table:
        query = regex.findall(city)
        for results in query:
            logfile.write(results + '\n')
print "loop completed successfully"
#------------------#

#Input = open("Inputdata.txt", "r")
#regex = re.compile("[A-Za-z0-9._\-%]+@[A-Za-z0-9._\-%]+\.[A-Za-z0-9._\-%]+")
#
#with open("Result.txt", "a") as logfile:
#    for word in Input:
#        query = regex.findall(word)
#        for results in query:
#            logfile.write(results + '\n')