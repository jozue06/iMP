export const sidebarSections = {
	mainSection: {
		el: '#sidebar',
		items: [
			{
				report: 1,
				route: "/contacts",
				childMsg: 'Contacts' 
			},
			{
				report: 2,
				route: "/quarterlyReports",
				childMsg: 'Quarterly Reports' 
			},
			{
				report: 3,
				route: "/itinerationReports",
				childMsg: 'Itineration Reports' 
			},
			{
				report: 4,
				route: "/MAReports",
				childMsg: 'MA Reports' 
			},
			{
				report: 5,
				route: "/SDRReports",
				childMsg: 'SDR Reports' 
			},
			{
				report: 6,
				route: "/institutionalReports",
				childMsg: 'Institutional Reports' 
			},
			{
				report: 7,
				route: "/contactGroups",
				childMsg: 'Contact Groups' 
			},
			{
				report: 8,
				route: "/statementList",
				childMsg: 'Statements Manager' 
			},
		]
	},

	newRecordsSection: {
		el: '#sidebar',
		items: [
			{
				report: 2,
				route: "/quarterlyReport",
				childMsg: 'Start qtr report' 
			},
			{
				report: 3,
				route: "/reportName",
				childMsg: 'Start itn report' 
			},
			{
				report: 4,
				route: "/reportName",
				childMsg: 'Start SDR' 
			},
			{
				report: 5,
				route: "/reportName",
				childMsg: 'Start isti report' 
			},
		]
	},
	
	importExportSection: {
		el: '#sidebar',
		items: [
			{
				report: 2,
				route: "/reportName",
				childMsg: 'to' 
			},
			{
				report: 3,
				route: "/reportName",
				childMsg: 'here' 
			},
			{
				report: 4,
				route: "/reportName",
				childMsg: 'make SDR' 
			},
			{
				report: 5,
				route: "/reportName",
				childMsg: 'make isti report' 
			},
		]
	}
};