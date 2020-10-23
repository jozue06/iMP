import axios from 'axios';
import getApi from "../utils/getApi";

const baseURL = `${getApi()}sdrReports`;

const handleError = fn => (...params) =>
	fn(...params).catch(e => {
		let messages = Object.entries(JSON.parse(e.response.data.message)).map(val => val.map(v => v.message));
		let newmess = messages.map(e => e[1].replace("Path ", "")).toString().replace(",", '\n');
		throw new Error(newmess.replace(",", '\n'));
});

export const SDRReports = {
	getSDRReport: handleError(async id => {
		const headers = {
			'Content-Type': 'application/json',
			authorization: `Bearer ${localStorage.getItem("jwt")}`
		}
		
		const res = await axios.get(baseURL + `/${id}`, { "headers" : headers } );
		return res.data;
	}),
	
	getSDRReports: handleError(async () => {
		const headers = {
			'Content-Type': 'application/json',
			authorization: `Bearer ${localStorage.getItem("jwt")}`
		}
		
		const res = await axios.get(baseURL, { "headers" : headers } );
		return res.data;
	}),

	deleteSDRReport: handleError(async ids => {
		const headers = {
			'Content-Type': 'application/json',
			authorization: `Bearer ${localStorage.getItem("jwt")}`
		}
		
		let body = {
			sdrReportIds: ids
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
			sdrReport: payload
		}

		if (payload._id) {
			const res = await axios.put(baseURL + `/${payload._id}`, body, {"headers": headers});
			return res.data;
		} else {
			const res = await axios.post(baseURL, body, {"headers": headers});
			return res.data;
		}
	}),

	deleteLine: handleError(async payload => {		
		let body = {
			sdrReport: payload
		}

		const res = await axios.post(baseURL + `/deleteLine/${payload._id}`, body, {"headers": headers});
		return res.data;
	
	}),
};