import { useState, useEffect, createContext } from 'react';

export const ThemeContext = createContext({
	theme: null,
	setTheme: () => null,
});

const isBrowserDefaultThemeDark = () =>
	window.matchMedia('(prefers-color-scheme: dark)').matches;

const getDefaultTheme = () => {
	const browserDefaultTheme = isBrowserDefaultThemeDark() ? 'dark' : 'light';
	if (localStorage.getItem('color-theme') !== undefined) {
		const localStorageTheme = localStorage.getItem('color-theme');
		return localStorageTheme;
	}
	return browserDefaultTheme;
};

const setCurrentTheme = (theme) => {
	const root = document.documentElement;

	root.classList.remove('dark');
	root.classList.remove('light');
	root.classList.add(theme);

	localStorage.setItem('color-theme', theme);
};

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(getDefaultTheme());

	useEffect(() => {
		setCurrentTheme(theme);
	}, [theme]);

	const value = {
		theme,
		setTheme,
	};

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
};
