import axios from 'axios';
import getApi from "../utils/getApi";
import { errorHandler } from "../utils/errorHandler";

const baseURL = `${getApi()}qtrReports/otherIncomeLines`;

export const OtherIncomeLines = {
	getOtherIncomeLine: errorHandler(async id => {
		const headers = {
			'Content-Type': 'application/json',
			authorization: `Bearer ${localStorage.getItem("jwt")}` 
		}
		if (id != "" && id != "0") {
			const res = await axios.get(baseURL + `/${id}`, {"headers": headers});
			return res.data;
		}
		return [];
	}),
	
	getOtherIncomeLines: errorHandler(async () => {
		const headers = {
			'Content-Type': 'application/json',
			authorization: `Bearer ${localStorage.getItem("jwt")}` 
		}
		
		const res = await axios.get(baseURL, {"headers": headers});
		return res.data;
	}),

	deleteOtherIncomeLines: errorHandler(async ids => {
		const headers = {
			'Content-Type': 'application/json',
			authorization: `Bearer ${localStorage.getItem("jwt")}` 
		}
		
		let body = {
			otherIncomeLineIds: ids
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
			otherIncomeLine: payload
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