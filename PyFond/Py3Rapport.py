__author__ = 'Kristoffer Semelenge'
##Created for Python 3.4.X

import urllib.request, time, logging, sys
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
from smtplib import SMTP


timestring = time.strftime("%m%Y")
logstring = time.strftime("%H:%M:%S - %d-%m-%Y |---| ")
logging.basicConfig(filename='Fond.log', level=logging.DEBUG)

logging.debug(logstring + "Starting PyFond")
print("downloading with urllib")
try:
    urllib.request.urlretrieve("http://lt.morningstar.com/qhbsgouucb/snapshotpdf/default.aspx?id=F0GBR04HEJ&SecurityToken=F0GBR04HEJ]2]1]FONORALL_1408&ClientFund=1&LanguageId=nb-NO", "Rapporter/Nordic-Rapport-" + timestring +".pdf")
    urllib.request.urlretrieve("https://lt.morningstar.com/3ofqclb12f/snapshotpdf/default.aspx?SecurityToken=F0000003EA]2]1]FOALL$$ALL_1912", "Rapporter/SGM-Rapport-" + timestring +".pdf")

except:
    logging.warning(logstring + "Download failed - incorrect url. Terminating session")
    sys.exit(logstring + "Terminating script")

logging.debug(logstring + "Attachments downloaded")

msg = MIMEMultipart()
msg['Subject'] = 'Fondsoppdatering - ' + timestring
msg['From'] = 'Fond@olavz.com'
msg['Reply-to'] = 'kristoffer@olavz.com'
msg['To'] = 'semelenge@gmail.com'

# That is what you see if you dont have an email reader:
msg.preamble = 'Multipart massage.\n'

# This is the textual part:
part = MIMEText("Update for Fondsforvaltning")
msg.attach(part)

print("Preparing to attach")
try:
    # This is the binary part(The Attachment):
    part = MIMEApplication(open("Rapporter/Nordic-Rapport-" + timestring +".pdf","rb").read())
    part.add_header('Content-Disposition', 'attachment', filename="Nordic-" + timestring +".pdf")
    msg.attach(part)
    part = MIMEApplication(open("Rapporter/SGM-Rapport-" + timestring +".pdf","rb").read())
    part.add_header('Content-Disposition', 'attachment', filename="SGM-" + timestring +".pdf")
    msg.attach(part)

except:
    logging.warning(logstring + "email attachment failed")

logging.debug(logstring + "monthly rapport downloaded, attempting to send")

try:
    # Create an instance in SMTP server
    smtp = SMTP("smtp.domeneshop.no")

    # Start the server:
    smtp.ehlo()
    smtp.starttls()
    smtp.login("olavz5", "8,MJv2Dq")
except:
    logging.warning(logstring + 'SMTP Failed.')

logging.debug(logstring + "SMTP connection successful")

# Send the email
smtp.sendmail(msg['From'], msg['To'], msg.as_string())
smtp.quit()
print("PyFond completed successfully")
logging.debug(logstring + "PyFond completed successfully")


