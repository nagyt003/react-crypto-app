import { HiSun, HiMoon } from 'react-icons/hi';
import { Fragment, useContext } from 'react';
import { ThemeContext } from '../../contexts/theme/theme.context';

const ThemeToggler = () => {
	const { theme, setTheme } = useContext(ThemeContext);
	return (
		<div className="p-2">
			<div
				className="flex items-center cursor-pointer "
				onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
			>
				{theme === 'dark' ? (
					<Fragment>
						<HiSun className="text-primary text-2xl mr-2" />
						Light Mode
					</Fragment>
				) : (
					<Fragment>
						<HiMoon className="text-primary text-2xl mr-2" />
						Dark Mode
					</Fragment>
				)}
			</div>
		</div>
	);
};

export default ThemeToggler;
