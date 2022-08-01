<template>
    <div v-if="getOrders" class="container main-layout">
        <h1 style="margin:20px 0">Your Trips</h1>
        <table class="responsive-table">
            <thead>
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Host name</th>
                    <th scope="col">Stay address</th>
                    <th scope="col">Nights</th>
                    <th scope="col">Guests</th>
                    <th scope="col">Total price</th>
                    <th scope="col">Vection date</th>
                    <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in getOrders">
                    <th scope="row">{{ foramtCreatedAt(order.createdAt) }}</th>
                    <th scope="row">{{ order?.host.fullname }}</th>
                    <td data-title="Stay Address">{{ order.stay.address }}</td>
                    <td data-title="Nights">{{ nigthsAmount(order) }}</td>
                    <td data-title="Guest">{{ guestsAmount(order) }}</td>
                    <td data-title="Total Price">$ {{ order.totalPrice }}</td>
                    <td data-title="Vection date" data-type="currency">{{ formatDate(order) }}</td>
                    <td data-title="Status" data-type="currency"
                        :style="{ 'background-color': checkStatus(order.status) }">{{ order.status }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>

import moment from 'moment'
import { userService } from '../services/user-service.js'


export default {
    name: 'stay-trip',
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
    },
    methods: {
        checkStatus(status) {
            if (status === 'Approved') return '#7bed9f'
            if (status === 'Declined') return '#ff6b81'
            if (status === 'Pending') return '#f6e58d'
        },
        formatDate(order) {
            const startDate = new Date(order.startDate)
            const endDate = new Date(order.endDate)

            return `${startDate.getDate()}.${startDate.getMonth() + 1} - ${endDate.getDate()}.${endDate.getMonth() + 1}.${endDate.getFullYear()}`
        },
        nigthsAmount(order) {
            const startDate = new Date(order.startDate)
            const endDate = new Date(order.endDate)
            const diffTime = Math.abs(endDate - startDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            // if (startDate.getMonth() < endDate.getMonth()) return ((startDate.getDate() - startDate.getDate()) + endDate.getDate())
            // return (endDate.getDate() - startDate.getDate()) - 1\
            if (startDate.getMonth() === endDate.getMonth())   return diffDays -1
                return diffDays
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
        },
    },
    computed: {
        getOrders() {
            var orders = this.$store.getters.ordersForDisplay
            console.log(orders);
            return orders.filter((order)=>order.buyer._id === userService.getLoggedInUser()._id)
        }
    },
    components: {
    }

}
</script>

<style>
</style>