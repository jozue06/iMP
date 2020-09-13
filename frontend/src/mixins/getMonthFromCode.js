import { months } from "../constants/months"

export default function getStatusFromCode(code) {
	return months.find(m => m.value == code).text;
}