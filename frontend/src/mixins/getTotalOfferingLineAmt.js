export default function getStatusFromCode(tableLine) {
	let total = 0;
	if (tableLine.workSupportAmt) {
		total += tableLine.workSupportAmt;
	}
	if (tableLine.specialAmt) {
		total += tableLine.specialAmt;
	}
	if (tableLine.otherAmt) {
		total += tableLine.otherAmt;
	}
	if (tableLine.hospitality) {
		total += tableLine.hospitality;
	}
	if (tableLine.equipment) {
		total += tableLine.equipment;
	}
	if (tableLine.otherNonCash) {
		total += tableLine.otherNonCash;
	}

	if (total > 0) {
		return total;
	}

	return tableLine;
}