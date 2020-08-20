import ContactsList from './components/contacts/ContactsList.vue';
import ContactGroupsList from './components/contacts/ContactGroupsList.vue';
import ContactGroupView from './components/contacts/ContactGroupView.vue';
import ContactFullView from './components/contacts/ContactFullView.vue';
import QuarterlyReportCard from './components/quarterlyReports/QuarterlyReportCard.vue';
import QuerterlyReportsList from './components/quarterlyReports/QuerterlyReportsList.vue'
import Login from './components/Login.vue'

export default [
	{
		path: '/',
		redirect: {
			name: "login"
		}
	},
	{
		path: "/login",
		name: "login",
		component: Login
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
		path: "/contactGroups",
		name: "contactGroups",
		component: ContactGroupsList
	},
	{
		path: "/groupView",
		name: "groupView",
		component: ContactGroupView
	},
];