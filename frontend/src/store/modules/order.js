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
        },
        approveOrder(state, { newOrder }) {
            const idx = state.orders.findIndex(currorder => currorder._id === newOrder._id)
            state.orders[idx].status = 'Approved'
        },
        declineOrder(state, { newOrder }) {
            const idx = state.orders.findIndex(currorder => currorder._id === newOrder._id)
            state.orders[idx].status = 'Declined'
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
                newOrder.status = 'Approved'
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
                newOrder.status = 'Declined'
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
            return orders.slice().reverse()
        },
        getOrderStatus(state) {
            if (!state.orders) return
            let stayStatus = [0, 0, 0]
            state.orders.forEach((order) => {
                if (order.status === 'Pending') stayStatus[0]++
                if (order.status === 'Approved') stayStatus[1]++
                if (order.status === 'Declined') stayStatus[2]++
            })
            console.log(stayStatus);
            const statusOrder = {
                labels: ["Pending", "Approved", "Declined"],
                datasets: [
                    {
                        data: stayStatus,
                        backgroundColor: ["#f6e58d", "#7bed9f", "#ff6b81"],
                    },
                ],
            }
            return statusOrder
        },
        getRevneuePerMonth(state) {
            if (!state.orders) return
            // let diff = 0
            let month = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            state.orders.forEach((order) => {
                let orderDate = new Date(order.startDate).getMonth()
                if(order.status === 'Approved') month[orderDate] += order.totalPrice

            })

            const revneuePerMonth = {
                labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December'
                ],
                datasets: [
                    {
                        data: month,
                        backgroundColor: '#f87979',
                        label: 'Revneue per month'
                    },
                ],
            }
            return revneuePerMonth
        },

    }
}