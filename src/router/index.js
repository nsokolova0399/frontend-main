import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Home',
            meta: {requiresAuth: false},
            component: () => import('../views/Home'),
        },
        {
            path: '/SignUp',
            name: 'SignUp',
            meta: {requiresAuth: false},
            component: () => import('../views/SignUp'),
        },
        {
            path: '/LogIn',
            name: 'LogIn',
            meta: {requiresAuth: false},
            component: () => import('../views/LogIn'),
        },
        {
            path: '/PasswordRecovery',
            name: 'PasswordRecovery',
            meta: {requiresAuth: false},
            component: () => import('../components/RecoveryPass'),
        },
        {
            path: '/NewPassword',
            name: 'NewPassword',
            meta: {requiresAuth: false},
            component: () => import('../components/NewPass'),
        },
        {
            path: '/Login/Menu',
            name: 'Menu',
            meta: {requiresAuth: false},
            component: () => import('../views/Menu'),
            children: [
                {
                    path: '/Login/Menu/User',
                    name: 'User',
                    meta: {requiresAuth: true},
                    component: () => import('../components/personal_account/User'),
                },
                {
                    path: '/Login/Menu/User/ChangePassword',
                    name: 'ChangePass',
                    meta: {requiresAuth: true},
                    component: () => import('../components/personal_account/ChangePass'),
                },
                {
                    path: '/Login/Menu/Application',
                    name: 'Application',
                    meta: {requiresAuth: true},
                    component: () => import('../components/application_account/Application'),
                },
            ]
        },
        {
            path: '/SignUp/activate/(.*)*',
            component: () => import('../components/SignUpConfirmation'),
        },
        {
            path: '/SignUp/password-reset/(.*)*',
            component: () => import('../components/NewPass'),
        },
        {
            path: '/Auth-required',
            component: {render: (h) => h("h1", {class: "error__class"}, ["Требуется аутентификация!"])},
        },
        {
            path: '/:pathMatch(.*)*',
            component: {render: (h) => h("h1", {class: "error__class"}, ["404! Страница не найдена!"])}
        },
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some((route) => route.meta?.requiresAuth)) {
        if (localStorage.getItem('auth') === 'true') next()
        else next('/Auth-required')
    } else {
        localStorage.setItem('auth', false)
        next()
    }
})

export default router

