#list(set("Output/Cmore.txt") - set("Output/Cmore01.txt"))

list1 = "Output/Cmore.txt"
list2 = "Output/Cmore01.txt"

New = list(set(list2) & set(list1))
print New
#Tracks