<template>
    <div v-if="orders" class="container main-layout">
        <h1>Your Trips</h1>
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
                    <th scope="col">status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orders">
                    <th scope="row">{{ foramtCreatedAt(order.createdAt) }}</th>
                    <th scope="row">{{ order.host.fullname }}</th>
                    <td data-title="Released">{{ order.stay.address }}</td>
                    <td data-title="Released">{{ nigthsAmount(order) }}</td>
                    <td data-title="Released">{{ guestsAmount(order) }}</td>
                    <td data-title="Studio">$ {{ order.totalPrice }}</td>
                    <td data-title="Worldwide Gross" data-type="currency">{{ formatDate(order) }}</td>
                    <td data-title="Domestic Gross" data-type="currency" style="border-radius: 12px;"
                        :style="{ 'background-color': checkStatus(order.status) }">{{ order.status }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>

import moment from 'moment'

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
        },
           foramtCreatedAt(oredrDate) {
            return moment(oredrDate).fromNow()
        }
    },
    computed: {
     
    },
    components: {
    }

}
</script>

<style>
</style>