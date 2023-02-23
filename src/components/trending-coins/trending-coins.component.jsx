import { useContext } from 'react';
import { CoinContext } from '../../contexts/coin/coin.context';
import TrendingCoin from '../trending-coin/trending-coin.component';

const TrendingCoins = () => {
	const { trendingCoins, trendingError, trendingLoading } =
		useContext(CoinContext);

	return (
		<div className="rounded-div my-8 py-4 text-primary">
			<h1 className="text-2xl font-bold py-4">Trending Coins</h1>
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
				{trendingLoading && (
					<div className="w-full flex items-center justify-center">
						<p className="text-3xl font-bold">Loading...</p>
					</div>
				)}
				{!trendingLoading && trendingError && (
					<div className="w-full flex items-center justify-center">
						<p className="text-3xl font-bold text-red-700">
							{trendingError.message}
						</p>
					</div>
				)}
				{!trendingLoading &&
					!trendingError &&
					trendingCoins.coins?.map((coin) => (
						<TrendingCoin key={coin.item.id} coin={coin} />
					))}
			</div>
		</div>
	);
};

export default TrendingCoins;
