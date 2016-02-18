import requests
import re
import time

timestring = time.strftime("%e.%m.%Y")

regex = re.compile('title="(.*) alt=')
url3 = 'https://www.leaseplango.no/page/privatleasing-kampanjetilbud'

response3 = requests.get(url3)
#html3 = response3.content

with open("Output/LeasePlan.csv", "a") as logfile:
    for word in response3:
        query = regex.findall(word)
        for results in query:
            #logfile.write(timestring + " - " + results + '\n')
            logfile.write(timestring + "," + results + '\n')
print "Cars have been successfully added to logfile"


#Fungerende webcrawl som parser direkte til fil, uten mellomledd. Best-practice framover. Bytt ut Url avhengig av om det er film eller serier du skal se.

#Linker:
#http://www.cmore.no/serier
#http://www.cmore.no/filmer
#
#
#
#