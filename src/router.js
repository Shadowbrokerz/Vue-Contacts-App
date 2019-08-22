import Vue from 'vue';
import Router from 'vue-router';
import ContactsList from './views/ContactsList.vue';
import ContactSingle from './views/ContactSingle.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'contactsList',
            component: ContactsList
        },
        {
            path: '/contact/:id',
            name: 'contact',
            component: ContactSingle
        }
    ]
});
