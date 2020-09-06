import axios from 'axios';

const baseURL = 'http://localhost:9090/qtrReports/expenseLines';

const handleError = fn => (...params) =>
	fn(...params).catch(e => {
		let messages = Object.entries(JSON.parse(e.response.data.message)).map(val => val.map(v => v.message));
		let newmess = messages.map(e => e[1].replace("Path ", "")).toString().replace(",", '\n');
		throw new Error(newmess.replace(",", '\n'));
});

const headers = {
	'Content-Type': 'application/json',
	authorization: `Bearer ${localStorage.getItem("jwt")}` 
}

export const ExpenseLines = {
	getExpenseLine: handleError(async id => {
		const res = await axios.get(baseURL + `/${id}`, {"headers": headers});
		return res.data;
	}),
	
	getExpenseLines: handleError(async () => {
		const res = await axios.get(baseURL, {"headers": headers});
		return res.data;
	}),

	deleteExpenseLines: handleError(async ids => {
		let body = {
			expenseLineIds: ids
		}
		
		const res = await axios.post(baseURL +"Delete", body, {"headers": headers});
		return res.data;
	}),

	save: handleError(async payload => {		
		let body = {
			expenseLine: payload
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