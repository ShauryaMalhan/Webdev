import requests
import json
import pyttsx3

# Function to fetch news
def fetch_news():
    # Replace 'yourapikey' with your actual API key
    api_key = '049ad71f824b4eaab2a42b67d71cbe5f'
    url = f'https://newsapi.org/v2/top-headlines?country=in&apiKey={api_key}'
    news = requests.get(url).text
    news_dict = json.loads(news)
    articles = news_dict['articles'][:10]  # Limit to the first 10 articles
    headlines = [article['title'] for article in articles]
    return headlines

# Function to speak the news
def speak_news(headlines):
    engine = pyttsx3.init()
    engine.setProperty('rate', 150)  # You can adjust the speaking rate

    engine.say('Here are the top news headlines:')
    for index, headline in enumerate(headlines):
        engine.say(f"{index + 1}. {headline}")
        engine.runAndWait()

if __name__ == "__main__":
    headlines = fetch_news()
    speak_news(headlines)