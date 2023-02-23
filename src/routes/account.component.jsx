import { useContext } from 'react';
import SavedCoin from '../components/saved-coin/saved-coin.component';
import { AuthContext } from '../contexts/auth/auth.context';
import { Navigate } from 'react-router-dom';

const Account = () => {
	const { currentUser } = useContext(AuthContext);

	if (currentUser) {
		return (
			<div className="max-w-[1140px] mx-auto">
				<div className="flex justify-between items-center my-12 py-8 rounded-div">
					<div>
						<h1 className="text-2xl font-bold">Account</h1>
						<div>
							<p>Welcome, {currentUser?.email}</p>
						</div>
					</div>
				</div>
				<div className="flex justify-between items-center my-12 py-8 rounded-div">
					<div className="w-full min-h-[300px]">
						<h1 className="text-2xl font-bold py-4">Watch List</h1>
						<SavedCoin />
					</div>
				</div>
			</div>
		);
	} else {
		return <Navigate to="/sign-in" />;
	}
};

export default Account;
