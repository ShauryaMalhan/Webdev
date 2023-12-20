import pyttsx3
import pywhatkit

def play_song(song_name):
    try:
        engine = pyttsx3.init()
        engine.say(f"Playing {song_name} on YouTube.")
        engine.runAndWait()
        pywhatkit.playonyt(song_name)
    except Exception as e:
        engine = pyttsx3.init()
        engine.say(f"Sorry, I couldn't play the song. Please try again later.")
        engine.runAndWait()

if __name__ == "__main__":
    song_name = input("Enter the name of the song you want to play: ")
    play_song(song_name)