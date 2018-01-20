import * as firebase from 'firebase';

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

export const getClassData = async classCode => {
	return await database
		.ref(`Classes/${classCode}`)
		.once('value')
		.then(snapshot => {
			return snapshot.val();
		});
};

export const updateScheduleToFirebase = (route, uid, schedule) => {
	database.ref(`Lines/Route ${route}/${uid}/schedule`).set(schedule);
};

export const updateTravelTimeToFirebase = (route, uid, time) => {
	database.ref(`Lines/Route ${route}/${uid}/nextStop/time`).set(time);
};
//
// firebase
//   .auth()
//   .signInWithEmailAndPassword(email, pass)
//   .then(async ({ uid }) => {
//     let name = await database
//       .ref(`Users/${uid}/Name`)
//       .once('value')
//       .then(snapshot => snapshot.val());
//     console.log('name', name);
//     await this.props.signIn(uid, code, name);
//     this.props.navigation.navigate('theme');
//     // this.props.signIn(user.uid);
//     // this.setModalVisible(false);
//     // this.props.navigation.navigate('settings');
//   })
//   .catch(() => {});

// export { firebase, mainRef, userRef, database };
export { firebase, database };
