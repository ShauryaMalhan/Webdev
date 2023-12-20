import speech_recognition as sr

def Listen():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        r.adjust_for_ambient_noise(source, duration=1)  # Adjust for ambient noise
        print("Listening...")
        audio = r.listen(source, timeout=1, phrase_time_limit=10)  
    try:
        print("Recognising...")
        query = r.recognize_google(audio, language="en-IN")
        query = str(query)
        print(f"Me : {query}")
    except sr.UnknownValueError:
        print("Could not understand audio")
        return ""
    except sr.RequestError as e:
        print(f"Could not request results: {e}")
        return ""

    return query.lower()
Listen()