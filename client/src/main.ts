import { createApp } from 'vue'
import App from './App.vue'
import { BootstrapVue3 } from 'bootstrap-vue-3'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import { createRouter, createWebHistory } from "vue-router"

const routes = [
    { path: '/store/:id', component: App },
    { path: '/link2/store/:id', component: App },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp(App)
app.use(router)
app.use(BootstrapVue3)

app.mount('#app')
