import axios from 'axios';
import getApi from "../utils/getApi";
import { errorHandler } from "../utils/errorHandler";

const baseURL = `${getApi()}institutionalReports`;

export const InstitutionalReports = {
	getInstitutionalReport: errorHandler(async id => {
		const headers = {
			'Content-Type': 'application/json',
			authorization: `Bearer ${localStorage.getItem("jwt")}`
		}
		
		const res = await axios.get(baseURL + `/${id}`, { "headers" : headers } );
		return res.data;
	}),
	
	getInstitutionalReports: errorHandler(async () => {
		const headers = {
			'Content-Type': 'application/json',
			authorization: `Bearer ${localStorage.getItem("jwt")}`
		}
		
		const res = await axios.get(baseURL, { "headers" : headers } );
		return res.data;
	}),

	deleteInstitutionalReport: errorHandler(async ids => {
		const headers = {
			'Content-Type': 'application/json',
			authorization: `Bearer ${localStorage.getItem("jwt")}`
		}
		
		let body = {
			institutionalReportIds: ids
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
			institutionalReport: payload
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
			institutionalReport: payload
		}

		const res = await axios.post(baseURL + `/deleteLine/${payload._id}`, body, {"headers": headers});
		return res.data;
	
	})
};