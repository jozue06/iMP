import axios from 'axios';
import getApi from "../utils/getApi"
import { errorHandler } from "../utils/errorHandler";

const baseURL = `${getApi()}vehicles`;

export const Vehicles = {
	getVehicles: errorHandler(async () => {
		const headers = {
			'Content-Type': 'application/json',
			authorization: `Bearer ${localStorage.getItem("jwt")}`
		}
		
		const res = await axios.get(baseURL, {"headers": headers});
		return res.data;
	}),

	deleteVehicles: errorHandler(async ids => {
		const headers = {
			'Content-Type': 'application/json',
			authorization: `Bearer ${localStorage.getItem("jwt")}`
		}
		
		let body = {
			vehicleIds: ids
		}
		
		const res = await axios.post(baseURL + "Delete", body, {"headers": headers});
		return res.data;
	}),

	save: errorHandler(async payload => {
		const headers = {
			'Content-Type': 'application/json',
			authorization: `Bearer ${localStorage.getItem("jwt")}`
		}
		
		let body = {
			vehicle: payload
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