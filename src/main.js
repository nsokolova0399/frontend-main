import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import router from './router'
import VueApollo from 'vue-apollo'
import {BootstrapVue} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {ApolloClient} from 'apollo-client'
import {setContext} from 'apollo-link-context'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloLink} from "apollo-link";
import {createUploadLink} from 'apollo-upload-client'
import Notifications from 'vue-notification'
import '/src/assets/index.css'

const authLink = setContext(async (_, {headers}) => {
    // Получаем токен из хранилища
    let token = localStorage.getItem('token')
    try {
        return {
            // Добавляем заголовок authorization с JWT
            headers: {
                ...headers,
                authorization: token ? `JWT ${token}` : "",
            }
        }
    } catch (error) {
        console.log(error)
    }
});

const httpOptions = {
    uri: 'http://127.0.0.1:8000/api/graphql/',
}

const uploadLink = createUploadLink(httpOptions);

export const config = {
    link: ApolloLink.from([authLink.concat(uploadLink)])
}

const apolloClient = new ApolloClient({
    link: authLink.concat(uploadLink),
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'cache-and-network',
        },
    },
})
const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
})

Vue.config.productionTip = false

Vue.use(VueApollo)
Vue.use(BootstrapVue);
Vue.use(Vuelidate);
Vue.use(Notifications);


new Vue({
    router,
    apolloProvider,
    render: h => h(App),
}).$mount('#app')