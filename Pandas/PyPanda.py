import numpy as np
import pandas as pd
import matplotlib.pyplot as plt


#plt.style.use('ggplot')
plt.interactive(False)
#pd.options.display.mpl_style = 'default'
plt.show(block=True)


ts = pd.Series(np.random.randn(1000), index=pd.date_range('1/1/2000', periods=1000))
ts = ts.cumsum()
ts.plot()

#plt.show()
