const TrendingCoin = ({ coin }) => {
	return (
		<div className="rounded-div flex justify-between p-4 hover:scale-105 ease-in-out duration-300">
			<div className="flex w-full items-center justify-between">
				<div className="flex">
					<img
						className="mr-4 rounded-full"
						src={coin.item.small}
						alt={coin.item.id}
					/>
					<div>
						<p className="font-bold">{coin.item.name}</p>
						<p>{coin.item.symbol}</p>
					</div>
				</div>
				<div className="flex items-center">
					<img
						className="w-4 mr-2"
						src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
						alt="/"
					/>
					<p>{coin.item.price_btc.toFixed(7)}</p>
				</div>
			</div>
		</div>
	);
};

export default TrendingCoin;
