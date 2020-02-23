import Title from './components/Title.vue';
import AddContactMainPage from './components/AddContactMainPage.vue';
export default [
    { path: "/", component: Title, props: { title: "Welcome" } },
    { 
        path: "/addContact", 
        name: "addContact",
        component: AddContactMainPage
    }
];