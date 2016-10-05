import csv
import pandas as pd

#marks = pd.read_excel('input/Grade.csv', index_col='Student')
with open("input/Grade.csv", 'rb') as f:
    reader = csv.DictReader(f)
    #marks['question 1'] == 'y'
    rows = [row for row in reader if row['q1'] != 'n']