import AddContact from './components/contacts/AddContact.vue';
import Contacts from './components/contacts/Contacts.vue';
import QuarterlyReportCard from './components/quarterlyReports/QuarterlyReportCard.vue';
import QuerterlyReportsList from './components/quarterlyReports/QuerterlyReportsList.vue'

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
        component: Contacts
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
    }
];