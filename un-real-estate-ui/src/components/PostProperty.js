import React from 'react';
import './PostProperty.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function PostProperty() {
	//state to hold the form post thst needs to be added when coach enters the values the state get updated
	//Get Id From url
	//   const location = useLocation(); //
	//   let urlElements = window.location.href.split('/');
	//
	//   const userName=urlElements[4];
	// console.log("/properties/"+userName);
	//console.log(location.pathname);
	let sessionUser = {};
	if (sessionStorage.getItem('sessionLoggedIn') === 'true') {
		sessionUser = JSON.parse(sessionStorage.getItem('sessionUser'));
	}
	const [post, setPost] = useState({
		title: '',
		area: '',
		amenities: [],
		rent: '',
		description: '',
		address: {
			base: '',
			locality: '',
			city: '',
			zip: '',
			state: '',
		},
	});

	//state to hold the individual validation errors of the form
	const [formErrors, setFormErrors] = useState({
		titleError: '',
		rentError: '',
		areaError: '',
		descriptionError: '',
		baseError: '',
		localityError: '',
		cityError: '',
		zipError: '',
		stateError: '',
	});
	//state variable to indicate wheater coach given values to all mandatory fileds of the form
	const [mandatory, setMandatory] = useState(false);
	const [errorMessage, setErrorMessage] = useState(false);
	const [valid, setValid] = useState(false);
	const [addPropertySuccessMsg, setaddPropertySuccessMsg] = useState(false);
	const navigate = useNavigate();
	//A collection of few messages that the component display
	const [messages] = useState({
		MANDATAROY: 'Enter All The Form Fields',
		ERROR: 'Something went Wrong',
		TITLEVALUE_ERROR: 'Title should have 3 to 50 characters',
		DESCRIPTIONVALUE_ERROR: 'Description should have 10 to 200 characters',
		BASEVALUE_ERROR: 'Should have 10 to 50 characters',
		AREAVALUE_ERROR: 'Only Digit Is Allowed',
		RENTVALUE_ERROR: 'Only Digit Is Allowed ',
		ZIPVALUE_ERROR: 'Should have 6 digits ',
		LOCALITYVALUE_ERROR: 'Locality should have 10 to 50 characters',
		CITYVALUE_ERROR: 'Only Characters Is Allowed',
		STATEVALUE_ERROR: 'Only Characters Is Allowed',
		ERROR_MESSAGE: 'Server Error Occured.Please Try Again',
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			post.title === '' ||
			post.rent === '' ||
			post.description === '' ||
			post.area === '' ||
			post.address.base === '' ||
			post.address.locality === '' ||
			post.address.zip === '' ||
			post.address.city === '' ||
			post.address.state === ''
		) {
			setMandatory(true);
		} else {
			(async () => {
				try {
					let result = await axios.post(
						'/properties/' + sessionUser.username,
						post
					);
					console.log(result);
					console.log(result.data);
					setaddPropertySuccessMsg(result.data);
					setTimeout(() => {
						navigate('/owner-properties/' + sessionUser._id);
					}, 3000);
				} catch (error) {
					setErrorMessage(true);
					console.log(error);
				}
			})();
		}
	};
	const handleAmenetiesChange = (event) => {
		// let { name, value } = event.target;
		// setPost({
		//   ...post,
		//   amenities: {
		//     ...post.amenities,
		//     [value]: !post.amenities[value],
		//   },
		// });
		const { value, checked } = event.target;
		if (checked) {
			setPost({
				...post,
				amenities: [...post.amenities, value],
			});
		} else {
			setPost({
				...post,
				amenities: [...post.amenities.filter((event) => event !== value)],
			});
		}
		console.log(post);
	};
	const handleAddressChange = (event) => {
		setValid(false);
		setMandatory(false);
		setErrorMessage(false);
		let { name, value } = event.target;
		setPost({
			...post,
			address: {
				...post.address,
				[name]: value,
			},
		});
		let errors = formErrors;
		let titleRegex = /^[a-zA-Z\s.]{3,50}$/;
		let descriptionRegex = /^[a-zA-Z\s-_.]{10,200}$/;
		let baseRegex = /^[a-zA-Z\s-.0-9]{10,50}$/;
		let localityRegex = /^[a-zA-Z\s-.0-9]{10,50}$/;
		let areaRegex = /^[0-9]+$/;
		let rentRegex = /^[0-9\b]+$/;
		let zipRegex = /^[0-9]{6}$/;
		let cityRegex = /^[A-Za-z]+$/;
		let stateRegex = /^[A-Za-z]+$/;
		switch (name) {
			case 'base':
				if (!baseRegex.test(value)) {
					errors.baseError = messages.BASEVALUE_ERROR;
				} else {
					errors.baseError = '';
				}
				break;
			case 'zip':
				if (!zipRegex.test(value)) {
					errors.zipError = messages.ZIPVALUE_ERROR;
				} else {
					errors.zipError = '';
				}
				break;
			case 'locality':
				if (!localityRegex.test(value)) {
					errors.localityError = messages.LOCALITYVALUE_ERROR;
				} else {
					errors.localityError = '';
				}
				break;
			case 'title':
				if (!titleRegex.test(value)) {
					errors.titleError = messages.TITLEVALUE_ERROR;
				} else {
					errors.titleError = '';
				}
				break;
			case 'description':
				if (!descriptionRegex.test(value)) {
					errors.descriptionError = messages.DESCRIPTIONVALUE_ERROR;
				} else {
					errors.descriptionError = '';
				}
				break;
			case 'area':
				if (!areaRegex.test(value)) {
					errors.areaError = messages.AREAVALUE_ERROR;
				} else {
					errors.areaError = '';
				}
				break;

			case 'rent':
				if (!rentRegex.test(value)) {
					errors.rentError = messages.RENTVALUE_ERROR;
				} else {
					errors.rentError = '';
				}
				break;
			case 'city':
				if (!cityRegex.test(value)) {
					errors.cityError = messages.CITYVALUE_ERROR;
				} else {
					errors.cityError = '';
				}
				break;
			case 'state':
				if (!stateRegex.test(value)) {
					errors.stateError = messages.STATEVALUE_ERROR;
				} else {
					errors.stateError = '';
				}
				break;
			default:
				break;
		}
		if (
			post.title === '' ||
			post.rent === '' ||
			post.description === '' ||
			post.area === '' ||
			post.address.base === '' ||
			post.address.locality === '' ||
			post.address.zip === '' ||
			post.address.city === '' ||
			post.address.state === ''
		) {
			setValid(false);
		} else {
			setValid(true);
		}
		console.log(post);
	};
	const handleChange = (event) => {
		setValid(false);
		setMandatory(false);
		setErrorMessage(false);
		let errors = formErrors;
		let titleRegex = /^[a-zA-Z\s.]{3,50}$/;
		let descriptionRegex = /^[a-zA-Z\s.]{10,200}$/;
		let baseRegex = /^[a-zA-Z\s.]{10,50}$/;
		let localityRegex = /^[a-zA-Z\s.]{10,50}$/;
		let areaRegex = /^[0-9]+$/;
		let rentRegex = /^[0-9\b]+$/;
		let zipRegex = /^[0-9]{6}$/;
		let { name, value } = event.target;
		setPost({ ...post, [name]: value });

		switch (name) {
			case 'base':
				if (!baseRegex.test(value)) {
					errors.baseError = messages.BASEVALUE_ERROR;
				} else {
					errors.baseError = '';
				}
				break;
			case 'zip':
				if (!zipRegex.test(value)) {
					errors.zipError = messages.ZIPVALUE_ERROR;
				} else {
					errors.zipError = '';
				}
				break;
			case 'locality':
				if (!localityRegex.test(value)) {
					errors.localityError = messages.LOCALITYVALUE_ERROR;
				} else {
					errors.localityError = '';
				}
				break;
			case 'title':
				if (!titleRegex.test(value)) {
					errors.titleError = messages.TITLEVALUE_ERROR;
				} else {
					errors.titleError = '';
				}
				break;
			case 'description':
				if (!descriptionRegex.test(value)) {
					errors.descriptionError = messages.DESCRIPTIONVALUE_ERROR;
				} else {
					errors.descriptionError = '';
				}
				break;
			case 'area':
				if (!areaRegex.test(value)) {
					errors.areaError = messages.AREAVALUE_ERROR;
				} else {
					errors.areaError = '';
				}
				break;

			case 'rent':
				if (!rentRegex.test(value)) {
					errors.rentError = messages.RENTVALUE_ERROR;
				} else {
					errors.rentError = '';
				}
				break;
			case 'city':
				if (value === '') {
					errors.cityError = messages.CITYVALUE_ERROR;
				} else {
					errors.cityError = '';
				}
				break;
			case 'state':
				if (value === '') {
					errors.stateError = messages.STATEVALUE_ERROR;
				} else {
					errors.stateError = '';
				}
				break;
			default:
				break;
		}
		setFormErrors(errors);
		if (
			post.title === '' ||
			post.rent === '' ||
			post.description === '' ||
			post.area === '' ||
			post.address.base === '' ||
			post.address.locality === '' ||
			post.address.zip === '' ||
			post.address.city === '' ||
			post.address.state === ''
		) {
			setValid(false);
		} else {
			setValid(true);
		}
	};
	return (
		<div className='container my-5'>
			<div className='row'>
				<div className='col-md-2'></div>
				<div className='col-md-8'>
					<form
						className='row mx-5 '
						onSubmit={(event) => {
							handleSubmit(event);
						}}>
						<h3>
							<span className='hColor'>Add</span> Property
						</h3>
						<div className='col-md-6 mb-4'>
							{/*<label htmlFor="description">Name</label> */}

							<input
								type='text'
								value={post.name}
								name='title'
								onChange={handleChange}
								placeholder='Enter Title Here'
							/>
							<span className='text-danger errorSize'>
								{formErrors.titleError ? messages.TITLEVALUE_ERROR : null}
							</span>
						</div>
						<div className='col-md-6'>
							{/*<label htmlFor="description">Email</label>*/}
							<input
								type='text'
								placeholder='Enter Area Here'
								name='area'
								value={post.area}
								onChange={handleChange}
							/>
							<span className='text-danger errorSize'>
								{formErrors.areaError ? messages.AREAVALUE_ERROR : null}
							</span>
						</div>
						<div className='col-md-6'>
							<input
								type='text'
								placeholder='Enter Rent Here'
								name='rent'
								value={post.rent}
								onChange={handleChange}
							/>
							<span className='text-danger errorSize'>
								{formErrors.rentError ? messages.RENTVALUE_ERROR : null}
							</span>
						</div>
						<div className='col-md-6 mb-4 text-area'>
							<textarea
								onChange={handleChange}
								value={post.description}
								placeholder='Enter description Here'
								name='description'
								id='description'></textarea>
							<span className='text-danger errorSize'>
								{formErrors.descriptionError
									? messages.DESCRIPTIONVALUE_ERROR
									: null}
							</span>
						</div>

						<div className='col-md-12 cntr'>
							<fieldset style={{ border: '2px solid white' }}>
								<legend className='legendStyle'>Amenities</legend>
								<div className='row'>
									<div className='col-md-6'>
										<label htmlFor='amenities' className='lpadding'>
											Internet & office
										</label>
										<div className='check'>
											<label class='container-C '>
												Wi-fi
												<input
													type='checkbox'
													name='amenities'
													value='Wi-Fi'
													onChange={handleAmenetiesChange}
												/>
												<span class='checkmark'></span>
											</label>
											&nbsp;&nbsp;
											<label class='container-C '>
												AC
												<input
													type='checkbox'
													name='amenities'
													value='AC'
													onChange={handleAmenetiesChange}
												/>
												<span class='checkmark'></span>
											</label>
											&nbsp;&nbsp;
											<label class='container-C '>
												TV
												<input
													type='checkbox'
													name='amenities'
													value='TV'
													onChange={handleAmenetiesChange}
												/>
												<span class='checkmark'></span>
											</label>
										</div>
									</div>
									<div className='col-md-6'>
										<label htmlFor='amenities' className='lpadding'>
											Parking & facilities
										</label>
										<div className='check'>
											<label class='container-C '>
												Lift
												<input
													type='checkbox'
													name='amenities'
													value='Lift'
													onChange={handleAmenetiesChange}
												/>
												<span class='checkmark'></span>
											</label>
											&nbsp;&nbsp;
											<label class='container-C '>
												Paid parking
												<input
													type='checkbox'
													name='amenities'
													value='Paid Parking'
													onChange={handleAmenetiesChange}
												/>
												<span class='checkmark'></span>
											</label>
										</div>
									</div>
									<div className='col-md-6'>
										<label htmlFor='amenities' className='lpadding'>
											Living Area
										</label>
										<div className='check'>
											<label class='container-C '>
												Desk
												<input
													type='checkbox'
													name='amenities'
													value='Desk'
													onChange={handleAmenetiesChange}
												/>
												<span class='checkmark'></span>
											</label>
											&nbsp;&nbsp;
											<label class='container-C '>
												Sofa
												<input
													type='checkbox'
													name='amenities'
													value='Sofa'
													onChange={handleAmenetiesChange}
												/>
												<span class='checkmark'></span>
											</label>
											&nbsp;&nbsp;
											<label class='container-C '>
												Fireplace
												<input
													type='checkbox'
													name='amenities'
													value='Fireplace'
													onChange={handleAmenetiesChange}
												/>
												<span class='checkmark'></span>
											</label>
										</div>
									</div>
									<div className='col-md-6'>
										<label htmlFor='amenities' className='lpadding'>
											Food & Drink
										</label>
										<div className='check'>
											<label class='container-C '>
												Fruits
												<input
													type='checkbox'
													onChange={handleAmenetiesChange}
													name='amenities'
													value='Fruits'
												/>
												<span class='checkmark'></span>
											</label>
											&nbsp;&nbsp;
											<label class='container-C '>
												Breakfast
												<input
													type='checkbox'
													name='amenities'
													value='Breakfast'
													onChange={handleAmenetiesChange}
												/>
												<span class='checkmark'></span>
											</label>
										</div>
									</div>
								</div>
							</fieldset>
						</div>
						<div className='col-md-12 cntr' style={{ marginTop: '25px' }}>
							<fieldset style={{ border: '2px solid white' }}>
								<legend className='legendStyle'>Address Details</legend>
								<div className='row'>
									<div className='col-md-6 lpadding'>
										<input
											type='text'
											value={post.address.base}
											name='base'
											onChange={handleAddressChange}
											placeholder='Enter Street Address Here'
										/>
										<span className='text-danger errorSize'>
											{formErrors.baseError ? messages.BASEVALUE_ERROR : null}
										</span>
									</div>
									<div className='col-md-6 Apadding'>
										<input
											type='text'
											value={post.address.locality}
											name='locality'
											onChange={handleAddressChange}
											placeholder='Enter Locality Here'
										/>
										<span className='text-danger errorSize'>
											{formErrors.localityError
												? messages.LOCALITYVALUE_ERROR
												: null}
										</span>
									</div>
									<div className='col-md-6 lpadding'>
										<input
											type='text'
											value={post.address.city}
											name='city'
											onChange={handleAddressChange}
											placeholder='Enter City Here'
										/>
										<span className='text-danger errorSize'>
											{formErrors.cityError ? messages.CITYVALUE_ERROR : null}
										</span>
									</div>
									<div className='col-md-6 Apadding'>
										<input
											type='text'
											value={post.address.zip}
											name='zip'
											onChange={handleAddressChange}
											placeholder='Enter Zip Here'
											maxLength={6}
										/>
										<span className='text-danger errorSize'>
											{formErrors.zipError ? messages.ZIPVALUE_ERROR : null}
										</span>
									</div>
									<div className='col-md-12 Apadding'>
										<input
											type='text'
											value={post.address.state}
											name='state'
											onChange={handleAddressChange}
											placeholder='Enter State Here'
										/>
										<span className='text-danger errorSize'>
											{formErrors.stateError ? messages.STATEVALUE_ERROR : null}
										</span>
									</div>
								</div>
							</fieldset>
						</div>
						<div className='col-md-12'>
							<button
								type='submit'
								id='submit_button'
								style={{ height: '50px' }}
								disabled={!valid}>
								Add Property
							</button>
						</div>
						{mandatory ? (
							<div className='text-danger text-center errorSize-2 mt-3'>
								{messages.MANDATAROY}
							</div>
						) : null}
						{errorMessage ? (
							<div className='text-danger text-center errorSize-2 mt-3'>
								{messages.ERROR_MESSAGE}
							</div>
						) : null}
						{addPropertySuccessMsg ? (
							<div class='alert alert-success text-center alertPop text-light mt-3'>
								<strong>Success!</strong>&nbsp;&nbsp;{' '}
								{addPropertySuccessMsg.title} is posted.
							</div>
						) : null}
					</form>
				</div>
			</div>
		</div>
	);
}

export default PostProperty;
