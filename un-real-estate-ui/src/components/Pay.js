import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './Pay.css';
import { Link, useNavigate } from 'react-router-dom';

function Pay() {
	// this comment is just for testing
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	const monthsRef = useRef();

	// session user data
	let sessionUser = {};
	let sessionLoggedIn = sessionStorage.getItem('sessionLoggedIn');
	if (sessionLoggedIn === 'true') {
		sessionUser = JSON.parse(sessionStorage.getItem('sessionUser'));
	}

	const navigate = useNavigate();

	const [dueDateReached, setDueDateReached] = useState(null);
	const [rentPaid, setRentPaid] = useState(null);
	const [showAlert, setShowAlert] = useState(null);

	useEffect(() => {
		(async () => {
			let response = await axios.get(
				'/properties/rentDue?tenantId=' + sessionUser._id
			);
			setDueDateReached(
				response.data.filter((item) => new Date(item.dueDate) < new Date())
			);
			setRentPaid(
				response.data.filter((item) => new Date(item.dueDate) >= new Date())
			);
		})();
		// eslint-disable-next-line
	}, []);

	const handlePay = async (propId) => {
		console.log(`${propId} pay clicked`);
		let response = await axios.put(
			`/properties/${propId}?months=${monthsRef.current.value}`,
			{
				action: 'due date changed',
			}
		);
		setShowAlert(true);
		console.log(response.data);
		setTimeout(() => {
			navigate(0);
		}, 1000);
	};

	return (
		<div className='container my-5'>
			{showAlert && (
				<div class='alert alert-success'>
					<strong>Success!</strong> Rent Paid. Refreshing data...
				</div>
			)}
			{dueDateReached?.length === 0 && rentPaid?.length === 0 && (
				<>
					<h3>
						Start <span className='accent-color'>Exploring</span> Properties
					</h3>
					<hr />
					<h4>
						<p>You have not rented any properties right now!</p>
						<p>
							The properties you have rented will be shown here with their due
							dates for easy payments.
						</p>
					</h4>
					<br />
					<p>
						You can follow the below link to view all the available properties
					</p>
					<Link className='searchLink' to='/search'>
						{`>`} <span className='accent-color'>Search</span> Properties
					</Link>
				</>
			)}
			{dueDateReached?.length > 0 && (
				<>
					<h3 className=''>
						Rent <span className='accent-color'>Due</span>
					</h3>
					<hr />
				</>
			)}
			<div className='row mb-5'>
				{console.log(dueDateReached)}
				{dueDateReached ? (
					dueDateReached.map((item) => {
						return (
							<div className='col-md-3 g-4' key={item._id}>
								<div className='card' id={item._id}>
									<img
										src='/placeholder_property.jpeg'
										className='card-img-top'
										alt='property'
									/>
									<div className='card-body'>
										<h5 className='card-title'>{item.title}</h5>
										<p className='card-text m-0 text-secondary'>
											City: {item.address.city}
										</p>
										<p className='card-text m-0 text-secondary'>
											Rent: ₹ {item.rent}
										</p>
										<p className='card-text m-0 text-secondary'>
											Due Date: {new Date(item.dueDate).getDate()}{' '}
											{monthNames[new Date(item.dueDate).getMonth()]}{' '}
											{new Date(item.dueDate).getFullYear()}
										</p>
										<select ref={monthsRef} className='form-select'>
											<option selected value='1'>
												1 Month
											</option>
											<option value='2'>2 Month</option>
											<option value='3'>3 Month</option>
											<option value='6'>6 Month</option>
										</select>
										<button
											className='btn mt-2'
											onClick={() => handlePay(item._id)}>
											Pay Rent
										</button>
									</div>
								</div>
							</div>
						);
					})
				) : (
					<div className='noProperty'>
						<h1>☹️ No Property found.</h1>
					</div>
				)}
			</div>
			{rentPaid?.length > 0 && (
				<>
					<h3>
						Rent <span className='accent-color'>Paid</span>
					</h3>
					<hr />
				</>
			)}
			<div className='row'>
				{rentPaid ? (
					rentPaid.map((item) => {
						return (
							<div className='col-md-3 g-4' key={item._id}>
								<div className='card' id={item._id}>
									<img
										src='placeholder_property.jpeg'
										className='card-img-top'
										alt='property'
									/>
									<div className='card-body'>
										<h5 className='card-title'>{item.title}</h5>
										<p className='card-text m-0 text-secondary'>
											City: {item.address.city}
										</p>
										<p className='card-text m-0 text-secondary'>
											Rent: ₹ {item.rent}
										</p>
										<p className='card-text m-0 text-secondary'>
											Due Date: {new Date(item.dueDate).getDate()}{' '}
											{monthNames[new Date(item.dueDate).getMonth()]}{' '}
											{new Date(item.dueDate).getFullYear()}
										</p>
									</div>
								</div>
							</div>
						);
					})
				) : (
					<div className='noProperty'>
						<h1>☹️ No Property found.</h1>
					</div>
				)}
			</div>
		</div>
	);
}

export default Pay;
