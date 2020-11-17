import axios from 'axios';
import getApi from "../utils/getApi";

const baseURL = `${getApi()}expenseLines`;

const handleError = fn => (...params) =>
	fn(...params).catch(e => {
		console.error('eeeeeeek expenseLines error ', e);
		if (typeof e.response.data.message === 'string') {
			throw new Error(e.response.data.message);
		}

		let messages = Object.entries(JSON.parse(e.response.data.message)).map(val => val.map(v => v.message));		
		let newmess = messages.map(e => e[1].replace("Path ", "")).toString().replace(",", '\n');
		throw new Error(newmess.replace(",", '\n'));
});

export const ExpenseLines = {
	getExpenseLine: handleError(async id => {
		const headers = {
			'Content-Type': 'application/json',
			authorization: `Bearer ${localStorage.getItem("jwt")}` 
		}

		const res = await axios.get(baseURL + `/${id}`, {"headers": headers});
		return res.data;
	}),
	
	getExpenseLines: handleError(async () => {
		const headers = {
			'Content-Type': 'application/json',
			authorization: `Bearer ${localStorage.getItem("jwt")}` 
		}

		const res = await axios.get(baseURL, {"headers": headers});
		return res.data;
	}),

	deleteExpenseLines: handleError(async ids => {
		const headers = {
			'Content-Type': 'application/json',
			authorization: `Bearer ${localStorage.getItem("jwt")}` 
		}

		let body = {
			expenseLineIds: ids
		}
		
		const res = await axios.post(baseURL + "Delete", body, {"headers": headers});
		return res.data;
	}),

	save: handleError(async (expenseLine, expenseLineType, expenseReceiptFile, currentReportId) => {

		if (expenseLineType == 0) {
			expenseLine.qtrReport = currentReportId;
		}

		if (expenseLineType == 1) {
			expenseLine.itinReport = currentReportId;
		}

		if (expenseLineType == 3) {
			expenseLine.sdrReport = currentReportId;
		}

		if (expenseLineType == 4) {
			expenseLine.institutionalReport = currentReportId;
		}

		const headers = {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem("jwt")}`,
		}
		
		let body = {
			expenseLine: expenseLine,
			expenseLineType: expenseLineType,
		}
		let res;
		if (expenseLine._id) {
			res = await axios.put(baseURL + `/${expenseLine._id}`, body, {"headers": headers});
		} else {
			if (expenseReceiptFile) {
				const formHeaders = {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${localStorage.getItem("jwt")}`,
				}	
				const formData = new FormData();
				formData.append('file', expenseReceiptFile, expenseReceiptFile.name);
				formData.append('expenseLine', JSON.stringify(body.expenseLine));
				formData.append('expenseLineType', JSON.stringify(expenseLineType));
		
				res = await axios.post(baseURL, formData, {"headers": formHeaders});
			} else {
				res = await axios.post(baseURL, body, {"headers": headers});
			}
		}
		return res.data;
	}),

	uploadPhoto: handleError(async (expenseLineId, expenseReceiptFile) => {		
		const formHeaders = {
			"Content-Type": "multipart/form-data",
			Authorization: `Bearer ${localStorage.getItem("jwt")}`,
		}

		const formData = new FormData();
		formData.append('file', expenseReceiptFile, expenseReceiptFile.name);
		const res = await axios.post(baseURL + "/uploadImage" + `/${expenseLineId}`, formData, {"headers": formHeaders});		
		return res.data;
	}),

	deletePhoto: handleError(async expenseLine => {		
		const headers = {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem("jwt")}`,
		}

		let body = {
			expenseLine: expenseLine,
		}

		const res = await axios.post(baseURL + "/deleteImage", body, {"headers": headers});		
		return res.data;
	}),
};