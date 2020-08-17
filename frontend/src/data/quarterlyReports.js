import axios from 'axios';

const baseURL = 'http://localhost:9090/';

// const handleError = fn => (...params) =>
// fn(...params).catch(error => {
// 	vm.flash(`${error.response.status}: ${error.response.statusText}`, 'error');
// });

export const QuarterlyReports = {
	getQuarterlyReport: handleError(async id => {
		const res = await axios.get(baseURL + id);
		return res.data;
	}),
	
	getQuarterlyReports: handleError(async () => {
		const res = await axios.get(baseURL);
		return res.data;
	}),

	deleteQuarterlyReport: handleError(async id => {
		const res = await axios.delete(baseURL + id);
		return res.data;
	}),

	createQuarterlyReport: handleError(async payload => {
		const res = await axios.post(baseURL, payload);
		return res.data;
	}),

	updateQuarterlyReport: handleError(async payload => {
		const res = await axios.put(baseURL + payload._id, payload);
		return res.data;
	})
};