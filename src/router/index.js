import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const router =  new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes:[
        {
            path: '/',
            name: 'Home',
            meta:{requiresAuth:false},
            component: ()=> import('../components/Home'),
        },
        {
            path: '/SignUp',
            name: 'SignUp',
            meta:{requiresAuth:false},
            component: ()=> import('../components/SignUp'),
        },
        {
            path: '/LogIn',
            name: 'LogIn',
            meta:{requiresAuth:false},
            component: ()=> import('../components/LogIn'),
        },
        {
            path: '/Login/Menu',
            name: 'Menu',
            meta:{requiresAuth:true},
            props:true,
            component: ()=> import('../components/Menu'),
            children: [
                {
                    path: '/Login/Menu/Greetings',
                    name: 'GreetingsMenu',
                    meta: {requiresAuth: true},
                    props: true,
                    component: () => import('../components/GreetingsMenu'),
                },
                {
                path: '/Login/Menu/User',
                name: 'User',
                meta:{requiresAuth:true},
                props:true,
                component: ()=> import('../components/User'),
                },
                {
                    path: '/Login/Menu/User/ChangePassword',
                    name: 'ChangePass',
                    meta:{requiresAuth:true},
                    props:true,
                    component: ()=> import('../components/ChangePass'),
                },
                {
                    path: '/Login/Menu/Application',
                    name: 'Application',
                    meta:{requiresAuth:true},
                    props:true,
                    component: ()=> import('../components/Application'),
                },
            ]
        },

        {
            path: '/Auth-required',
            component:{render:(h)=> h("h1",{class:"error__class"},["Требуется аутентификация!"])},
        },
        {
            path: '/:pathMatch(.*)*',
            component:{render:(h)=> h("h1",{class:"error__class"},["404! Страница не найдена!"])}
        },
    ]
})

router.beforeEach((to, from, next) => {
    if(to.matched.some((route) => route.meta?.requiresAuth) ){
            if(localStorage.getItem('auth') === 'true')next()
            else next('/Auth-required')
    }else {
        localStorage.setItem('auth',false)
        next()
    }
})

export default router

