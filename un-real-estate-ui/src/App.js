import React from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

function App() {
	const navigate = useNavigate();

	let sessionUser = {};
	let sessionLoggedIn = sessionStorage.getItem('sessionLoggedIn');
	if (sessionLoggedIn === 'true') {
		sessionUser = JSON.parse(sessionStorage.getItem('sessionUser'));
	}

	const handleClick = (e) => {
		let path = e.target.parentNode.parentNode.id.split('-card')[0];
		navigate(`/${path}`);
	};

	return (
		<>
			<div className='container my-5'>
				<div className='jumbotron'>
					<h2>
						Welcome to <span className='accent-color'>Unreal</span> Estate!
					</h2>
				</div>
				<hr />
				<div className='row'>
					{/* Search card */}
					<div className='col-md-4 col-6 g-2 p-3'>
						<div
							id='search-card'
							className='card landing-cards'
							onClick={(e) => handleClick(e)}>
							<div className='card-img-top'>
								<img
									className='landing-widget-img'
									src='placeholder_property.jpeg'
									alt='placeholder'
								/>
							</div>
							<div className='card-body'>
								<h5 className='card-title'>Search a Property</h5>
								<p className='card-text m-0 text-secondary'>
									Search through a location from our collection of properties
									accross the country.
								</p>
							</div>
						</div>
					</div>
					{sessionLoggedIn !== 'true' ? (
						<>
							{/* Sign Up Card */}
							<div className='col-md-4 col-6 g-2 p-3'>
								<div
									id='register-card'
									className='card landing-cards'
									onClick={(e) => handleClick(e)}>
									<div className='card-img-top'>
										<img
											className='landing-widget-img'
											src='signup.png'
											alt='placeholder'
										/>
									</div>
									<div className='card-body'>
										<h5 className='card-title'>Sign Up</h5>
										<p className='card-text m-0 text-secondary'>
											Sign Up and become a member of our rapidly growing
											community.
										</p>
									</div>
								</div>
							</div>
							{/* Login Card */}
							<div className='col-md-4 col-6 g-2 p-3'>
								<div
									id='login-card'
									className='card landing-cards'
									onClick={(e) => handleClick(e)}>
									<div className='card-img-top'>
										<img
											className='landing-widget-img'
											src='login.png'
											alt='placeholder'
										/>
									</div>
									<div className='card-body'>
										<h5 className='card-title'>Login</h5>
										<p className='card-text m-0 text-secondary'>
											Login to browse, view, and post properties. And a whole
											lot more!
										</p>
									</div>
								</div>
							</div>
						</>
					) : sessionUser.role.toLowerCase() === 'tenant' ? (
						<>
							{/* View Property Card as Tenant */}
							<div className='col-md-4 col-6 g-2 p-3'>
								<div
									id={`tenant-properties/${sessionUser._id}-card`}
									className='card landing-cards'
									onClick={(e) => handleClick(e)}>
									<div className='card-img-top'>
										<img
											className='landing-widget-img'
											src='view_prop.jpeg'
											alt='placeholder'
										/>
									</div>
									<div className='card-body'>
										<h5 className='card-title'>View Properties</h5>
										<p className='card-text m-0 text-secondary'>
											View the list of all properties that you have rented
											through UnReal Estate.
										</p>
									</div>
								</div>
							</div>
							{/* Pay Rent Card as Tenant */}
							<div className='col-md-4 col-6 g-2 p-3'>
								<div
									id='pay-card'
									className='card landing-cards'
									onClick={(e) => handleClick(e)}>
									<div className='card-img-top'>
										<img
											className='landing-widget-img'
											src='rupees.png'
											alt='placeholder'
										/>
									</div>
									<div className='card-body'>
										<h5 className='card-title'>Pay Rent</h5>
										<p className='card-text m-0 text-secondary'>
											Now you can pay rent easily and swiftly thorugh our
											dashboard.
										</p>
									</div>
								</div>
							</div>
						</>
					) : sessionUser.role.toLowerCase() === 'owner' ? (
						<>
							{/* View Property Card as Owner */}
							<div className='col-md-4 col-6 g-2 p-3'>
								<div
									id={`owner-properties/${sessionUser._id}-card`}
									className='card landing-cards'
									onClick={(e) => handleClick(e)}>
									<div className='card-img-top'>
										<img
											className='landing-widget-img'
											src='view_prop.jpeg'
											alt='placeholder'
										/>
									</div>
									<div className='card-body'>
										<h5 className='card-title'>View Properties</h5>
										<p className='card-text m-0 text-secondary'>
											View the list of all properties that you have listed
											through UnReal Estate.
										</p>
									</div>
								</div>
							</div>
							{/* Post Property Card as Owner */}
							<div className='col-md-4 col-6 g-2 p-3'>
								<div
									id={`post-property/${sessionUser._id}-card`}
									className='card landing-cards'
									onClick={(e) => handleClick(e)}>
									<div className='card-img-top'>
										<img
											className='landing-widget-img'
											src='add_prop.jpeg'
											alt='placeholder'
										/>
									</div>
									<div className='card-body'>
										<h5 className='card-title'>Post Property</h5>
										<p className='card-text m-0 text-secondary'>
											You can post a property that you own to make it available
											to our community.
										</p>
									</div>
								</div>
							</div>
						</>
					) : sessionUser.role.toLowerCase() === 'agent' ? (
						<>
							{/* Open Booking Card as Agent */}
							<div className='col-md-4 col-6 g-2 p-3'>
								<div
									id={`bookings/${sessionUser._id}-card`}
									className='card landing-cards'
									onClick={(e) => handleClick(e)}>
									<div className='card-img-top'>
										<img
											className='landing-widget-img'
											src='view_prop.jpeg'
											alt='placeholder'
										/>
									</div>
									<div className='card-body'>
										<h5 className='card-title'>My Bookings</h5>
										<p className='card-text m-0 text-secondary'>
											View all you open and closed bookings now in one place.
										</p>
									</div>
								</div>
							</div>
						</>
					) : (
						<></>
					)}
				</div>
			</div>
		</>
	);
}

export default App;
