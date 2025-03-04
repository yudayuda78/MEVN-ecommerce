import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Account from '../views/Account.vue'
import Men from '../views/Men.vue'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/account', name: 'Account', component: Account },
    { path: '/men', name: 'Men', component: Men}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
