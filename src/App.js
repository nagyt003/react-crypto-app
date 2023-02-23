import { Route, Routes } from 'react-router-dom';
import Navigation from './components/navigation/navigation.component';
import Home from './routes/home.component';
import SignIn from './routes/sign-in.component';
import SignUp from './routes/sign-up.component';
import Account from './routes/account.component';
import CoinPage from './routes/coin-page.component';
import Footer from './components/footer/footer.component';
import { Fragment } from 'react';

const App = () => {
	return (
		<Fragment>
			<Routes>
				<Route path="/" element={<Navigation />}>
					<Route index element={<Home />} />
					<Route path="sign-in" element={<SignIn />} />
					<Route path="sign-up" element={<SignUp />} />
					<Route path="account" element={<Account />} />
					<Route path="/coin/:coinId" element={<CoinPage />}>
						<Route path=":coinId" />
					</Route>
				</Route>
			</Routes>
			<Footer />
		</Fragment>
	);
};

export default App;
