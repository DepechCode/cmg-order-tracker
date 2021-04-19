import firebase from './firebase';

const db = firebase.firestore();

const usersRef = db.collection('users');

export const getAllDocs = () => {
	usersRef.get().then((snapshot) => {
		const data = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		console.log(data);
		return data;
	});
};

export const addDoc = async (userData, collection) => {
	await db.collection(collection).add(userData);
};

export const updateDoc = async (docRef, collection, field, value) => {
	await db
		.collection(collection)
		.doc(docRef)
		.update({
			[field]: value,
		});
};
