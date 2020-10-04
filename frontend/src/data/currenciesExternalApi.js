/** Thank you to https://exchangerate.host
 * for documentation on this API, visit: 
 *   https://exchangerate.host/#/#docs   *
 */

import axios from 'axios';
import moment from "moment";

export const Currencies = {
	fetchSupportedSymbols: async () => {
		await axios.get("https://api.exchangerate.host/symbols").then((res) => {
			return res.data;
		});
	},

	fetchCurrentExchangeRates: async () => {
		await axios.get("https://api.exchangerate.host/latest?base=USD").then((res) => {
			return res.data;
		});
	},

	fetchHistoricExchangeRates: async (date) => {
		let queryDate = moment(date).format("YYYY-MM-DD");
		await axios.get(`https://api.exchangerate.host/${queryDate}?base=USD`).then((res) => {
			console.log('histo res ', res.data);
			return res.data;
		});
	},
}