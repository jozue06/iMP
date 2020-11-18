const qtrOptions = [
	{
		"code": "1",
		"category": "Institution Building Expenses",
		"description": "Building Repairs and Maintenance",
		"includeDescription": "Yes",
		"itemizedReq": "Always Itemize",
		"receiptReq": "Receipts for all items over $75"
	},
	{
		"code": "2",
		"category": "Institution Building Expenses",
		"description": "Property Taxes, Legal Fees, Insurance",
		"includeDescription": "Yes",
		"itemizedReq": "No itemization required",
		"receiptReq": "Receipts for all items over $75"
	},
	{
		"code": "3",
		"category": "Institution Building Expenses",
		"description": "Security Guard (Option B Only)",
		"includeDescription": "No",
		"itemizedReq": "Always Itemize",
		"receiptReq": "Receipts for all items over $75"
	},
	{
		"code": "4",
		"category": "Institution Building Expenses",
		"description": "Other Institutional Expenses",
		"includeDescription": "No",
		"itemizedReq": "Always Itemize",
		"receiptReq": "Receipts for all items over $75"
	},
	{
		"code": "5",
		"category": "Housing and Support Expenses",
		"description": "Housing",
		"includeDescription": "No",
		"itemizedReq": "No itemization required",
		"receiptReq": "Receipts for all items over $75"
	},
	{
		"code": "6",
		"category": "Housing and Support Expenses",
		"description": "Utilities",
		"includeDescription": "No",
		"itemizedReq": "Always Itemize",
		"receiptReq": "Receipts for all items over $75"
	},
	{
		"code": "7",
		"category": "Housing and Support Expenses",
		"description": "Housing Deposit",
		"includeDescription": "No",
		"itemizedReq": "No itemization required",
		"receiptReq": "All receipts required"
	},
	{
		"code": "8",
		"category": "Housing and Support Expenses",
		"description": "Children's Schooling",
		"includeDescription": "No",
		"itemizedReq": "Always Itemize",
		"receiptReq": "Receipts for all items over $75"
	},
	{
		"code": "9",
		"category": "Housing and Support Expenses",
		"description": "Foreign Income Tax",
		"includeDescription": "No",
		"itemizedReq": "Always Itemize",
		"receiptReq": "Receipts for all items over $75"
	},
	{
		"code": "10",
		"category": "Housing and Support Expenses",
		"description": "Other Housing and Support Expenses",
		"includeDescription": "No",
		"itemizedReq": "Always Itemize",
		"receiptReq": "Receipts for all items over $75"
	},
	{
		"code": "11",
		"category": "Equipment Expenses",
		"description": "Work-Ministry Equipment",
		"includeDescription": "Yes",
		"itemizedReq": "Always Itemize",
		"receiptReq": "Receipts for all items over $75"
	},
	{
		"code": "12",
		"category": "Equipment Expenses",
		"description": "STL Vehicle Repairs",
		"includeDescription": "No",
		"itemizedReq": "Always Itemize",
		"receiptReq": "Receipts for all items over $75"
	},
	{
		"code": "13",
		"category": "Equipment Expenses",
		"description": "STL Vehicle Insurance, Taxes, etc.",
		"includeDescription": "No",
		"itemizedReq": "Always Itemize",
		"receiptReq": "Receipts for all items over $75"
	},
	{
		"code": "14",
		"category": "Travel Expenses on the Field",
		"description": "Hotels and Lodging",
		"includeDescription": "Yes",
		"itemizedReq": "Always Itemize",
		"receiptReq": "All receipts required"
	},
	{
		"code": "15",
		"category": "Travel Expenses on the Field",
		"description": "Meals, Tips",
		"includeDescription": "No",
		"itemizedReq": "Always Itemize",
		"receiptReq": "Receipts for all items over $75"
	},
	{
		"code": "16",
		"category": "Travel Expenses on the Field",
		"description": "Plane Fare, Car Rental, Train Travel",
		"includeDescription": "Yes",
		"itemizedReq": "Always Itemize",
		"receiptReq": "All receipts required"
	},
	{
		"code": "17",
		"category": "Travel Expenses on the Field",
		"description": "Bus, Cab Fare, Tolls, Subways, etc.",
		"includeDescription": "No",
		"itemizedReq": "Always Itemize",
		"receiptReq": "Receipts for all items over $75"
	},
	{
		"code": "18",
		"category": "Travel Expenses on the Field",
		"description": "Gasoline for Travel",
		"includeDescription": "No",
		"itemizedReq": "Always Itemize",
		"receiptReq": "Receipts for all items over $75"
	},
	{
		"code": "19",
		"category": "Travel Expenses on the Field",
		"description": "Oil, Minor Maintenance",
		"includeDescription": "Yes",
		"itemizedReq": "Always Itemize",
		"receiptReq": "Receipts for all items over $75"
	},
	{
		"code": "20",
		"category": "Travel Expenses on the Field",
		"description": "Other Travel Expenses",
		"includeDescription": "No",
		"itemizedReq": "Always Itemize",
		"receiptReq": "Receipts for all items over $75"
	},
	{
		"code": "21",
		"category": "Work Expenses",
		"description": "Telephone (Option B Only)",
		"includeDescription": "No",
		"itemizedReq": "Always Itemize",
		"receiptReq": "Receipts for all items over $75"
	},
	{
		"code": "22",
		"category": "Work Expenses",
		"description": "Office Expense (Option B Only)",
		"includeDescription": "No",
		"itemizedReq": "Always Itemize",
		"receiptReq": "Receipts for all items over $75"
	},
	{
		"code": "23",
		"category": "Work Expenses",
		"description": "Language Study",
		"includeDescription": "No",
		"itemizedReq": "Always Itemize",
		"receiptReq": "Receipts for all items over $75"
	},
	{
		"code": "24",
		"category": "Work Expenses",
		"description": "Evangelism, Crusades, Campaigns",
		"includeDescription": "Yes",
		"itemizedReq": "Always Itemize",
		"receiptReq": "Receipts for all items over $75"
	},
	{
		"code": "25",
		"category": "Work Expenses",
		"description": "Bible School",
		"includeDescription": "No",
		"itemizedReq": "Always Itemize",
		"receiptReq": "Receipts for all items over $75"
	},
	{
		"code": "26",
		"category": "Work Expenses",
		"description": "Global University (ICI)",
		"includeDescription": "No",
		"itemizedReq": "Always Itemize",
		"receiptReq": "Receipts for all items over $75"
	},
	{
		"code": "27",
		"category": "Work Expenses",
		"description": "Literature",
		"includeDescription": "Yes",
		"itemizedReq": "Always Itemize",
		"receiptReq": "Receipts for all items over $75"
	},
	{
		"code": "28",
		"category": "Work Expenses",
		"description": "Radio, TV Ministry",
		"includeDescription": "No",
		"itemizedReq": "Always Itemize",
		"receiptReq": "Receipts for all items over $75"
	},
	{
		"code": "29",
		"category": "Work Expenses",
		"description": "Business Meals",
		"includeDescription": "No",
		"itemizedReq": "Always Itemize",
		"receiptReq": "Receipts for all items over $75"
	},
	{
		"code": "30",
		"category": "Work Expenses",
		"description": "Other Work Expenses",
		"includeDescription": "Yes",
		"itemizedReq": "Always Itemize",
		"receiptReq": "Receipts for all items over $75"
	}
]

export { qtrOptions };