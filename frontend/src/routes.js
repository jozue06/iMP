import ContactsList from './components/contacts/ContactsList.vue';
import ContactGroupsList from './components/contacts/ContactGroupsList.vue';
import ContactGroupView from './components/contacts/ContactGroupView.vue';
import ContactFullView from './components/contacts/ContactFullView.vue';

import QuarterlyReportCard from './components/quarterlyReports/QuarterlyReportCard.vue';
import QuarterlyReportsList from './components/quarterlyReports/QuarterlyReportsList.vue'

import ItinerationReportList from './components/itinerationReports/ItinerationReportList.vue'
import ItinerationReportCard from './components/itinerationReports/ItinerationReportCard.vue'

import Login from './components/Globals/Login.vue'
import Forgot from './components/Globals/Forgot.vue'
import Reset from './components/Globals/Reset.vue'
import UserSettings from './components/userSettings/UserSettings.vue'

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
		path: "/user/settings",
		name: "settings",
		component: UserSettings,
		meta: {
			requiresAuth: true
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
		path: "/quarterlyReport",
		name: "quarterlyReport",
		component: QuarterlyReportCard,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: "/quarterlyReports",
		name: "quarterlyReports",
		component: QuarterlyReportsList,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: "/itinerationReports",
		name: "itinerationReports",
		component: ItinerationReportList,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: "/itinerationReport",
		name: "itinerationReport",
		component: ItinerationReportCard,
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