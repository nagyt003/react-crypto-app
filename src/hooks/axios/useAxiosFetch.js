import { api } from '../../api/coin-api';
import { useState, useEffect, useRef } from 'react';

const useAxiosFetch = (url, method, payload) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(true);

	const controllerRef = useRef(new AbortController());
	const cancel = () => {
		controllerRef.current.abort();
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.request({
					data: payload,
					signal: controllerRef.current.signal,
					method,
					url,
				});
				console.log(response.data);
				setData(response.data);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return { cancel, data, error, loading };
};

export default useAxiosFetch;
