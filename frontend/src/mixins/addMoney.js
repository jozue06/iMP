export default function formatMoney(amountOne, amountTwo) {	
	if (isNaN(Number(amountOne)) || isNaN(Number(amountTwo)) ) {
		return 0;
	}
	
	let value = Number(amountOne) + Number(amountTwo);

	return value;
}