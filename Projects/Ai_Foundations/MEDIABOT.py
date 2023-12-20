import random
import re
import json
import torch
from brain import NeuralNet
from NeuralNetwork import bag_of_words, tokenize
from listen import Listen
from speak import Say
from task import NonInputExecution,InputExecution

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

with open("intents.json", 'r') as json_data:
    intents = json.load(json_data)

FILE = "TrainingData.pth"
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

# Define the limit for which it will ask to continue speaking
SPEAK_LIMIT = 150

# Regular expression to identify links
link_pattern = r'http[s]?://\S+'

def extract_links(text):
    # Extract links using regular expressions
    return re.findall(link_pattern, text)

def remove_links(text):
    # Remove links from the text
    return re.sub(link_pattern, '', text)

def Main():
    sentence = Listen()
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
                
                elif "screen shot" in reply:
                    NonInputExecution(reply)
                    
                elif "wikipedia" in reply:
                    InputExecution(reply)
                
                else:
                    if tag == "goodbye":
                        links = extract_links(reply)
                        reply_with_links = reply  # Include links in the displayed reply
                        reply = remove_links(reply)  # Remove links from the response
                        
                        if len(reply) > SPEAK_LIMIT:
                            remaining_reply = reply[SPEAK_LIMIT:]
                            reply_to_speak = reply[:SPEAK_LIMIT]  # Limit the response to a specified length
                            print(f"MediBot : {reply_with_links}")  # Display the reply with links
                            Say(reply_to_speak)  # Speak the response text
                            
                            # Ask the user if they want to continue speaking
                            print(f"MediBot : Should I tell further?")
                            Say("Should I tell further?")
                            user_input = Listen()
                            if "yes" in user_input:
                                # Continue speaking the remaining part of the reply
                                Say(remaining_reply)  # Speak the remaining part of the response
                            else:
                                Say("Okay, stopping here.")
                                exit()
                        else:
                            reply_to_speak = reply
                            print(f"MediBot : {reply_with_links}")  # Display the reply with links
                            Say(reply_to_speak)  # Speak the response text
                            exit()
                    
                    else:
                        links = extract_links(reply)
                        reply_with_links = reply  # Include links in the displayed reply
                        reply = remove_links(reply)  # Remove links from the response
                        
                        if len(reply) > SPEAK_LIMIT:
                            remaining_reply = reply[SPEAK_LIMIT:]
                            reply_to_speak = reply[:SPEAK_LIMIT]  # Limit the response to a specified length
                            print(f"MediBot : {reply_with_links}")  # Display the reply with links
                            Say(reply_to_speak)  # Speak the response text
                            
                            # Ask the user if they want to continue speaking
                            print(f"MediBot : Should I tell further?")
                            Say("Should I tell further?")
                            user_input = Listen()
                            if "yes" in user_input:
                                # Continue speaking the remaining part of the reply
                                Say(remaining_reply)  # Speak the remaining part of the response
                            else:
                                Say("Okay, stopping here.")
                        else:
                            reply_to_speak = reply
                            print(f"MediBot : {reply_with_links}")  # Display the reply with links
                            Say(reply_to_speak)  # Speak the response text

while True:
    Main()