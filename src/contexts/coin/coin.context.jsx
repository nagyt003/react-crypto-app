import { createContext, useState, useEffect } from 'react';
import useAxiosFetch from '../../hooks/axios/useAxiosFetch';

export const CoinContext = createContext(null);

export const CoinProvider = ({ children }) => {
	const [coins, setCoins] = useState([]);
	const [searchField, setSearchField] = useState('');
	const [filteredCoins, setFilteredCoins] = useState([]);
	const [trendingCoins, setTrendingCoins] = useState([]);

	const {
		data: coinsData,
		error: coinsError,
		loading: coinsLoading,
	} = useAxiosFetch(
		'/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true',
		'GET',
		{}
	);

	const {
		data: trendingData,
		error: trendingError,
		loading: trendingLoading,
	} = useAxiosFetch('/search/trending', 'GET', {});

	useEffect(() => {
		if (coinsData) setCoins(coinsData);
	}, [coinsData]);

	useEffect(() => {
		if (coins) {
			const newFilteredCoins = coins.filter((coin) => {
				return coin.name.toLowerCase().includes(searchField.toLowerCase());
			});
			setFilteredCoins(newFilteredCoins);
		}
	}, [coins, searchField]);

	useEffect(() => {
		if (trendingData) setTrendingCoins(trendingData);
		// eslint-disable-next-line
	}, [trendingData]);

	return (
		<CoinContext.Provider
			value={{
				searchField,
				setSearchField,
				filteredCoins,
				coinsError,
				coinsLoading,
				trendingCoins,
				trendingError,
				trendingLoading,
			}}
		>
			{children}
		</CoinContext.Provider>
	);
};
