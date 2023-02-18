import { createContext, useState, useEffect } from 'react';
import useAxiosFetch from '../../hooks/axios/useAxiosFetch';

export const CoinContext = createContext(null);

export const CoinProvider = ({ children }) => {
	const [coins, setCoins] = useState([]);
	const [searchText, setSearchText] = useState('');
	const [searchResults, setSearchResults] = useState([]);

	const { data, error, loading } = useAxiosFetch(
		'/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true',
		'GET',
		{}
	);

	useEffect(() => {
		setCoins(data);
	}, [data]);

	useEffect(() => {
		if (coins) {
			const filteredCoins = coins.filter((coin) =>
				coin.name.toLowerCase().includes(searchText.toLowerCase())
			);
			setSearchResults(filteredCoins);
		}
	}, [coins, searchText]);

	return (
		<CoinContext.Provider
			value={{ searchText, setSearchText, searchResults, error, loading }}
		>
			{children}
		</CoinContext.Provider>
	);
};
