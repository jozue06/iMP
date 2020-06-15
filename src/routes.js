import AddContact from './components/contacts/AddContact.vue';
import ContactsList from './components/contacts/ContactsList.vue';
import ContactFullView from './components/contacts/ContactFullView.vue';
import QuarterlyReportCard from './components/quarterlyReports/QuarterlyReportCard.vue';
import QuerterlyReportsList from './components/quarterlyReports/QuerterlyReportsList.vue'
import GetDistricts from "../GetDistricts.vue"

export default [
	{ path: "/", },
	{
		path: "/addContact", 
		name: "addContact",
		component: AddContact
	},
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
		path: "/getDistricts",
		name: "getDistricts",
		component: GetDistricts
	}
];