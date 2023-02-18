import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3/';

export const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});
