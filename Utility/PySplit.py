__author__ = '*'
##Created for Python 3.4.X

from PyPDF2 import PdfFileWriter, PdfFileReader
import re


infile = PdfFileReader(open('Sample.pdf', 'rb'))
regex = re.compile(r"(?<=2015)(.*)(?=Rapport)")

for i in range(infile.getNumPages()):
    p = infile.getPage(i)
    outfile = PdfFileWriter()
    ##outfile.addPage(p)
    Fileheader = regex.findall(i)
    with open(Fileheader + ".pdf" % i, 'wb') as f:
            outfile.write(f)


#fungerer bra - ny import?