import {createRouter, createWebHashHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContactManager from "@/views/ContactManager.vue";
import AddContact from "@/views/AddContact.vue";
import EditContact from "@/views/EditContact.vue";
import ViewContact from "@/views/ViewContact.vue";
import PageNotFound from "@/views/PageNotFound.vue";
import Login from "@/views/Login.vue";
import Signup from "@/views/Signup.vue";

const routes = [
    {
        path: '/',
        name: 'HomeView',
        redirect: "/contacts",
        component: HomeView
    }, {
        path: '/contacts',
        name: 'ContactManager',
        component: ContactManager
    }, {
        path: '/contacts/add',
        name: 'AddContact',
        component: AddContact
    }, {
        path: '/contacts/edit/:id',
        name: 'EditContact',
        component: EditContact
    }, {
        path: '/contacts/view/:id',
        name: 'ViewContact',
        component: ViewContact
    }, {
        path: '/login',
        name: 'Login',
        component: Login
    }, {
        path: '/signup',
        name: 'Signup',
        component: Signup
    }, {
        path: '/:pathMatch(.*)*',
        name: 'PageNotFound',
        component: PageNotFound
    }
]

const router = createRouter({
    history: createWebHashHistory('/'),
    routes: routes
})

export default router
