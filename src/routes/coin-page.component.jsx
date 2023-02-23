import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import DOMPurify from 'dompurify';
import useAxiosFetch from '../hooks/axios/useAxiosFetch';

const CoinPage = () => {
	const { coinId } = useParams();
	const {
		data: coinData,
		error: coinError,
		loading: coinLoading,
	} = useAxiosFetch(
		`/coins/${coinId}?localization=false&sparkline=true`,
		'GET',
		{}
	);

	return (
		<Fragment>
			{coinLoading && (
				<div className="h-[calc(100vh-5rem)] w-full flex items-center justify-center">
					<p className="text-3xl font-bold">Loading...</p>
				</div>
			)}
			{!coinLoading && coinError && (
				<div className="h-[calc(100vh-5rem)] w-full flex items-center justify-center">
					<p className="text-3xl font-bold text-red-700">{coinError.message}</p>
				</div>
			)}
			{!coinLoading && !coinError && coinData && (
				<div className="rounded-div my-12 py-4">
					<div className="flex items-center py-8">
						<img
							className="w-28 mr-8"
							src={coinData.image?.large}
							alt={coinData.id}
						/>
						<div>
							<p className="text-3xl font-bold">{coinData?.name} price</p>
							<p>({coinData.symbol?.toUpperCase()} / USD)</p>
						</div>
					</div>

					<section className="grid md:grid-cols-2 py-4 gap-8">
						<div>
							<div className="flex justify-between">
								{coinData.market_data?.current_price && (
									<p className="text-3xl font-bold">
										${coinData.market_data.current_price.usd.toLocaleString()}
									</p>
								)}
								<p className="text-xl">7 Day</p>
							</div>
							<Sparklines data={coinData.market_data?.sparkline_7d.price}>
								<SparklinesLine color="teal" />
							</Sparklines>

							<div className="flex justify-between py-4">
								<div>
									<p className="text-gray-500 text-sm">Market Cap</p>
									{coinData.market_data?.market_cap && (
										<p>
											${coinData.market_data.market_cap.usd.toLocaleString()}
										</p>
									)}
								</div>
								<div>
									<p className="text-gray-500 text-sm">Volume (24h)</p>
									{coinData.market_data?.market_cap && (
										<p>
											${coinData.market_data.total_volume.usd.toLocaleString()}
										</p>
									)}
								</div>
							</div>

							<div className="flex justify-between">
								<div>
									<p className="text-gray-500 text-sm">24h High</p>
									{coinData.market_data?.high_24h && (
										<p>${coinData.market_data.high_24h.usd.toLocaleString()}</p>
									)}
								</div>
								<div>
									<p className="text-gray-500 text-sm">24h Low</p>
									{coinData.market_data?.low_24h && (
										<p>${coinData.market_data.low_24h.usd.toLocaleString()}</p>
									)}
								</div>
							</div>
						</div>

						<div>
							<p className="text-xl font-bold pb-4">Market Stats</p>
							<div className="grid grid-cols-3 gap-y-8 gap-x-1">
								<div>
									<p className="text-gray-500 text-sm">Market Rank</p>
									{coinData.market_cap_rank}
								</div>
								<div>
									<p className="text-gray-500 text-sm">Hashing Algorithm</p>
									{coinData.hashing_algorithm && (
										<p>{coinData.hashing_algorithm}</p>
									)}
								</div>
								<div>
									<p className="text-gray-500 text-sm">Trust Score</p>
									{coinData.tickers && (
										<p>{coinData.liquidity_score.toFixed(2)}</p>
									)}
								</div>
								<div>
									<p className="text-gray-500 text-sm">Price Change (24h)</p>
									{coinData.market_data && (
										<p>
											{coinData.market_data.price_change_percentage_24h.toFixed(
												2
											)}
											%
										</p>
									)}
								</div>
								<div>
									<p className="text-gray-500 text-sm">Price Change (7d)</p>
									{coinData.market_data && (
										<p>
											{coinData.market_data.price_change_percentage_7d.toFixed(
												2
											)}
											%
										</p>
									)}
								</div>
								<div>
									<p className="text-gray-500 text-sm">Price Change (14d)</p>
									{coinData.market_data && (
										<p>
											{coinData.market_data.price_change_percentage_14d.toFixed(
												2
											)}
											%
										</p>
									)}
								</div>
								<div>
									<p className="text-gray-500 text-sm">Price Change (30d)</p>
									{coinData.market_data && (
										<p>
											{coinData.market_data.price_change_percentage_30d.toFixed(
												2
											)}
											%
										</p>
									)}
								</div>
								<div>
									<p className="text-gray-500 text-sm">Price Change (60d)</p>
									{coinData.market_data && (
										<p>
											{coinData.market_data.price_change_percentage_60d.toFixed(
												2
											)}
											%
										</p>
									)}
								</div>
								<div>
									<p className="text-gray-500 text-sm">Price Change (1y)</p>
									{coinData.market_data && (
										<p>
											{coinData.market_data.price_change_percentage_1y.toFixed(
												2
											)}
											%
										</p>
									)}
								</div>
							</div>
						</div>
					</section>
					<section className="py-4">
						<p className="text-xl font-bold">About {coinData.name}</p>
						<p
							dangerouslySetInnerHTML={{
								__html: DOMPurify.sanitize(
									coinData.description && coinData.description.en
								),
							}}
						></p>
					</section>
				</div>
			)}
		</Fragment>
	);
};

export default CoinPage;
