import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Navbar.css';
import { logoutUser } from '../redux/features/user/userSlice';

function Navbar() {
	//set and reset collapsed value
	const [isCollapsed, setIsCollapsed] = useState(true);
	const toggleCollapse = () => {
		setIsCollapsed(!isCollapsed);
	};
	// redux interactions
	const dispatch = useDispatch();

	const navigate = useNavigate();

	let sessionUser = {};
	if (sessionStorage.getItem('sessionLoggedIn') === 'true') {
		sessionUser = JSON.parse(sessionStorage.getItem('sessionUser'));
	}

	const handleLogout = async (e) => {
		try {
			sessionStorage.removeItem('sessionLoggedIn');
			sessionStorage.removeItem('sessionUser');
			await dispatch(logoutUser());
			navigate('/');
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<nav className='navbar navbar-dark  navbar-expand-sm' id='bg-color'>
				<div className='container desktopView'>
					<Link className='navbar-brand nav-brand-text' to='/'>
						<span className='accent-color'>UnReal</span> Estate
					</Link>

					<ul className='navbar-nav ml-auto '>
						{/* render user name, my profile, and log out navs if someone is logged in */}
						{sessionStorage.getItem('sessionLoggedIn') === 'true' ? (
							<>
								<li className='nav-item mx-2'>
									<span className='nav-link'>
										Welcome{' '}
										<span className='accent-color'>{sessionUser.name}</span>!
									</span>
								</li>
								<li className='nav-item mx-2'>
									<Link
										className='nav-link'
										to={`/my-profile/${sessionUser._id}`}>
										My Profile
									</Link>
								</li>
								<li className='nav-item mx-2'>
									<Link className='nav-link' onClick={handleLogout}>
										Log Out
									</Link>
								</li>
							</>
						) : (
							// render search, signup, and login if no one is logged in
							<>
								<li className='nav-item mx-2'>
									<Link className='nav-link' id='searchNav' to='/search'>
										Search
									</Link>
								</li>
								<li className='nav-item mx-2'>
									<Link className='nav-link' id='registerNav' to='/register'>
										Sign Up
									</Link>
								</li>
								<li className='nav-item mx-2'>
									<Link className='nav-link' id='loginNav' to='/login'>
										Log In
									</Link>
								</li>
							</>
						)}
					</ul>
				</div>
				<div className='container moblieView'>
					<Link className='navbar-brand nav-brand-text' to='/'>
						<span className='accent-color'>UnReal</span> Estate
					</Link>
					<button onClick={toggleCollapse} className='togglerBtn'>
						<span className='navbar-toggler-icon'></span>
					</button>
					<div className='toggleContent'>
						{isCollapsed ? null : (
							<ul className='navbar-nav ml-auto '>
								{/* render user name, my profile, and log out navs if someone is logged in */}
								{sessionStorage.getItem('sessionLoggedIn') === 'true' ? (
									<>
										<li className='nav-item mx-2'>
											<span className='nav-link'>
												Welcome{' '}
												<span className='accent-color'>{sessionUser.name}</span>
												!
											</span>
										</li>
										<li className='nav-item mx-2'>
											<Link
												className='nav-link'
												to={`/my-profile/${sessionUser._id}`}>
												My Profile
											</Link>
										</li>
										<li className='nav-item mx-2'>
											<Link className='nav-link' onClick={handleLogout}>
												Log Out
											</Link>
										</li>
									</>
								) : (
									// render search, signup, and login if no one is logged in
									<>
										<li className='nav-item mx-2'>
											<Link className='nav-link' id='searchNav' to='/search'>
												Search
											</Link>
										</li>
										<li className='nav-item mx-2'>
											<Link
												className='nav-link'
												id='registerNav'
												to='/register'>
												Sign Up
											</Link>
										</li>
										<li className='nav-item mx-2'>
											<Link className='nav-link' id='loginNav' to='/login'>
												Log In
											</Link>
										</li>
									</>
								)}
							</ul>
						)}
					</div>
				</div>
			</nav>
		</>
	);
}

export default Navbar;
