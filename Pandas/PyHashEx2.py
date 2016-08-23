import os
import hashlib
import unicodedata
# -*- coding: utf-8 -*-

with open("Output/email.txt","r") as f:
    for line in f.readlines():
        line = line.rstrip("\n")
        line_uni = line.encode("utf-8")
        m = hashlib.sha256(line_uni)
        print(m.hexdigest())