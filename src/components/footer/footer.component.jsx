import React from 'react';

const Footer = () => {
	return (
		<div>
			<p className="text-center py-4">
				Powered by{' '}
				<a
					className="font-bold"
					target="_blank"
					rel="noopener noreferrer"
					href="https://www.coingecko.com/"
				>
					Coin Gecko
				</a>
			</p>
		</div>
	);
};

export default Footer;
