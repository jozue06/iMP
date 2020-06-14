// import Container from './components/Container.vue';
import AddContact from './components/contacts/AddContact.vue';
import Contacts from './components/contacts/Contacts.vue';
import AddQuarterlyReport from './components/quarterlyReports/AddQuarterlyReport.vue';
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
        component: AddQuarterlyReport
    },
    {
        path: "/quarterlyReports",
        name: "quarterlyReports",
        component: QuerterlyReportsList
    }
];