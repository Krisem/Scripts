import os
import subprocess

for top, dirs, files in os.walk('/my/pdf/folder'):
    for filename in files:
        if filename.endswith('.pdf'):
            abspath = os.path.join(top, filename)
            subprocess.call('lowriter --invisible --convert-to doc "{}"'
                            .format(abspath), shell=True)

            https: // github.com / euske / pdfminer
            https: // github.com / mstamy2 / PyPDF2