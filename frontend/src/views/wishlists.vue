<template>
   <section class="main-layout">
    <h1 style="margin:20px 0">Your Wishlist</h1>
    <stay-list :isWishList="true" :stays="getStays" />
    </section>
</template>

<script>
import appHeader from "../components/app-header.vue"
import appFooter from "../components/app-footer.vue"
import stayFilter from "../components/stay-filter.vue"
import StayList from "../components/stay-list.vue"

export default {
    name: "wishList-app",
    props: [],
    components: {
        appHeader,
        appFooter,
        stayFilter,
        StayList,

    },
    data() {
        return {

        };
    },
    methods: {},

    created() {

    },
    computed: {
        getStays() {
            return this.$store.getters.favoritStays
        },
    },
};
</script>

<style>
</style>
