import axios from 'axios';

const baseURL = 'http://localhost:9090/';

export const Tasks = {
	getTask: handleError(async id => {
		const res = await axios.get(baseURL + id);
		return res.data;
	}),
	
	getTasks: handleError(async () => {
		const res = await axios.get(baseURL);
		return res.data;
	}),

	deleteTask: handleError(async id => {
		const res = await axios.delete(baseURL + id);
		return res.data;
	}),

	createTask: handleError(async payload => {
		const res = await axios.post(baseURL, payload);
		return res.data;
	}),

	updateTask: handleError(async payload => {
		const res = await axios.put(baseURL + payload._id, payload);
		return res.data;
	})
};