import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import Footer from './components/Footer';
import Search from './components/Search';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Aim from './components/FooterComp/Aim';
import Testimonials from './components/FooterComp/Testimonials';
import OurPolicies from './components/FooterComp/OurPolicies';
import PrivacyNotice from './components/FooterComp/PrivacyNotice';
import MyProfile from './components/MyProfile';
import Property from './components/Property';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import PostProperty from './components/PostProperty';
import Pay from './components/Pay';
import Bookings from './components/Bookings';
import TenantProperties from './components/TenantProperties';
import OwnerProperties from './components/OwnerProperties';
import 'bootstrap/dist/css/bootstrap.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path='/' element={<App />} exact />
					<Route path='/register' element={<SignUp />} exact />
					<Route path='/login' element={<Login />} exact />
					<Route path='/search' element={<Search />} exact />
					<Route path='/aim-vision' element={<Aim />} exact />
					<Route path='/testimonials' element={<Testimonials />} exact />
					<Route path='/privacy-notice' element={<PrivacyNotice />} exact />
					<Route path='/our-policies' element={<OurPolicies />} exact />
					<Route path='/my-profile/:userId' element={<MyProfile />} exact />
					<Route path='/properties/:propId' element={<Property />} exact />
					<Route
						path='/post-property/:ownerId'
						element={<PostProperty />}
						exact
					/>
					<Route
						path='/tenant-properties/:tenantId'
						element={<TenantProperties />}
						exact
					/>
					<Route
						path='/owner-properties/:ownerId'
						element={<OwnerProperties />}
						exact
					/>
					<Route path='/pay' element={<Pay />} exact />
					<Route path='/pay/:propId' element={<Pay />} exact />
					<Route path='/bookings/:agentId' element={<Bookings />} exact />
					<Route path='*' element={<NotFound />} exact />
				</Routes>
				<Footer />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
