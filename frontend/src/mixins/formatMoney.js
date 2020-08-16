export default function formatMoney(amount) {
	if (isNaN(Number(amount))) {
		return 0;
	}

	let value = Number(amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");

	return Number(value);
}