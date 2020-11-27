import axios from 'axios';
import getApi from "../utils/getApi";
import { errorHandler } from "../utils/errorHandler";

const baseURL = `${getApi()}qtrReports`;

export const QuarterlyReports = {
	getQuarterlyReport: errorHandler(async id => {
		const headers = {
			'Content-Type': 'application/json',
			authorization: `Bearer ${localStorage.getItem("jwt")}`
		}
		
		const res = await axios.get(baseURL + `/${id}`, { "headers" : headers } );
		return res.data;
	}),
	
	getQuarterlyReports: errorHandler(async () => {
		const headers = {
			'Content-Type': 'application/json',
			authorization: `Bearer ${localStorage.getItem("jwt")}`
		}
		
		const res = await axios.get(baseURL, { "headers" : headers } );
		return res.data;
	}),

	deleteQuarterlyReport: errorHandler(async ids => {
		const headers = {
			'Content-Type': 'application/json',
			authorization: `Bearer ${localStorage.getItem("jwt")}`
		}
		
		let body = {
			qtrReportIds: ids
		}
		
		const res = await axios.post(baseURL +"Delete", body, {"headers": headers});
		return res.data;
	}),

	save: errorHandler(async payload => {
		const headers = {
			'Content-Type': 'application/json',
			authorization: `Bearer ${localStorage.getItem("jwt")}`
		}
		
		let body = {
			qtrReport: payload
		}

		if (payload._id) {
			const res = await axios.put(baseURL + `/${payload._id}`, body, {"headers": headers});
			return res.data;
		} else {
			const res = await axios.post(baseURL, body, {"headers": headers});
			return res.data;
		}
	}),

	deleteLine: errorHandler(async payload => {		
		let body = {
			qtrReport: payload
		}

		const res = await axios.post(baseURL + `/deleteLine/${payload._id}`, body, {"headers": headers});
		return res.data;
	
	})
};