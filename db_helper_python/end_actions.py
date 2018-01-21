#!/usr/bin/env python

import pyrebase
from gensim.summarization import summarize
import time
import traceback
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
			transactions = db.child("Classes/67445/Transcript/").get(user['idToken'])

			sentenceCount = 0
			completeParagraph = ""
			for transaction in transactions.each():
				completeParagraph += transaction.val()['Text']
				completeParagraph += " " 
				sentenceCount += 1
				
			toPut = summarize(completeParagraph, ratio = 0.4)
			print(toPut)
			
			db.child("Classes/67445").update({"Summary": toPut}, user['idToken'])
			db.child("Classes/67445").update({"End": False}, user['idToken'])
			
			time.sleep(5)
except KeyboardInterrupt:
	my_stream.close()
except Exception:
	my_stream.close()
	traceback.printexc()
	