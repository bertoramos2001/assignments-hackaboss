import Vue from 'vue'
import App from './App.vue'
import router from './router'
//VUE-HEADFUL ES UTIL EN EL SEO, YA QUE PERMITE PONER TITULOSY MAS INFORMACION A CADA PAGINA
import vueHeadful from 'vue-headful'

Vue.component('vue-headful', vueHeadful)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
