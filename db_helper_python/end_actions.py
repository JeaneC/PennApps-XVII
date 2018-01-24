#!/usr/bin/env python

import pyrebase
from gensim.summarization import summarize
import time
import subprocess
from paralleldots import set_api_key, get_api_key 
from paralleldots import similarity, ner, taxonomy, sentiment, keywords, intent, emotion, multilang, abuse

config={
	"apiKey": 'AIzaSyAf2GzYCTV-ocPtJ6Pk3Hvk_4sObLjYKic',
	"authDomain": 'classroombeta-87cdc.firebaseapp.com',
	"databaseURL": 'https://classroombeta-87cdc.firebaseio.com',
	"storageBucket": 'classroombeta-87cdc.appspot.com',
}

didEnd = 0
counter = 0

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()

user = auth.sign_in_with_email_and_password('jeane.carlos15@stjohns.edu', 'password1')



db = firebase.database()
storage = firebase.storage()

set_api_key("BcpOcRiBWENPmQkyaerFUR5P8otXKfhAwQvXdID4dio")

def stream_handler(message):
	global counter, didEnd
	if message['data'] == True:
		didEnd = 1
		
	if message['data'] == False:
		if counter > 0:
			didEnd = -1
			
	counter +=1
	print(message, didEnd)
	
	
my_stream = db.child("Classes/67445/End").stream(stream_handler, user['idToken'])




try:
	while True:
		if didEnd ==1:
			print("Ending")
			transactions = db.child("Classes/67445/Transcript/").get(user['idToken'])

			sentenceCount = 0
			completeParagraph = ""
			for transaction in transactions.each():
				completeParagraph += transaction.val()['Text']
				completeParagraph += " " 
				sentenceCount += 1
				
			toPut = summarize(completeParagraph, ratio = 0.4)
			
			pSentiment = sentiment(completeParagraph)
			pEmotion = emotion(completeParagraph)
			pKeywords = keywords(completeParagraph)
			
			links = []
			for thing in pKeywords['keywords']:
				if thing['confidence_score'] > 0.90:
					db.child("Classes/67445/Links").push(
							{"Link": "https://en.wikipedia.org/wiki/" + thing['keyword']}, user['idToken'])
			
			
			pSentimentProbabilities = pSentiment['probabilities']
			pEmotionProbabilities = pEmotion['probabilities']
			
			#upload sentiment info
			db.child("Classes/67445/Sentiment").update(
						{"Negative": pSentimentProbabilities['positive'],
						 "Positive": pSentimentProbabilities['negative'],
						 "Neutral": pSentimentProbabilities['neutral'],
						 "Overall": pSentiment['sentiment']}, user['idToken'])
						 
			db.child("Classes/67445/Emotion").update(
						{"Angry": pEmotionProbabilities['angry'],
						 "Excited": pEmotionProbabilities['excited'],
						 "Happy": pEmotionProbabilities['happy'],
						 "Indifferent": pEmotionProbabilities['indifferent'],
						 "Overall": pEmotion['emotion'],
						 "Sad": pEmotionProbabilities['sad'],}, user['idToken'])
			
			
			
						 
			db.child("Classes/67445").update({"Summary": toPut}, user['idToken'])
			db.child("Classes/67445").update({"End": False}, user['idToken'])
			print("ended")
			
except KeyboardInterrupt:
	my_stream.close()
except Exception:
	subprocess.call("end_actions.py", shell=True)
	my_stream.close()
	