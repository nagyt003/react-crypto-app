import { useContext } from 'react';
import { CoinContext } from '../../contexts/coin/coin.context';
import CoinItem from '../coin-item/coin-item.component';

const CoinsTable = () => {
	const { searchResults, error, loading } = useContext(CoinContext);
	console.log(searchResults);
	return (
		<div className="rounded-bottom-div text-center">
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
					{!loading &&
						!error &&
						searchResults &&
						searchResults.map((coin) => <CoinItem key={coin.id} coin={coin} />)}
				</tbody>
			</table>
		</div>
	);
};

export default CoinsTable;
