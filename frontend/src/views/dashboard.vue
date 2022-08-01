<template>
    <div v-if="orderTry" class="container main-layout">
        <div class="dashboard-data-area">
            <div class="data-card total-revenue">
                <h1 class="card-title">Revenues</h1>
                <div class="revenue-container">


                    <div class="revenue-title">
                        <div class="revenue-month">
                            <p class="card-txt ">This month : </p>
                        </div>
                        <div class="revenue-price">
                            <p class="card-txt "> ${{ monthRevneue.toLocaleString() }}</p>
                        </div>
                    </div>
                    <div class="revenue-title">
                        <p class="card-txt ">This year :</p>
                        <p class="card-txt "> ${{ yearRevneue.toLocaleString() }}</p>
                    </div>
                    <div class="revenue-title">
                        <p class="card-txt ">Total : </p>
                        <p class="card-txt "> ${{ foramtRevneue.toLocaleString() }}</p>
                    </div>

                </div>
            </div>
            <div class="data-card">
                <h1 class="card-title">Orders status</h1>
                <PieChart style=" height: 170px; width: 330px;" :chartData="statusOrder" />
            </div>
            <div class="data-card">
                <h1 class="card-title">Revenue per month</h1>
                <BarChart style=" height: 170px; width: 330px;" :chartData="revneuePerMonth" />
            </div>
        </div>
        <table class="responsive-table">
            <thead>
                <tr>
                    <th scope="col">Guest name</th>
                    <th scope="col">Date</th>
                    <th scope="col">Stay title</th>
                    <th scope="col">Nights</th>
                    <th scope="col">Guests</th>
                    <th scope="col">Price per night</th>
                    <th scope="col">Price</th>
                    <th scope="col">Check in - Check out</th>
                    <th scope="col">Status</th>
                    <th scope="col">Decline/Approve</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orderTry">
                    <td >{{ foramtCreatedAt(order.createdAt) }}</td>
                    <td >{{ order.buyer.fullname }}</td>
                    <td data-title="Stay title">{{ order.stay.name }}</td>
                    <td data-title="Nights">{{ nightsAmount(order) }}</td>
                    <td data-title="Guests">{{ guestsAmount(order) }}</td>
                    <td data-title="Price per night">$ {{ order.stay.price }}</td>
                    <td data-title="Total price">$ {{ (order.totalPrice).toLocaleString() }}</td>
                    <td data-title="Check in -Check out" data-type="currency">{{ formatDate(order) }}</td>
                    <td data-title="Status" data-type="currency"
                        :style="{ 'background-color': checkStatus(order.status) }">{{ order.status }}</td>

                    <td data-title="Actions" class="action-container" data-type="currency">
                        <span><img @click="declineOrder(order)" style="height: 20px; width: 20px;"
                                src="../images/dashboard-images/delete-button.png" alt=""></span>
                        <span><img @click="approveOrder(order)" style="height: 20px; width: 20px;"
                                src="../images/dashboard-images/checked.png" alt=""></span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>

import { defineComponent } from "vue";
import { PieChart, BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import { userService } from '../services/user-service.js'
import moment from 'moment'

Chart.register(...registerables);


export default defineComponent({
    name: 'stay-dashboard',
    props: {
    },
    data() {
        return {
            orders: this.$store.getters.ordersForDisplay,


        }
    },
    created() {
        // this.orders = this.$store.getters.ordersForDisplay
        // console.log(this.orders);
    },
    methods: {
        approveOrder(order) {

            this.$store.dispatch({ type: 'approveOrder', order }).then(() => {

                this.statusOrder.datasets[0].data = this.$store.getters.getOrderStatus
                this.open2()
            })
    },
    open2() {
        ElMessage({
            message: 'You order has been approved',
            type: 'success',
        })
    },
    open1() {
        ElMessage({
            message: 'Your order has been declined',
            type: 'warning',
        })
    },
    declineOrder(order) {


        this.$store.dispatch({ type: 'declineOrder', order }).then(() =>{

            this.statusOrder.datasets[0].data = this.$store.getters.getOrderStatus
                     this.open1()
        })

    },
    checkStatus(status) {
        if(status === 'Approved') return '#7bed9f'
if (status === 'Declined') return '#ff6b81'
if (status === 'Pending') return '#f6e58d'
        },
formatDate(order) {

    const startDate = new Date(order.startDate)
    const endDate = new Date(order.endDate)

    return `${startDate.getDate()}.${startDate.getMonth() + 1} - ${endDate.getDate()}.${endDate.getMonth() + 1}.${endDate.getFullYear()}`

},
nightsAmount(order) {
    const startDate = new Date(order.startDate)
    const endDate = new Date(order.endDate)
    if (startDate.getMonth)
        return (endDate.getDate() - startDate.getDate())
},
guestsAmount(order) {
    var sumGuests = 0;
    Object.entries(order.guests).forEach((guest) => {
        sumGuests += guest[1]
    })
    return sumGuests
},
foramtCreatedAt(oredrDate) {
    return moment(oredrDate).fromNow()
}
    },
computed: {
    foramtRevneue() {
        return this.$store.getters.ordersForDisplay.reduce((acc, order) => {
            if (order.status !== 'Approved') return acc
            return acc + order.totalPrice
        }, 0)
    },
    monthRevneue() {
        let monthRevneueArr = this.$store.getters.getRevneuePerMonth.datasets[0].data
        let currMonth = new Date(Date.now()).getMonth()
        return monthRevneueArr[currMonth]
    },
    yearRevneue() {
        let orders = this.$store.getters.ordersForDisplay
        return orders.reduce((acc, order) => {
            if (!order) return
            const year = new Date(order.startDate).getFullYear()
            const currYear = new Date(Date.now()).getFullYear()
            return currYear === year && order.status === 'Approved' ? acc + order.totalPrice : acc
        }, 0)
    },
    statusOrder() {
        return this.$store.getters.getOrderStatus
    },
    revneuePerMonth() {
        return this.$store.getters.getRevneuePerMonth
    },
    orderTry() {
        var orders = this.$store.getters.ordersForDisplay 
        console.log(orders);
        console.log('order.host._id===userService.getLoggedInUser()._id', userService.getLoggedInUser()._id);
        return orders.filter((order)=>order.host._id===userService.getLoggedInUser()._id)
    }

},
components: {
    PieChart,
        BarChart
}

})
</script>

<style>
</style>