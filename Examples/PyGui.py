__author__ = 'Kristoffer Semelenge'

from tkinter import *
from tkinter.filedialog import askopenfilename
import re
from tkinter.messagebox import showerror


class MyFrame(Frame):
    def __init__(self):
        Frame.__init__(self)
        self.master.title("PyUtility")
        self.master.rowconfigure(5, weight=1)
        self.master.columnconfigure(5, weight=1)
        self.grid(sticky=W + E + N + S)
        self.Button = Button(self, text="Input", command=self.Input, width=10)
        self.Button = Button(self, text="Output", command=self.output, width=10)
        self.Button.grid(row=1, column=0, sticky=W)
        self.Button.grid(row=2, column=0, sticky=W)
        self.RunPy_button = Button(self, text="Run PyUtil", command=classmethod(MailScraper), width=10)
        self.RunPy_button.grid(row=3, column=0, sticky=W)

    def Input(self):
        inputFromFile = askopenfilename(filetypes=(("Text documents", "*.txt"),
                                           ("Word documents", "*.html;*.word"),
                                           ("All files", "*.*") ))

    def output(self):
        outputFromFile = askopenfilename(filetypes=(("Text documents", "*.txt"),
                                           ("Word documents", "*.html;*.word"),
                                           ("All files", "*.*") ))

        if fname:
            try:
                print("""here it comes: self.settings["template"].set(fname)""")
            except:  # <- naked except is a bad idea
                showerror("Open Source File", "Failed to read file\n'%s'" % fname)
            return


if __name__ == "__main__":
    root = Tk()
    Gui = MyFrame(root)
    root.mainloop()


def MailScraper():
# Input = ("inputFromFile", "r")
    regex = re.compile("[A-Za-z0-9._\-%]+@[A-Za-z0-9._\-%]+\.[A-Za-z0-9._\-%]+")

    with open(output, "a") as logfile:
        for word in Input:
            query = regex.findall(word)
            for results in query:
                logfile.write(results + '\n')

    print("// - Output has been printed to logfile")

