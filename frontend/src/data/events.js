import axios from 'axios';

const baseURL = 'http://localhost:9090/';

// const handleError = fn => (...params) =>
// fn(...params).catch(error => {
// 	vm.flash(`${error.response.status}: ${error.response.statusText}`, 'error');
// });

export const Events = {
	getTask: handleError(async id => {
		const res = await axios.get(baseURL + id);
		return res.data;
	}),
	
	getEvents: handleError(async () => {
		const res = await axios.get(baseURL);
		return res.data;
	}),

	deleteEvent: handleError(async id => {
		const res = await axios.delete(baseURL + id);
		return res.data;
	}),

	createEvent: handleError(async payload => {
		const res = await axios.post(baseURL, payload);
		return res.data;
	}),

	updateEvent: handleError(async payload => {
		const res = await axios.put(baseURL + payload._id, payload);
		return res.data;
	})
};