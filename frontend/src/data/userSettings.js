import axios from 'axios';
import getApi from "../utils/getApi"
import { errorHandler } from "../utils/errorHandler";

const baseURL = `${getApi()}settings`;

export const Settings = {
	getSettings: errorHandler(async () => {
		const header = {
			'Content-Type': 'application/json',
			authorization: `Bearer ${localStorage.getItem("jwt")}` 
		}
		const res = await axios.get(baseURL, {"headers": header});
		return res.data;
	}),

	save: errorHandler(async payload => {
		const headers = {
			'Content-Type': 'application/json',
			authorization: `Bearer ${localStorage.getItem("jwt")}` 
		}
		
		let body = {
			settings: payload
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