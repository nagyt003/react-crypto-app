import { Fragment, useState } from 'react';
import { AiOutlineLock, AiOutlineMail } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { signInAuthUserWithEmailAndPassword } from '../firebase/firebase';

const defaultFormFields = {
	email: '',
	password: '',
};

const SignIn = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const [error, setError] = useState('');
	const { email, password } = formFields;

	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const { user } = await signInAuthUserWithEmailAndPassword(
				email,
				password
			);

			navigate('/account');

			// Reset the form fields
			resetFormFields(defaultFormFields);
		} catch (error) {
			switch (error.code) {
				case 'auth/user-not-found':
					setError('Invalid email or password');
					break;
				case 'auth/wrong-password':
					setError('Invalid email or password');
					break;
				default:
					setError(error.message);
			}
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormFields({
			...formFields,
			[name]: value,
		});
	};

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	return (
		<Fragment>
			<div className="max-w-[400px] mx-auto min-h-[600px] px-4 py-20">
				<div className="rounded-div p-6">
					<h1 className="text-2xl font-bold">Sign In</h1>
					{error && <p className="bg-red-300 p-3 my-2">{error}</p>}
					<form onSubmit={handleSubmit}>
						<div className="my-4">
							<label htmlFor="email">Email</label>
							<div className="my-2 w-full relative rounded-2xl shadow-xl">
								<input
									className="w-full p-2 bg-primary border border-input rounded-2xl"
									type="email"
									name="email"
									id="email"
									value={email}
									onChange={handleChange}
									required
								/>
								<AiOutlineMail className="absolute right-2 top-3 text-gray-500" />
							</div>
						</div>
						<div className="my-4">
							<label htmlFor="password">Password</label>
							<div className="my-2 w-full relative rounded-2xl shadow-xl">
								<input
									className="w-full p-2 bg-primary border border-input rounded-2xl"
									type="password"
									name="password"
									id="password"
									value={password}
									onChange={handleChange}
									required
								/>
								<AiOutlineLock className="absolute right-2 top-3 text-gray-500" />
							</div>
						</div>
						<button
							type="submit"
							className="w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl"
						>
							Sign In
						</button>
					</form>
					<p className="my-4">
						Don't have an account?{' '}
						<Link to="/sign-up" className="text-accent">
							Sign Up
						</Link>
					</p>
				</div>
			</div>
		</Fragment>
	);
};

export default SignIn;
