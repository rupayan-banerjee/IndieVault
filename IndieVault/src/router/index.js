import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import News from '../views/News.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Games from '../views/Games.vue'
import Profile from '../views/Profile.vue'
import auth from '../store/auth'

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'Home', component: Home },
    { path: '/news', name: 'News', component: News },
    { path: '/about', name: 'About', component: About },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    { path: '/games', name: 'Games', component: Games },
    { path: '/profile', name: 'Profile', component: Profile, meta: { requiresAuth: true } }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !auth.state.currentUser) {
        return next('/')
    }
    next()
})

export default router