<template>
  <div>
    <app-header />
    <router-view></router-view>
    <app-footer />
  </div>
</template>

<script>
import appHeader from "./components/app-header.vue";
import appFooter from "./components/app-footer.vue";
export default {
  name: "main-app",
  props: [],
  components: {
    appHeader,
    appFooter,
  },
  data() {
    return {

    };
  },
  methods: {
  },

  created() {
    this.$store.dispatch({ type: "loadStays" })
    this.$store.dispatch({ type: 'loadUser' })
    this.$store.dispatch({ type: 'loadOrders' })
  },

};
</script>

<style>
</style>

