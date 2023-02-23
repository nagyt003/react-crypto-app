import { createContext, useState, useEffect } from 'react';
import {
	onAuthStateChangedListener,
	createUserDocumentFromAuth,
} from '../../firebase/firebase';

export const AuthContext = createContext({
	currentUser: null,
	setCurrentUser: () => null,
});

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener((user) => {
			if (user) {
				createUserDocumentFromAuth(user, { watchList: [] });
			}
			setCurrentUser(user);
		});

		return unsubscribe;
	}, []);

	const value = { currentUser, setCurrentUser };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
