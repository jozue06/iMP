import axios from 'axios';
import getApi from "../utils/getApi";
import { errorHandler } from "../utils/errorHandler";

const baseURL = `${getApi()}expenseLines`;

export const ExpenseLines = {
	getExpenseLine: errorHandler(async id => {
		const headers = {
			'Content-Type': 'application/json',
			authorization: `Bearer ${localStorage.getItem("jwt")}` 
		}

		const res = await axios.get(baseURL + `/${id}`, {"headers": headers});
		return res.data;
	}),
	
	getExpenseLines: errorHandler(async () => {
		const headers = {
			'Content-Type': 'application/json',
			authorization: `Bearer ${localStorage.getItem("jwt")}` 
		}

		const res = await axios.get(baseURL, {"headers": headers});
		return res.data;
	}),

	deleteExpenseLines: errorHandler(async ids => {
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

	save: errorHandler(async (expenseLine, expenseLineType, expenseReceiptFile, currentReportId) => {

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

	uploadPhoto: errorHandler(async (expenseLineId, expenseReceiptFile) => {		
		const formHeaders = {
			"Content-Type": "multipart/form-data",
			Authorization: `Bearer ${localStorage.getItem("jwt")}`,
		}

		const formData = new FormData();
		formData.append('file', expenseReceiptFile, expenseReceiptFile.name);
		const res = await axios.post(baseURL + "/uploadImage" + `/${expenseLineId}`, formData, {"headers": formHeaders});		
		return res.data;
	}),

	deletePhoto: errorHandler(async expenseLine => {		
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