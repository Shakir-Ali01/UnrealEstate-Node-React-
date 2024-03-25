import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Search.css';

function Search() {
	const navigate = useNavigate();

	const [data, setData] = useState(null);
	const [cityFilter, setCityFilter] = useState('');

	let sessionUser = {};
	let sessionLoggedIn = sessionStorage.getItem('sessionLoggedIn');
	if (sessionLoggedIn === 'true') {
		sessionUser = JSON.parse(sessionStorage.getItem('sessionUser'));
	}
	useEffect(() => {
		(async () => {
			let response = await axios.get('/properties');
			console.log(response.data);
			console.log(sessionUser);
			setData(response.data);
		})();
		// eslint-disable-next-line
	}, []);

	const openProperty = (e) => {
		let id = null;
		if (e.target.parentNode.id) {
			id = e.target.parentNode.id;
		} else {
			id = e.target.parentNode.parentNode.id;
		}
		navigate('/properties/' + id);
	};

	const filteredData = data
		? data.filter((item) =>
				item?.address?.city?.toLowerCase().includes(cityFilter?.toLowerCase())
		  )
		: [];

	return (
		<>
			<div className='container my-5'>
				<div className='row'>
					<div className='col-md-8'>
						<h2 className='m-0'>
							<span className='accent-color'>Search</span> a Property
						</h2>
					</div>
					<div className='col-md-4'>
						<input
							type='text'
							className='form-control'
							placeholder='Filter by City'
							value={cityFilter}
							onChange={(e) => setCityFilter(e.target.value)}
							id='filterCityInput'
							style={{ color: 'white' }}
						/>
					</div>
				</div>
				<hr />
				<div className='row mt-2'>
					<div className='col'>
						{cityFilter && (
							<p className='text-secondary'>Filtering by City: {cityFilter}</p>
						)}
					</div>
				</div>
				<div className='row'>
					{filteredData.length > 0 ? (
						filteredData.map((item) => (
							<div className='col-md-3 col-6 g-4' key={item._id}>
								<div
									className='card'
									id={item._id}
									onClick={(e) => openProperty(e)}>
									<img
										src={
											sessionUser?.role?.toLowerCase() === 'tenant' &&
											sessionUser._id === item.tenant?._id
												? `booked_property.jpeg`
												: sessionUser?.role?.toLowerCase() === 'owner' &&
												  sessionUser._id === item.owner._id
												? `posted_property.jpeg`
												: `placeholder_property.jpeg`
										}
										className='card-img-top'
										alt='property'
									/>
									<div className='card-body'>
										<h5 className='card-title'>{item.title} </h5>
										<p className='card-text m-0 text-secondary'>
											City: {item.address.city}
										</p>
										<p className='card-text m-0 text-secondary'>
											Rent: ₹ {item.rent}
										</p>
									</div>
								</div>
							</div>
						))
					) : (
						<p>Loading Properties...</p>
					)}
				</div>
			</div>
		</>
	);
}

export default Search;
