var firebaseConfig = {
	apiKey: "AIzaSyDyQC41jtR6MbkeGm8UbZiGoCyvmVcXl9U",
	authDomain: "tutorial-vue-e8ac3.firebaseapp.com",
	projectId: "tutorial-vue-e8ac3",
	storageBucket: "tutorial-vue-e8ac3.appspot.com",
	messagingSenderId: "982178270147",
	appId: "1:982178270147:web:4835ea9cc9c2c70cd5cb76"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.database()
const refKelas = db.ref('kelas')