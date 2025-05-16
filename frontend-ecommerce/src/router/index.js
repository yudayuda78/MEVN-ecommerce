import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Account from '../views/Account.vue'
import Men from '../views/Men.vue'
import Women from '../views/Women.vue'
import Kid from '@/views/Kid.vue'
import Other from '@/views/Other.vue'
import Cart from '@/views/Cart.vue'
import DetailProduct from '@/views/DetailProduct.vue'
import LoginAdmin from '@/views/LoginAdmin.vue'
import Admin from '@/views/Admin.vue'
import Product from '@/views/admin/Product.vue'
import Order from '@/views/admin/Order.vue'
import Appearance from '@/views/admin/Appearance.vue'
import Setting from '@/views/admin/Setting.vue'
import Dashboard from '@/views/admin/Dashboard.vue'

import { useAuthStore } from '@/stores/authStore'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/account', name: 'Account', component: Account, meta: { requiresAuth: true } },
    { path: '/men', name: 'Men', component: Men},
    { path: '/women', name: 'Women', component: Women},
    { path: '/kid', name: 'Kid', component: Kid},
    { path: '/other', name: 'Other', component: Other},
    { path: '/cart', name: 'Cart', component: Cart},
    { path: '/product/:id', name:'DetailProduct', component: DetailProduct, prop:true},
    { path: '/admin', 
      name:'Admin', 
      component: Admin, 
      children:[
        { path: 'dashboard', name:'Dashboard', component:Dashboard},
        { path: 'product', name:'Product', component: Product},
        { path: 'order', name:'Order', component: Order},
        { path: 'appearance', name:'Appeareance', component: Appearance},
        { path: 'setting', name:'Setting', component: Setting}
    ]},
    { path: '/loginadmin', name:'LoginAdmin', component: LoginAdmin}
    
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
