import axios from "axios";

export async function getSession() {	
	if (localStorage.getItem("jwt") != null) {

		const headers = {
			'Content-Type': 'application/json',
			authorization: `Bearer ${localStorage.getItem("jwt")}` 
		}
		try {
			const res = await axios.post("http://localhost:9090/user/authorize", { "body": {} }, { "headers": headers });
			if (res.status == 200) {
				return true;
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