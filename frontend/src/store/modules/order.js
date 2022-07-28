import { orderService } from '../../services/order-service.js'
export const order = {
    state: {
        orders: null,

    },
    mutations: {
        setOrders(state, { orders }) {
            state.orders = orders
        },
        addOrder(state, { newOrder }) {
            state.orders.push(newOrder)
            console.log(state.orders)
        },
        approveOrder(state, { newOrder }) {
            const idx = state.orders.findIndex(currorder => currorder._id === newOrder._id)
            state.orders[idx].status = 'Approve'
        },
        declineOrder(state, { newOrder }) {
            const idx = state.orders.findIndex(currorder => currorder._id === newOrder._id)
            state.orders[idx].status = 'Decline'
        },
    },
    actions: {
        async loadOrders({ commit }) {
            try {
                var orders = await orderService.query()
                commit({ type: 'setOrders', orders })
            }
            catch (err) {
                console.log("couldnt load orders", err)
            }
        },
        async addOrder({ commit }, { order }) {
            try {
                var newOrder = await orderService.addOrder(order)
                commit({ type: 'addOrder', newOrder })
            }
            catch (err) {
                console.log("couldnt add order", err);
            }
        },
        async approveOrder({ commit }, { order }) {
            try {
                var newOrder = { ...order }
                newOrder.status = 'Approve'
                newOrder = await orderService.addOrder(newOrder)
                commit({ type: 'approveOrder', newOrder })
            }
            catch (err) {
                console.log("couldnt approve order", err);
            }
        },
        async declineOrder({ commit }, { order }) {
            try {
                var newOrder = { ...order }
                newOrder.status = 'Decline'
                newOrder = await orderService.addOrder(newOrder)
                console.log(newOrder);
                commit({ type: 'declineOrder', newOrder })
            }
            catch (err) {
                console.log("couldnt decline order", err);
            }
        }
    },
    getters: {
        ordersForDisplay({ orders }) {
            return orders
        },
        getOrderStatus(state) {
            if (!state.orders) return
            let stayStatus = [0, 0, 0]
            state.orders.forEach((order) => {
                if (order.status === 'Pending') stayStatus[0]++
                if (order.status === 'Approve') stayStatus[1]++
                if (order.status === 'Decline') stayStatus[2]++
            })
            return stayStatus
        },
        getRevneuePerMonth(state) {
            if (!state.orders) return
            let month = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            state.orders.forEach((order) => {
                let orderDate = new Date(order.startDate).getMonth()
                month[orderDate] += order.totalPrice
            })

            console.log(month);
            return month
        }
    }
}