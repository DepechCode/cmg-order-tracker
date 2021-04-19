import React, { createContext, useContext, useEffect, useState } from 'react';

import { auth } from '../services/firebase';

const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [idToken, setIdToken] = useState('');
	console.log('authLog', currentUser);

	useEffect(() => {
		auth.onAuthStateChanged(async (user) => {
			setCurrentUser(user);
			setLoading(false);
			if (user) {
				const token = await user.getIdToken();
				setIdToken(token);
			}
		});
	}, []);

	const signup = (email, password) => {
		return auth.createUserWithEmailAndPassword(email, password);
	};

	const login = (email, password) => {
		return auth.signInWithEmailAndPassword(email, password);
	};

	const logout = () => {
		return auth.signOut();
	};

	const resetPassword = (email) => {
		return auth.sendPasswordResetEmail(email);
	};

	const updateEmail = (email) => {
		return currentUser.updateEmail(email);
	};

	const updatePassword = (password) => {
		return currentUser.updatePassword(password);
	};

	const value = {
		currentUser,
		login,
		signup,
		logout,
		resetPassword,
		updateEmail,
		updatePassword,
		idToken,
	};

	if (loading) {
		return <>Please Wait...</>;
	}

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};
