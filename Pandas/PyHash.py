import hashlib

with open("Output/email.txt","r") as f_in, open('Result2.csv', 'w') as f_out:
    for line in f_in:
        line = line.rstrip("\n")
        line_uni = line.encode("utf-8")
        m = hashlib.sha256(line_uni)
        f_out.write(m.hexdigest()+'\n')
    print ("Hashed emails written successfully")
    f_in.close()
    f_out.close()