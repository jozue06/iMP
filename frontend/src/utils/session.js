import axios from "axios";
import getApi from "./getApi";
export async function getSession() {	
	if (localStorage.getItem("jwt") != null) {

		const headers = {
			'Content-Type': 'application/json',
			authorization: `Bearer ${localStorage.getItem("jwt")}` 
		}
		try {
			let apiAddress = getApi();
			const res = await axios.post(apiAddress + "user/authorize", { "body": {} }, { "headers": headers });
			if (res.status == 200) {
				return res;
			}
			else {
				return false;
			}
		}
		catch (e) {
			return false;
		}
	} else {
		return false;
	}
}