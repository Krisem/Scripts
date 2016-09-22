import MySQLdb


con = MySQLdb.connect(host="localhost", db="db", user="user", passwd="password")
df.to_sql(con=con, name='table', if_exists='append', flavor='mysql', chunksize=10000,index=False)
df = pd.read_sql(query='SELECT * FROM table;', con=con) # works with almost any valid sql query such as 'DESCRIBE table;'
