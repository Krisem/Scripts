#!/usr/bin/env python
# __author__ = "Kristoffer Semelenge"
import hashlib

with open("Input/email.txt","r") as f_in, open('Output/hashed-emails.csv', 'w') as f_out:
    for line in f_in:
        line = line.rstrip("\n")
        line_uni = line.encode("utf-8")
        m = hashlib.sha256(line_uni)
        f_out.write(m.hexdigest()+'\n')
    print ("Hashed emails written successfully")
    f_in.close()
    f_out.close()