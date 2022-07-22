import { orderService } from '../../services/order-service.js'
export const order = {
    state: {
        orders : null,
        
    },
    mutations: {
     setOrders(state, {orders}){
        state.orders = orders
     },
    },
    actions:{
        async loadStays({commit}){
            try{
                var orders = await orderService.query()
                commit({type:'setOrders', orders})
            }
            catch(err){
                console.log("couldnt load orders", err)
            }
        },
    },
    getters: {
        ordersForDisplay({orders}){
            return orders
        }
    }
  }