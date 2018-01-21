import * as firebase from 'firebase';
import moment from 'moment';

const startMoment = moment();

const config = {
	apiKey: 'AIzaSyAf2GzYCTV-ocPtJ6Pk3Hvk_4sObLjYKic',
	authDomain: 'classroombeta-87cdc.firebaseapp.com',
	databaseURL: 'https://classroombeta-87cdc.firebaseio.com',
	projectId: 'classroombeta-87cdc',
	storageBucket: 'classroombeta-87cdc.appspot.com',
	messagingSenderId: '406672086263'
};

firebase.initializeApp(config);

const database = firebase.database();
// const mainRef = database.ref('Lines');
// const userRef = database.ref('Users');

export const getClassData = async classCode => {
	return await database
		.ref(`Classes/${classCode}`)
		.once('value')
		.then(snapshot => {
			return snapshot.val();
		});
};

// export { firebase, mainRef, userRef, database };

const config2 = {
	apiKey: 'AIzaSyBrd4PqBBQwVVZwiPiLgsYiAI6vaSkAhHk',
	authDomain: 'remoteforgs.firebaseapp.com',
	databaseURL: 'https://remoteforgs.firebaseio.com',
	projectId: 'remoteforgs',
	storageBucket: 'remoteforgs.appspot.com',
	messagingSenderId: '602692243423'
};
// Initialize another app with a different config
const secondary = firebase.initializeApp(config2, 'secondary');

// Retrieve the database.
const remoteDatabase = secondary.database();

export { firebase, database, remoteDatabase };
