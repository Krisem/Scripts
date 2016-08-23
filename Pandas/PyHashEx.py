import hashlib
import csv
import glob

#files = glob.glob( '*.csv' )
files = "Output/email.txt"
output = "hashed.csv"

with open(output, 'w', newline='') as result:
    writer = csv.writer(result)
    for thefile in files:
        with open(thefile, newline='') as f:
            reader = csv.reader(f)
            next(reader, None)  # skip first row
            for fields in reader:
                hash_object = hashlib.md5(fields[2].encode('utf8'))
                newrow = fields[:2] + [hash_object.hexdigest()] + fields[3:]
                writer.writerow(newrow)