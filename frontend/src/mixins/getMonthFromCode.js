import { months } from "../constants/months"

export default function getStatusFromCode(code) {
	let month = months.find(m => m.value == code);
	if (month) {
		return month.text;
	}
}