import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Account from '../views/Account.vue'
import Men from '../views/Men.vue'
import { useAuthStore } from '@/stores/authStore'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/account', name: 'Account', component: Account, meta: { requiresAuth: true } },
    { path: '/men', name: 'Men', component: Men}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    if (to.meta.requiresAuth && !authStore.isLoggedIn) {
        next('/') // Redirect ke home jika tidak login
    } else {
        next() // Lanjutkan ke halaman yang diakses
    }
})

export default router
