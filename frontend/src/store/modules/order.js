import { orderService } from '../../services/order-service.js'
export const order = {
    state: {
        orders : null,
        
    },
    mutations: {
     setOrders(state, {orders}){
        state.orders = orders
     },
     addOrder(state, {newOrder}){
        state.orders.push(newOrder)
        console.log(state.orders)
     }
    },
    actions:{
        async loadOrders({commit}){
            try{
                var orders = await orderService.query()
                commit({type:'setOrders', orders})
            }
            catch(err){
                console.log("couldnt load orders", err)
            }
        },
        async addOrder({commit},{order}){
            try{
                var newOrder = await orderService.addOrder(order)
                commit({type:'addOrder', newOrder})
            }
            catch(err){
                console.log("couldnt add order", err);
            }
        }
    },
    getters: {
        ordersForDisplay({orders}){
            return orders
        }
    }
  }