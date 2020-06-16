import ContactsList from './components/contacts/ContactsList.vue';
import ContactGroupsList from './components/contacts/ContactGroupsList.vue';
import ContactFullView from './components/contacts/ContactFullView.vue';
import QuarterlyReportCard from './components/quarterlyReports/QuarterlyReportCard.vue';
import QuerterlyReportsList from './components/quarterlyReports/QuerterlyReportsList.vue'

export default [
	{ path: "/", },
	{
		path: "/contacts", 
		name: "contacts",
		component: ContactsList
	},
	{
		path: "/addQuarterlyReport",
		name: "addQuarterlyReport",
		component: QuarterlyReportCard
	},
	{
		path: "/quarterlyReports",
		name: "quarterlyReports",
		component: QuerterlyReportsList
	},
	{
		path: "/contactFullView",
		name: "contactFullView",
		component: ContactFullView
	},
	{
		path: "/contactGroups",
		name: "contactGroups",
		component: ContactGroupsList
	}
];