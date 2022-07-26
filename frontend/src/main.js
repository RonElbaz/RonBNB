import { createApp } from 'vue'
import App from './App.vue'
import { clickOutsideDirective } from './directives/index.js'
import router from './router'
import { store } from './store'
import './scss/styles.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueGoogleMaps from '@fawmi/vue-google-maps'


const app = createApp(App)
app.directive('click-outside', clickOutsideDirective)
app.use(router)
app.use(store)
app.use(ElementPlus)
app.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyCu2xnj9pU7OHvQ6QLVokiC7MX10YQ6Klg',
    },
})
app.mount('#app')
