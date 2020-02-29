// import Container from './components/Container.vue';
import AddContact from './components/contacts/AddContact.vue';
import Contacts from './components/contacts/Contacts.vue';
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
    }
];