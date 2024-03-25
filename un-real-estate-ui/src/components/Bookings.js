import React, { useEffect, useState } from 'react';
import './Bookings.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Bookings() {
	const { agentId } = useParams();
	const navigate = useNavigate();

	const [openBookings, setOpenBookings] = useState(null);
	const [closedBookings, setClosedBookings] = useState(null);

	useEffect(() => {
		(async () => {
			let res = await axios.get('/users/agents/' + agentId);
			setOpenBookings(
				res.data.agentBookings.filter((item) => item.status === 'Reserved')
			);
			setClosedBookings(
				res.data.agentBookings.filter(
					(item) => item.status?.toLowerCase() === 'booked'
				)
			);
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

	return (
		<div className='container my-5'>
			<h3>
				<span className='accent-color'>Open</span> Bookings
			</h3>
			<hr />
			<div className='row'>
				{openBookings?.length > 0 ? (
					openBookings.map((item) => (
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
								</div>
							</div>
						</div>
					))
				) : (
					<div className='noProperty'>
						<h4>No Open Bookings Found</h4>
					</div>
				)}
			</div>
			<h3 className='mt-5'>
				<span className='accent-color'>Closed</span> Bookings
			</h3>
			<hr />
			<div className='row'>
				{closedBookings?.length > 0 ? (
					closedBookings.map((item) => (
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
								</div>
							</div>
						</div>
					))
				) : (
					<div className='noProperty'>
						<h4>No Closed Bookings Found</h4>
					</div>
				)}
			</div>
		</div>
	);
}

export default Bookings;
