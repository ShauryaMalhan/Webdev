#Functions

import datetime
from speakchatbot import Say
#Non Input

def Time():
    time = datetime.datetime.now().strftime("%H:%M")
    Say(time)

def Date():
    date = datetime.date.today()
    Say(date)


def NonInputExecution(query):
    query = str(query)

    if "time" in query:
        Time()
    elif  "date" in query:
        Date()

def InputExecution(tag,query):

    if "wikipedia" in tag:
        name = str(query).replace("who is","").replace("about","").replace("what is","").replace("wikipedia","").replace("wikipedia","").replace("tell me something about","")
        import wikipedia 
        result = wikipedia.summary(name)
        Say(result)
         