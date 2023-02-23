import { useContext } from 'react';
import { CoinContext } from '../../contexts/coin/coin.context';

const CoinSearch = () => {
	const { searchField, setSearchField } = useContext(CoinContext);

	return (
		<div className="rounded-top-div mt-4">
			<div className="flex flex-col md:flex-row justify-between pt-4 pb-6 text-center md:text-right">
				<h1 className="text-2xl font-bold my-2">Search Crypto</h1>
				<form onSubmit={(e) => e.preventDefault()}>
					<input
						className="w-full bg-primary border border-input px-4 py-2 rounded-2xl shadow-xl"
						type="text"
						placeholder="Search a coin"
						value={searchField}
						onChange={(e) => setSearchField(e.target.value)}
					/>
				</form>
			</div>
		</div>
	);
};

export default CoinSearch;
