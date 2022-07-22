import {createStore} from 'vuex'
import { stay } from './modules/stay.js'
import {order} from './modules/order.js'

export const store = createStore({
    strict: true,
    state: {
    },
    getters: {
    },
    mutations: {
      
    },
    actions: {
      
    },
    modules: {
        stay,
        order
    },
  })
  
