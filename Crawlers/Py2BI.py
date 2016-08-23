import requests
import re
import time

timestring = time.strftime("%e.%m.%Y")

regex = re.compile('<a href=".*kurs-og-programmer\W.*\W">(.*)<')
url3 = 'https://www.bi.no/videreutdanning/enkeltkurs/vis-alle-enkeltkurs/'

response3 = requests.get(url3)
#html3 = response3.content

with open("Output/BI.csv", "a") as logfile:
    for word in response3:
        query = regex.findall(word)
        for results in query:
            #logfile.write(timestring + " - " + results + '\n')
            logfile.write(results + '\n')
print "Destinations have been successfully added to logfile"


#Fungerende webcrawl som parser direkte til fil, uten mellomledd. Best-practice framover. Bytt ut Url avhengig av om det er film eller serier du skal se.

#Linker:
#http://www.cmore.no/serier
#http://www.cmore.no/filmer
#
#
#
#