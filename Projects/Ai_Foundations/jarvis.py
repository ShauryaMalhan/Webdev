import random
import json
import torch
from brain import NeuralNet
from tasks import NonInputExecution, InputExecution
from neuralnetwork import bag_of_words, tokenize
from listenchatbot import Listen
from speakchatbot import Say
from news import fetch_news, speak_news
from play import play_song  
from webrowser import open_google_sheets , open_google_slides, open_google_docs, open_google_photos

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

with open("intents.json", 'r') as json_data:
    intents = json.load(json_data)

FILE = "TrainData.pth"
data = torch.load(FILE)

input_size = data["input_size"]
hidden_size = data["hidden_size"]
output_size = data["output_size"]
all_words = data["all_words"]
tags = data["tags"]
model_state = data["model_state"]

model = NeuralNet(input_size, hidden_size, output_size).to(device)
model.load_state_dict(model_state)
model.eval()

# ------------------------------------------------
Name = "Jarvis"
from listenchatbot import Listen

def Main():
    sentence = Listen().lower()

    if "bye" in sentence:
        Say("Goodbye!")
        exit()

    if "news" in sentence:
        headlines = fetch_news()
        print('Here are the top news headlines:')
        for index, headline in enumerate(headlines):
            print(f"{index + 1}. {headline}")
        speak_news(headlines)
        return

    if "play" in sentence:
        song_name = sentence.replace("play", "").strip()
        play_song(song_name)
        return

    # Add conditions to open Google services
    if "open sheets" in sentence or "sheets" in sentence:
        open_google_sheets()
        return
    if "open slides" in sentence or "slides" in sentence:
        open_google_slides()
        return
    if "open docs" in sentence or "docs" in sentence:
        open_google_docs()
        return
    if "open photos" in sentence or "photos" in sentence:
        open_google_photos()
        return

    sentence = tokenize(sentence)
    X = bag_of_words(sentence, all_words)
    X = X.reshape(1, X.shape[0])
    X = torch.from_numpy(X).to(device)

    output = model(X)
    _, predicted = torch.max(output, dim=1)

    tag = tags[predicted.item()]
    probs = torch.softmax(output, dim=1)
    prob = probs[0][predicted.item()]

    if prob.item() > 0.75:
        for intent in intents['intents']:
            if tag == intent["tag"]:
                reply = random.choice(intent["responses"])

                if "time" in reply:
                    NonInputExecution(reply)
                elif "date" in reply:
                    NonInputExecution(reply)
                elif "wikipedia" in reply:
                    InputExecution(reply, sentence)
                else:
                    Say(reply)

while True:
    Main()