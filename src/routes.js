// import Container from './components/Container.vue';
import AddContactMainPage from './components/AddContactMainPage.vue';
export default [
    { path: "/", },
    { 
        path: "/addContact", 
        name: "addContact",
        component: AddContactMainPage
    }
];