import hashlib, csv


with open("Output/email.txt","r") as f:
    for line in f.readlines():
        line = line.rstrip("\n")
        line_uni = line.encode("utf-8")
        m = hashlib.sha256(line_uni)
        #print(m.hexdigest())
        #print(m.digest_size)
    f.close()
    with open("Result2.csv", "a") as hmails:
        #for line in m.hexdigest:
        #hashedmails.write("%s\n" % item)
            hmails.write(m.hexdigest())
    hmails.close()

