import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as VueGoogleMaps from 'vue2-google-maps'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueGeolocation from 'vue-browser-geolocation'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBAjHcRhhY12TbnSW31SjEuUIGMDB8us7s',
    libraries: 'places'
  }
})
Vue.use(VueGeolocation)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
