<template>
  <div>
    <!-- <div :class="{ 'open-modal': openSearchBar }"> -->
      <app-header @isOpenScreen="isOpenScreen" />
    <!-- </div> -->
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
  // emits: ['getCountryName'],
  components: {
    appHeader,
    appFooter,
    // countryName: null
  },
  data() {
    return {
      openSearchBar: false
    };
  },
  methods: {
    isOpenScreen(isOpenScreen) {
      this.openSearchBar = isOpenScreen
    }
    // getCountryName(country) {
    //   console.log(country)
    //   this.countryName = country
    // }
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

