export const allowedFields = {
	contactsList: [
		"firstName",
		"lastName",
		"address",
		"city",
		"country",
		"email",
		"phone",
	],

	groupContactList: [
		"orgName",
		"firstName",
		"lastName",
		"district",
		"section",
		"commitmentAmt",
		"contactStatus"
	],

	commsList: [
		"date",
		"time",
		"contactPersonType",
		"contactPersonName",
		"contactVia",
		"purpose",
	],

	taskLines: [
		"date",
		"type",
		"time",
		"details",
		"completed"
	],

	eventLines: [
		"date",
		"type",
		"time",
		"details",
		"amountReceived",
	],

	searchResults: [
		"firstName",
		"lastName",
	],

	otherIncomeTable: [
		"type",
		"orgName",
		"firstName",
		"lastName",
		"amount"
	],
	
	qtrReports: [
		"quarterNumber",
		"year",
		"baseAmount",
		"dateCompleted",
	],

	itinReports: [
		"month",
		"year",
		"dateCompleted",
	],
	
	offeringLineFields: [
		"date",
		"receiptNo",
		"orgName",
		"type",
		"firstName",
		"lastName",
		"district",
		"amount",
	],

	sdrReports: [
		"sdrNumber",
		"field",
		"sdrDate",
		"sdrAmount",
	],

	vehicleFields: [
		"name",
		"make",
		"model",
		"year",
		"active",
		"default",
	]
}