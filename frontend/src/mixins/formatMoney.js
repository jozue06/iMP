export default function formatMoney(amount) {
	if (isNaN(Number(amount))) {
		return amount;
	}

	let value = Number(amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");

	return value;
}