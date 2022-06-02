import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import './plugins/base'
import './plugins/chartist'
//import { store } from './store' // eslint-disable-line no-alert
import vuetify from './plugins/vuetify'

//import DateService from '@/services/date.formatter.service'
//import AlertService from '@/services/alert.service.js'

Vue.prototype.event = new Vue()


/* services */
//Vue.use(DateService)
//Vue.use(AlertService)

//import AlertService from './services/alert.service'
//import PermissionService from './services/catalogs/permission.catalog.service'

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    vuetify,
    render: h => h(App)
})