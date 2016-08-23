import hashlib

m = hashlib.sha256()
#print(hashlib.algorithms_available)
#print(hashlib.algorithms_guaranteed)

key = "Hello World"

hash_object = hashlib.sha256(b"key")
hex_dig = hash_object.hexdigest()
print(hex_dig)
print ("key")


##with open("Output/email.txt", "a") as logfile:
    ##for word in file: