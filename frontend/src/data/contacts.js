import axios from 'axios';

const baseURL = 'http://localhost:9090/contacts';
const headers = {
	'Content-Type': 'application/json',
	authorization: `Bearer ${localStorage.getItem("jwt")}` 
}

const handleError = fn => (...params) =>
fn(...params).catch(e => {
	let messages = Object.entries(JSON.parse(e.response.data.message)).map(val => val.map(v => v.message));
	let newmess = messages.map(e => e[1].replace("Path ", "")).toString().replace(",", '\n');
	throw new Error(newmess.replace(",", '\n'));
});

export const Contacts = {
	getContact: handleError(async id => {
		const res = await axios.get(baseURL + `/${id}`, {"headers": headers});
		return res.data;
	}),
	
	getContacts: handleError(async () => {
		const res = await axios.get(baseURL, {"headers": headers});
		return res.data;
	}),

	deleteContact: handleError(async id => {
		const res = await axios.delete(baseURL + `/${id}`);
		return res.data;
	}),

	save: handleError(async payload => {		
		let body = {
			contact: payload
		}

		if (payload._id) {
			const res = await axios.put(baseURL + `/${payload._id}`, body, {"headers": headers});
			return res.data;
		} else {
			const res = await axios.post(baseURL, body, {"headers": headers});
			return res.data;
		}
	})
};