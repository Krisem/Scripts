__author__ = 'kristoffersemelenge'


import os
import random

def get_hex():
    return random.choice("abcdef0123456789")

def get_mac():
    new_mac = ':'.join([get_hex() + get_hex() for _ in range(6)])
    return new_mac

print "Old MAC address: ",
os.system("ifconfig en1 | grep ether | grep -oE [0-9abcdef:]{17}")

# setting new random MAC address
os.system("sudo ifconfig en1 ether " + get_mac() )

print "\nNew MAC address: ",
os.system("ifconfig en1 | grep ether | grep -oE [0-9abcdef:]{17}")
