import axios from 'axios';
import getApi from "../utils/getApi";
import { errorHandler } from "../utils/errorHandler";

const baseURL = `${getApi()}statements`;

export const Statements = {
	getStatement: errorHandler(async id => {
		const headers = {
			'Content-Type': 'application/json',
			authorization: `Bearer ${localStorage.getItem("jwt")}` 
		}
		
		const res = await axios.get(baseURL + `/${id}`, {"headers": headers});
		return res.data;
	}),
	
	getStatements: errorHandler(async () => {
		const headers = {
			'Content-Type': 'application/json',
			authorization: `Bearer ${localStorage.getItem("jwt")}` 
		}
		
		const res = await axios.get(baseURL, {"headers": headers});
		return res.data;
	}),

	deleteStatements: errorHandler(async ids => {
		const headers = {
			'Content-Type': 'application/json',
			authorization: `Bearer ${localStorage.getItem("jwt")}` 
		}
		
		let body = {
			statementIds: ids
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
			statement: payload
		}
		
		if (payload._id) {
			const res = await axios.put(baseURL + `/${payload._id}`, body, {"headers": headers});
			return res.data;
		} else {
			const res = await axios.post(baseURL, body, {"headers": headers});
			return res.data;
		}
	}),

	uploadStatementCsv: errorHandler(async statementFile => {		
		const formHeaders = {
			"Content-Type": "multipart/form-data",
			Authorization: `Bearer ${localStorage.getItem("jwt")}`,
		}

		const formData = new FormData();
		formData.append('file', statementFile, statementFile.name);
		const res = await axios.post(baseURL + "/uploadStatementCsv", formData, {"headers": formHeaders});		
		return res.data;
	}),
};