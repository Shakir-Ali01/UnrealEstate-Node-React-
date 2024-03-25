import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Property.css';
import { BsFillTrashFill } from 'react-icons/bs';

function Property() {
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
	const { propId } = useParams();

	const navigate = useNavigate();
	const agentIdRef = useRef();
	const monthsRef = useRef();

	const [property, setProperty] = useState(null);
	const [agents, setAgents] = useState(null);
	const [agentSelected, setAgentSelected] = useState(true);
	// const [detailsVisible, setDetailsVisible] = useState("hide");

	let sessionUser = {};
	let userIsAgent = false;
	let userIsTenant = false;
	let userIsOwner = false;
	let sessionLoggedIn = sessionStorage.getItem('sessionLoggedIn');
	if (sessionLoggedIn === 'true') {
		sessionUser = JSON.parse(sessionStorage.getItem('sessionUser'));
		if (sessionUser.role.toLowerCase() === 'tenant') {
			userIsTenant = true;
		} else if (sessionUser.role.toLowerCase() === 'owner') {
			userIsOwner = true;
		} else {
			userIsAgent = true;
		}
	}

	useEffect(() => {
		axios
			.get('/properties/' + propId)
			.then((res) => {
				console.log(res.data);
				setProperty(res.data);
			})
			.catch((err) => {
				console.log('error');
			});
		axios
			.get('/users/agents')
			.then((res) => {
				console.log(res.data);
				setAgents(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [propId]);

	// Owner action button
	const handleDelete = async () => {
		try {
			let response = await axios.delete(
				`/properties/${propId}?ownerId=${sessionUser._id}`
			);
			console.log(response.data);
			navigate('/owner-properties/' + sessionUser._id);
		} catch (err) {
			console.log(err);
		}
	};

	// Tenant action buttons
	const bookProperty = () => {
		console.log(agentIdRef.current.value);
		axios
			.put(
				`/properties/${propId}?tenantId=${sessionUser._id}&agentId=${agentIdRef.current.value}&months=${monthsRef.current.value}`,
				{
					action: 'user requested booking',
				}
			)
			.then((res) => {
				console.log(res.data);
				navigate('/tenant-properties/' + sessionUser._id);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handlePay = async (propId) => {
		console.log(`${propId} pay clicked`);
		let response = await axios.put(`/properties/${propId}`, {
			action: 'due date changed',
		});
		// setShowAlert(true);
		console.log(response.data);
		navigate('/pay');
	};

	const handleCancelling = async () => {
		let response = await axios.put(
			`/properties/${property._id}?tenantId=${sessionUser._id}`,
			{
				action: 'user cancelled booking',
			}
		);
		console.log(response.data);
		navigate(`/tenant-properties/${sessionUser._id}`);
	};

	const confirmBooking = async (propId) => {
		let response = await axios.put(`/properties/${propId}`, {
			action: 'agent confirmed booking',
		});
		console.log(response.data);
		navigate(0);
	};

	return (
		<div className='container my-5'>
			<div className='row'>
				<div className='col-md-3'>
					<img
						className='landing-widget-img'
						src='/placeholder_property.jpeg'
						alt='login logo'
					/>
					{/* render delete button if role is owner */}
					{userIsOwner && sessionUser._id === property?.owner?._id ? (
						property?.tenant?._id === undefined ? (
							<button
								id='deleteBtn'
								className='btn btn-danger mt-2'
								onClick={handleDelete}>
								Delete Property
							</button>
						) : (
							<>
								<button
									id='deleteDisabledBtn'
									className='btn btn-danger mt-2'
									disabled>
									Occupied By Tenant
								</button>
							</>
						)
					) : (
						''
					)}
					{/* render pay rent and cancel booking buttons if role is tenant */}
					{userIsTenant &&
					property?.dueDate &&
					new Date(property?.dueDate) < new Date() ? (
						<>
							<button
								className='btn mt-2'
								onClick={() => handlePay(property?._id)}>
								Pay Rent
							</button>
							<button
								id='bookBtn'
								className='btn mt-2'
								onClick={handleCancelling}>
								Cancel Booking &nbsp;{' '}
								<BsFillTrashFill style={{ marginBottom: '2px' }} />
							</button>
						</>
					) : (
						''
					)}
					{/* render pay and book button if the property is available */}
					{userIsTenant && property?.tenant === undefined ? (
						sessionUser._id !== property?.tenant?._id ? (
							<>
								<select
									ref={agentIdRef}
									className='form-select'
									defaultValue={'-'}
									name='agent_name'
									id='agent_name'
									onChange={() => {
										setAgentSelected(false);
									}}>
									<option value='-' disabled>
										- Select Agent -
									</option>
									{agents?.map((item) => {
										return (
											<option key={item._id} value={item._id}>
												{item.name}
											</option>
										);
									})}
								</select>
								<select ref={monthsRef} className='form-select'>
									<option selected value='1'>
										1 Month
									</option>
									<option value='2'>2 Month</option>
									<option value='3'>3 Month</option>
									<option value='6'>6 Month</option>
								</select>
								{/* Render disabled button first until an agent is selected */}
								{!agentSelected ? (
									<button
										id='bookBtn'
										className='btn mt-2'
										onClick={bookProperty}>
										Book
									</button>
								) : (
									<button id='bookDisabledBtn' className='btn mt-2' disabled>
										Book
									</button>
								)}
							</>
						) : (
							<></>
						)
					) : (
						''
					)}
					{userIsAgent &&
					property?.agent === sessionUser._id &&
					property?.status.toLowerCase() !== 'booked' ? (
						<>
							<div className='mt-2 accent-color'>Tenant Details:</div>
							<div className='row'>
								<span className='detail-title'>Name: </span>
								<span className='detail-value'>{property.tenant.name}</span>
							</div>
							<div className='row'>
								<span className='detail-title'>Email: </span>
								<span className='detail-value'>{property.tenant.emailId}</span>
							</div>
							<div className='row'>
								<span className='detail-title'>Mobile: </span>
								<span className='detail-value'>{property.tenant.mobileNo}</span>
							</div>
							<button
								className='btn mt-2'
								onClick={() => {
									confirmBooking(property._id);
								}}>
								Confirm Booking
							</button>
						</>
					) : (
						``
					)}
				</div>
				{property && (
					<div className='col-md-9'>
						<h3 className='accent-color'>{property.title}</h3>
						<p>{property.description}</p>
						<div>
							<h4 className='accent-color'>Details</h4>
							<div className='row'>
								<span className='detail-title'>Status: </span>
								<span className='detail-value'>
									{property.status
										? property.status.charAt(0).toUpperCase() +
										  property.status.slice(1)
										: `Available`}
								</span>
							</div>
							<div className='row'>
								<span className='detail-title'>Area: </span>
								<span className='detail-value'>{property.area} Sq. Ft.</span>
							</div>
							<div className='row'>
								<span className='detail-title'>Rent: </span>
								<span className='detail-value'>₹ {property.rent} / month</span>
							</div>
							<div className='row'>
								<span className='detail-title'>Owner: </span>
								<span className='detail-value'>{property.owner.name}</span>
							</div>
							{userIsAgent && (
								<>
									<div className='row'>
										<span className='detail-title'>Contact:</span>
										<span className='detail-value'>
											{property.owner.mobileNo}
										</span>
									</div>
									<div className='row'>
										<span className='detail-title'>Email Id:</span>
										<span className='detail-value'>
											{property.owner.emailId}
										</span>
									</div>
								</>
							)}
							<div className='row'>
								<span className='detail-title'>Address: </span>
								<span className='detail-value'>
									{property.address.base}, {property.address.locality},{' '}
									{property.address.city}, {property.address.state} -{' '}
									{property.address.zip}
								</span>
							</div>
							<div className='row mb-2'>
								<span className='detail-title'>Posted On: </span>
								<span className='detail-value'>
									{new Date(property.createdAt).getDate()}{' '}
									{monthNames[new Date(property.createdAt).getMonth()]}{' '}
									{new Date(property.createdAt).getFullYear()}
								</span>
							</div>
						</div>
						<div>
							<h4 className='accent-color'>Amenities</h4>
							<div className='row'>
								{property.amenities.map((element) => (
									<span key={element} className='amenity-item col-md-3 m-1'>
										• &nbsp; {element}
									</span>
								))}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Property;

// dump
/* <button
                id="contactBtn"
                className="btn mt-2"
                onClick={showDetails}
              >
                Show Owner Details
              </button>
              {detailsVisible === "show" ? (
                <>
                  <p className="m-0 mt-2">
                    &#128222; {property && property.owner.mobileNo}
                  </p>
                  <p className="m-0">
                    &#128238; {property && property.owner.emailId}
                  </p>
                </>
              ) : (
                ""
              )} */
