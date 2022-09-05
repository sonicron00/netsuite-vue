import axios from "axios";
import Vue from "vue";
import App from "./App.vue";
import nsAuth from "./netsuite-auth";
import { REST } from './helpers'

// Authentication to NS restlets for local dev
if (process.env.NODE_ENV === "development") {
  // This 'should' intercept all requests and apply NS OAuth to authorize
    //@ts-ignore
    window.REST = REST
    axios.interceptors.request.use(request => {
        request.headers.Authorization = nsAuth(request);
        return request;
    });

    const employees = REST.get({action: 'getEmployees'})
    employees.then((result) => {
        console.log(result);
    })
}

Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount("#app");
