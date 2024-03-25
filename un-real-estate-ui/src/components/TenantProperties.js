import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { BsFillTrashFill } from 'react-icons/bs';
import './TenantProperties.css';

function TenantProperties() {
	const navigate = useNavigate();
	const { tenantId } = useParams();

	const [requested, setRequested] = useState(null);
	const [rented, setRented] = useState(null);

	useEffect(() => {
		(async () => {
			let response = await axios.get('/users/' + tenantId);
			setRented(
				response.data.propertiesRented.filter(
					(item) => item.status === 'Booked'
				)
			);
			setRequested(
				response.data.propertiesRented.filter(
					(item) => item.status === 'Reserved'
				)
			);
		})();
	}, [tenantId]);

	const openProperty = (e) => {
		let id = null;
		if (e.target.parentNode.id) {
			id = e.target.parentNode.id;
		} else {
			id = e.target.parentNode.parentNode.id;
		}
		navigate('/properties/' + id);
	};

	const handleCancel = async (propId, agentId) => {
		let response = await axios.put(
			`/properties/${propId}?tenantId=${tenantId}&agentId=${agentId}`,
			{
				action: 'user cancelled booking',
			}
		);
		console.log(response.data);
		navigate(`/tenant-properties/${tenantId}`);
	};
	const handleCancelReq = async (propId, agentId) => {
		let response = await axios.put(
			`/properties/${propId}?tenantId=${tenantId}&agentId=${agentId}`,
			{
				action: 'user cancelled request',
			}
		);
		console.log(response.data);
		navigate(`/tenant-properties/${tenantId}`);
	};

	return (
		<>
			<div className='container my-5'>
				{/* {requested?.length === 0 && rented?.length === 0 ? (
					<h3>☹️ No Property found.</h3>
				) : (
					``
				)} */}
				{requested && (
					<>
						<h3>
							<span className='accent-color'>Requested</span> Properties
						</h3>
						<hr />
						<div className='row'>
							{requested?.length > 0 ? (
								requested.map((item) => (
									<div className='col-md-3 col-6 g-4' key={item._id}>
										<div
											className='card'
											id={item._id}
											onClick={(e) => openProperty(e)}>
											<img
												src='/placeholder_property.jpeg'
												className='card-img-top'
												alt='property'
											/>
											<br />
											<div className='cardbody'>
												<h5 className='card-title mt-0'>{item.title}</h5>
												<p className='card-text m-0 text-secondary mb-0'>
													City: {item.address.city}
												</p>
												<div
													style={{
														display: 'flex',
														justifyContent: 'space-between',
														alignItems: 'center',
														marginTop: '-2em',
													}}>
													<button
														className='btn'
														onClick={() =>
															handleCancelReq(item._id, item.agent)
														}>
														Cancel Request &nbsp;
														<BsFillTrashFill style={{ marginBottom: '2px' }} />
													</button>
												</div>
											</div>
										</div>
									</div>
								))
							) : (
								<div className='noProperty'>
									<h3>☹️ No Requests found.</h3>
								</div>
							)}
						</div>
					</>
				)}
				{rented && (
					<>
						<h3 className='mt-5'>
							<span className='accent-color'>Rented</span> Properties
						</h3>
						<hr />
						<div className='row'>
							{rented?.length > 0 ? (
								rented.map((item) => (
									<div className='col-md-3 col-6 g-4' key={item._id}>
										<div
											className='card'
											id={item._id}
											onClick={(e) => openProperty(e)}>
											<img
												src='/placeholder_property.jpeg'
												className='card-img-top'
												alt='property'
											/>
											<br />
											<div className='cardbody'>
												<h5 className='card-title mt-0'>{item.title}</h5>
												<p className='card-text m-0 text-secondary mb-0'>
													City: {item.address.city}
												</p>
												<div
													style={{
														display: 'flex',
														justifyContent: 'space-between',
														alignItems: 'center',
														marginTop: '-2em',
													}}>
													<button
														className='btn'
														onClick={() => handleCancel(item._id, item.agent)}>
														Cancel Booking &nbsp;
														<BsFillTrashFill style={{ marginBottom: '2px' }} />
													</button>
												</div>
											</div>
										</div>
									</div>
								))
							) : (
								<div className='noProperty'>
									<h3>☹️ No Property found.</h3>
								</div>
							)}
						</div>
					</>
				)}
			</div>
		</>
	);
}

export default TenantProperties;
