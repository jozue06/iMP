import ContactsList from './components/contacts/ContactsList.vue';
import ContactGroupsList from './components/contacts/ContactGroupsList.vue';
import ContactGroupView from './components/contacts/ContactGroupView.vue';
import ContactFullView from './components/contacts/ContactFullView.vue';
import QuarterlyReportCard from './components/quarterlyReports/QuarterlyReportCard.vue';
import QuerterlyReportsList from './components/quarterlyReports/QuerterlyReportsList.vue'
import Login from './components/Login.vue'
import Forgot from './components/Forgot.vue'
import Reset from './components/Reset.vue'

export default [
	{
		path: '/home',
		meta: {
			requiresAuth: true
		}
	},
	{
		path: "/login",
		name: "login",
		component: Login,
		meta: {
			requiresAuth: false
		}
	},
	{
		path: "/forgot",
		name: "forgot",
		component: Forgot,
		meta: {
			requiresAuth: false
		}
		
	},
	{
		path: "/user/reset/:token",
		name: "reset",
		component: Reset,
		meta: {
			requiresAuth: false
		}
	},
	{
		path: "/contacts", 
		name: "contacts",
		component: ContactsList,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: "/quarterlyReport/:reportId",
		name: "quarterlyReport",
		component: QuarterlyReportCard,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: "/quarterlyReports",
		name: "quarterlyReports",
		component: QuerterlyReportsList,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: "/contactFullView/:contactId",
		name: "contactFullView",
		component: ContactFullView,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: "/contactGroups",
		name: "contactGroups",
		component: ContactGroupsList,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: "/groupView",
		name: "groupView",
		component: ContactGroupView,
		meta: {
			requiresAuth: true
		}
	},
];