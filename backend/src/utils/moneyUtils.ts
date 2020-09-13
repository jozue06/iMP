function formatNumber(num:string) {	
	let amt: number = Number(num.replace(/[^\d]/g, ""));	
	return amt;
};

function unformatNumber(num:number) {
	let value = Number(num/100).toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");	
    return value;
};

export { formatNumber, unformatNumber };