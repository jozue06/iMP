function formatNumber(num:string) {
	let amt: number
	if (typeof num != "number") {
		amt = Number(num.replace(/[^\d]/g, ""));	
		
	} else {
		amt = Number(num);
	}

	return amt;
};

function unformatNumber(num:number) {
	let value = Number(num/100).toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");	
    return value;
};

export { formatNumber, unformatNumber };