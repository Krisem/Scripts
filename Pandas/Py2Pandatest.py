import pandas as pd

# read in data using the many mathods to do so, making the student the unique identifier
marks = pd.read_excel('Input/Grade.xlsx', index_col='Student')

print "log: load completed, initiating analysis"
# gets the first question column, if the column didn't have spaces, you
# could have used dot look up: marks.question1
marks['question 1']

# returns a series of booleans where students answered 'y' for question 1
marks['question 1'] == 'y'

# combines the booleans into a single series, where true is where
# students answered 'y' for question 1 and 'n' for question '2'
# (and: &) and (or: |) I don't know why they didn't implement it as
# && and ||, but they must have their reasons
# parentheses are important here
#print (marks['question 1'] == 'y') & (marks['question 2'] == 'n')

# using a series of booleans as a look-up will create a new
# dataframe with just the matches, therefore this filters all the
# data to just have those students who answer 'y' for question 1 a
# marks[(marks['question 1'] == 'y') & (marks['question 2'] == 'n')]

# you can then lookup what you want from the result in this case,
# look up the answers students gave for question 4, if they answered
# 'y' for question 1 and 'n' for questions 2.
#print marks[(marks['question 1'] == 'y') & (marks['question 2'] == 'n')]['question 3']
marks.groupby('question 1')
print "log: done"



#groupby() er genialt.