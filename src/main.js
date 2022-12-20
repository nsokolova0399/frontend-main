import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import router from './router'
import '/public/index.css'
import VueApollo from 'vue-apollo'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import MyButtonDark from "./components/UI/MyButtonDark";
import MyButtonLight from "./components/UI/MyButtonLight";
import { ApolloClient } from 'apollo-client'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from "apollo-link";
import { createUploadLink } from 'apollo-upload-client'

let token = '';
setInterval(() => {
          token = localStorage.getItem('token')
    }
    , 60*1000)

const authLink = setContext((_, { headers }) => {
      token = localStorage.getItem('token')
      return {
            headers: {
                  ...headers,
                  authorization: token ? `JWT ${token}` : "",
            }
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
// Vue.config.errorHandler = function (err, vm, info) {
//       console.log('%cError', 'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;', err)
//       console.log(vm,info);
// }
Vue.use(VueApollo)
Vue.use(BootstrapVue);
Vue.use(Vuelidate);


new Vue({
      router,
      apolloProvider,
      MyButtonDark,
      MyButtonLight,
      render: h => h(App),
}).$mount('#app')