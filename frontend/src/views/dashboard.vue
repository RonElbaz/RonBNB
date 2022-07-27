<template>
    <div v-if="orders" class="container main-layout">
        <div class="dashboard-data-area flex space-between">
            <div class="data-card total-revenue">
                <h1>Total revenues</h1>
                <p>Total revenues : <span> $ {{ foramtRevneue }}</span></p>
                
            </div>
            <div class="data-card">
                <h1>Orders status</h1>
                <PieChart style=" height: 170px; width: 330px;" :chartData="statusOrder" />
            </div>
            <div class="data-card">
                <h1>Revenue per month</h1>
                <BarChart style=" height: 170px; width: 330px;" :chartData="revneuePerMonth" />
            </div>
        </div>
        <table class="responsive-table">
            <thead>
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Guest name</th>
                    <th scope="col">Stay title</th>
                    <th scope="col">Nigths</th>
                    <th scope="col">Guests</th>
                    <th scope="col">Price/Nigth</th>
                    <th scope="col">Price</th>
                    <th scope="col">Check in- Check out</th>
                    <th scope="col">status</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orders">
                    <th scope="row">{{ order.createdAt }}</th>
                    <th scope="row">{{ order.buyer.fullname }}</th>
                    <td data-title="Released">{{ order.stay.name }}</td>
                    <td data-title="Released">{{ nigthsAmount(order) }}</td>
                    <td data-title="Released">{{ guestsAmount(order) }}</td>
                    <td data-title="Released">$ {{ order.stay.price }}</td>
                    <td data-title="Studio">$ {{ order.totalPrice }}</td>
                    <!-- <td data-title="Worldwide Gross" data-type="currency">{{order.startDate }}- {{order.endDate}}</td> -->
                    <td data-title="Worldwide Gross" data-type="currency">{{ formatDate(order) }}</td>
                    <td data-title="Domestic Gross" data-type="currency"
                        :style="{ 'background-color': checkStatus(order.status) }">{{ order.status }}</td>

                    <td data-title="Domestic Gross" class="action-container" data-type="currency">
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

Chart.register(...registerables);


export default defineComponent({
    name: 'stay-dashboard',
    props: {
    },
    data() {
        return {
            orders: null,
            statusOrder: {
                labels: ["Pending", "Approved", "Decline"],
                datasets: [
                    {
                        data: null,
                        backgroundColor: ["#f6e58d", "#7bed9f", "#ff6b81"],
                    },
                ],
            },
            revneuePerMonth: {
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
                        data: null,
                        backgroundColor: '#f87979',
                    },
                ],
            },

        }
    },
    created() {
        this.orders = this.$store.getters.ordersForDisplay
        // console.log(this.orders);
        this.statusOrder.datasets[0].data = this.$store.getters.getOrderStatus
        this.revneuePerMonth.datasets[0].data = this.$store.getters.getRevneuePerMonth
        var test = this.$store.getters.getRevneuePerMonth
        console.log(test);
    },
    methods: {
        approveOrder(order) {
            this.$store.dispatch({ type: 'approveOrder', order })
            this.statusOrder.datasets[0].data = this.$store.getters.getOrderStatus
        },
        declineOrder(order) {
            this.$store.dispatch({ type: 'declineOrder', order })
            this.statusOrder.datasets[0].data = this.$store.getters.getOrderStatus
        },
        checkStatus(status) {
            if (status === 'Approve') return '#7bed9f'
            if (status === 'Decline') return '#ff6b81'
            if (status === 'Pending') return '#f6e58d'
        },
        formatDate(order) {

            const startDate = new Date(order.startDate)
            const endDate = new Date(order.endDate)

            return `${startDate.getDate()}.${startDate.getMonth()} - ${endDate.getDate()}.${endDate.getMonth()}.${endDate.getFullYear()}`

        },
        nigthsAmount(order) {
            console.log(order);
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
        }
    },
    computed: {
        foramtRevneue() {
            return this.orders.reduce((acc, order) => {
                if (order.status !== 'Approve') return acc
                return acc + order.totalPrice
            }, 0)
        },

    },
    components: {
        PieChart,
        BarChart
    }

})
</script>

<style>
</style>