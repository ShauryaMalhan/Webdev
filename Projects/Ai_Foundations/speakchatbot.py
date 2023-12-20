import pyttsx3
engine = pyttsx3.init("sapi5")
voices = engine.getProperty('voices')
engine.setProperty('voices' , voices[0].id)
engine.setProperty('rate' ,170)

def Say(Text):
    print(f"A.I: {Text}")
    engine.say(Text)
    engine.runAndWait ()
    print(" ")