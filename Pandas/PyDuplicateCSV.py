import csv
import pandas as pd

marks = pd.read_excel('Input/Grade.xlsx', index_col='Student')
with open("Input/Grade.csv", 'rb') as f:
    reader = csv.DictReader(f)
    rows = [row for row in reader if row['q1'] != 'n']

rows = [row for row in reader if row['q1'] != 'y']
#reader1 = csv.reader(open('output1.csv', 'rb'))
writer = csv.writer(open('Output/Grade2.csv', 'wb'))
for row in reader:
    row1 = reader1.next()
    writer.writerow(row + row1)



marks['question 1'] == 'y'