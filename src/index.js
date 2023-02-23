import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './contexts/theme/theme.context';
import './index.css';
import App from './App';
import { CoinProvider } from './contexts/coin/coin.context';
import { AuthProvider } from './contexts/auth/auth.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<ThemeProvider>
				<AuthProvider>
					<CoinProvider>
						<App />
					</CoinProvider>
				</AuthProvider>
			</ThemeProvider>
		</BrowserRouter>
	</React.StrictMode>
);
