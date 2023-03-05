import { useContext } from 'react';
import { CoinContext } from '../../contexts/coin/coin.context';
import { AuthContext } from '../../contexts/auth/auth.context';
import { db } from '../../firebase/firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import CoinItem from '../coin-item/coin-item.component';

const CoinsTable = () => {
	const { filteredCoins, coinsError, coinsLoading } = useContext(CoinContext);
	const { currentUser } = useContext(AuthContext);

	const saveCoin = async (coin) => {
		if (currentUser) {
			const coinPath = doc(db, 'users', currentUser.uid);

			await updateDoc(coinPath, {
				watchList: arrayUnion({
					id: coin.id,
					name: coin.name,
					image: coin.image,
					rank: coin.market_cap_rank,
					symbol: coin.symbol,
				}),
			});
		} else {
			alert('Please sign in to save a coin to your watch list.');
		}
	};

	return (
		<div className="rounded-bottom-div text-center mb-8 pb-6 max-h-[850px] overflow-auto scrollbar">
			{coinsLoading && (
				<div className="w-full flex items-center justify-center">
					<p className="text-3xl font-bold">Loading...</p>
				</div>
			)}
			{!coinsLoading && coinsError && (
				<div className="w-full flex items-center justify-center">
					<p className="text-3xl font-bold text-red-700">
						{coinsError.message}
					</p>
				</div>
			)}

			{!coinsLoading && !coinsError && filteredCoins && (
				<table className="w-full">
					<thead>
						<tr className="border-b">
							<th></th>
							<th className="px-4">#</th>
							<th className="text-left">Coin</th>
							<th></th>
							<th>Price</th>
							<th>24h</th>
							<th className="hidden md:table-cell">24h Volume</th>
							<th className="hidden sm:table-cell">Mkt</th>
							<th>Last 7 days</th>
						</tr>
					</thead>

					<tbody>
						{filteredCoins.map((coin) => (
							<CoinItem key={coin.id} coin={coin} saveCoin={saveCoin} />
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default CoinsTable;
