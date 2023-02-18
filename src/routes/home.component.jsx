import { Fragment } from 'react';
import CoinSearch from '../components/coin-search/coin-search.component';
import CoinsTable from '../components/coins-table/coins-table.component';
import TrendingCoins from '../components/trending-coins/trending-coins.component';

const Home = () => {
	return (
		<Fragment>
			<CoinSearch />
			<CoinsTable />
			<TrendingCoins />
		</Fragment>
	);
};

export default Home;
