import { useState, useContext, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { AuthContext } from '../../contexts/auth/auth.context';

const SavedCoin = () => {
	const [coins, setCoins] = useState([]);
	const { currentUser } = useContext(AuthContext);

	useEffect(() => {
		if (currentUser) {
			onSnapshot(doc(db, 'users', currentUser.uid), (doc) => {
				setCoins(doc.data().watchList);
			});
		}
		// eslint-disable-next-line
	}, [currentUser.uid]);

	const coinPath = doc(db, 'users', currentUser.uid);

	const deleteCoin = async (id) => {
		try {
			const filteredCoins = coins.filter((coin) => coin.id !== id);
			await updateDoc(coinPath, {
				watchList: filteredCoins,
			});
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div>
			{coins?.length === 0 ? (
				<p>
					You don't have any coins saved. Please save a coin to add it to your
					watch list. <Link to="/">Click here to search coins.</Link>
				</p>
			) : (
				<table className="w-full border-collapse text-center">
					<thead>
						<tr className="border-b">
							<th className="px-4">Rank #</th>
							<th className="text-left">Coin</th>
							<th className="text-left">Remove</th>
						</tr>
					</thead>
					<tbody>
						{coins?.map((coin) => (
							<tr key={coin.id} className="h-[60px] overflow-hidden">
								<td>{coin?.rank}</td>
								<td>
									<Link to={`/coin/${coin.id}`}>
										<div className="flex items-center">
											<img
												className="w-8 mr-4"
												src={coin?.image}
												alt={coin.id}
											/>
											<div>
												<p className="hidden sm:table-cell">{coin?.name}</p>
												<p className="text-gray-500 text-left text-sm">
													{coin?.symbol}
												</p>
											</div>
										</div>
									</Link>
								</td>
								<td className="pl-8">
									<AiOutlineClose
										onClick={() => deleteCoin(coin.id)}
										className="cursor-pointer"
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default SavedCoin;
