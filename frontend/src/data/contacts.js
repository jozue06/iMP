import axios from 'axios';

const baseURL = 'http://localhost:9090/';

// const handleError = fn => (...params) =>
// fn(...params).catch(error => {
// 	vm.flash(`${error.response.status}: ${error.response.statusText}`, 'error');
// });

export const Contacts = {
	getContact: handleError(async id => {
		const res = await axios.get(baseURL + id);
		return res.data;
	}),
	
	getContacts: handleError(async () => {
		const res = await axios.get(baseURL);
		return res.data;
	}),

	deleteContact: handleError(async id => {
		const res = await axios.delete(baseURL + id);
		return res.data;
	}),

	createContact: handleError(async payload => {
		const res = await axios.post(baseURL, payload);
		return res.data;
	}),

	updateContact: handleError(async payload => {
		const res = await axios.put(baseURL + payload._id, payload);
		return res.data;
	})
};