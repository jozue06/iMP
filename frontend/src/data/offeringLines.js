import axios from 'axios';
import getApi from "../utils/getApi";

const baseURL = `${getApi()}itinReports/offeringLines`;

const handleError = fn => (...params) =>
	fn(...params).catch(e => {
		let messages = Object.entries(JSON.parse(e.response.data.message)).map(val => val.map(v => v.message));
		let newmess = messages.map(e => e[1].replace("Path ", "")).toString().replace(",", '\n');
		throw new Error(newmess.replace(",", '\n'));
});

export const OfferingLines = {
	getOfferingLine: handleError(async id => {
		const headers = {
			'Content-Type': 'application/json',
			authorization: `Bearer ${localStorage.getItem("jwt")}` 
		}

		const res = await axios.get(baseURL + `/${id}`, {"headers": headers});
		return res.data;
	}),
	
	getOfferingLines: handleError(async () => {
		const headers = {
			'Content-Type': 'application/json',
			authorization: `Bearer ${localStorage.getItem("jwt")}` 
		}

		const res = await axios.get(baseURL, {"headers": headers});
		return res.data;
	}),

	deleteOfferingLines: handleError(async ids => {
		const headers = {
			'Content-Type': 'application/json',
			authorization: `Bearer ${localStorage.getItem("jwt")}` 
		}

		let body = {
			offeringLineIds: ids
		}
		
		const res = await axios.post(baseURL +"Delete", body, {"headers": headers});
		return res.data;
	}),

	save: handleError(async payload => {	
		const headers = {
			'Content-Type': 'application/json',
			authorization: `Bearer ${localStorage.getItem("jwt")}` 
		}
			
		let body = {
			offeringLine: payload
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