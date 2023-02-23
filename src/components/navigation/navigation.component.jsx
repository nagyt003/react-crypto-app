import { Fragment, useState, useContext } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import ThemeToggler from '../theme-toggler/theme-toggler.component';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { AuthContext } from '../../contexts/auth/auth.context';
import { signOutUser } from '../../firebase/firebase';

const Navigation = () => {
	const [isNavOpen, setIsNavOpen] = useState(false);
	const { currentUser } = useContext(AuthContext);
	const navigate = useNavigate();

	const signOutHandler = async () => {
		await signOutUser();
		navigate('/sign-in');
	};

	const toggleNavHandler = () => {
		setIsNavOpen(!isNavOpen);
	};

	return (
		<Fragment>
			<nav className="sticky top-0 z-10 rounded-div flex items-center justify-between h-20 font-bold">
				<Link to="/">
					<h1 className="text-2xl">
						<span className="text-accent">Crypto</span>Verse
					</h1>
				</Link>
				<div className="hidden md:block">
					<ThemeToggler />
				</div>
				<div className="hidden md:block">
					{currentUser ? (
						<>
							<Link
								to="/account"
								onClick={toggleNavHandler}
								className="p-4 hover:text-accent"
							>
								Account
							</Link>
							<span
								onClick={signOutHandler}
								className="border px-6 py-2 rounded-2xl shadow-lg hover:shadow-2xl hover:text-accent cursor-pointer"
							>
								Sign Out
							</span>
						</>
					) : (
						<>
							<Link
								to="/sign-in"
								onClick={toggleNavHandler}
								className="p-4 hover:text-accent"
							>
								Sign In
							</Link>
							<Link
								to="/sign-up"
								onClick={toggleNavHandler}
								className="bg-button text-btnText px-5 py-2 ml-2 rounded-2xl shadow-lg transition-colors duration-300 hover:bg-buttonGlow"
							>
								Sign Up
							</Link>
						</>
					)}
				</div>

				<div
					onClick={toggleNavHandler}
					className="block md:hidden cursor-pointer z-10"
				>
					{isNavOpen ? (
						<AiOutlineClose size={25} />
					) : (
						<AiOutlineMenu size={25} />
					)}
				</div>

				<div
					className={`md:hidden fixed ${
						isNavOpen ? 'left-0' : 'left-[-100%]'
					} top-20 flex flex-col items-center justify-between w-[75%] h-[calc(100%-5rem)] bg-primary ease-in-out duration-300 z-10`}
				>
					<ul className="w-full p-4">
						<li className="border-b py-6">
							<Link to="/" onClick={toggleNavHandler}>
								Home
							</Link>
						</li>
						<li className="border-b py-6">
							<Link to="/account" onClick={toggleNavHandler}>
								Account
							</Link>
						</li>
						<li className="py-6">
							<ThemeToggler />
						</li>
					</ul>
					<ul className="flex flex-col w-full p-4">
						{currentUser ? (
							<button
								onClick={() => {
									signOutHandler();
									toggleNavHandler();
								}}
								className="w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl"
								type="button"
							>
								Sign Out
							</button>
						) : (
							<>
								<Link to="/sign-in" onClick={toggleNavHandler}>
									<button
										className="w-full my-2 p-3 bg-primary text-primary border border-secondary rounded-2xl shadow-xl"
										type="button"
									>
										Sign In
									</button>
								</Link>
								<Link to="/sign-up" onClick={toggleNavHandler}>
									<button
										className="w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl"
										type="button"
									>
										Sign Up
									</button>
								</Link>
							</>
						)}
					</ul>
				</div>
			</nav>
			<Outlet />
		</Fragment>
	);
};

export default Navigation;
