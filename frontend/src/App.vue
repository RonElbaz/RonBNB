<template>
  <div>
    <!-- <div :class="{ 'open-modal': openSearchBar }"> -->
    <app-header @isOpenScreen="isOpenScreen" />
    <!-- </div> -->
    <div v-if="isLoading" class="loader-container">

      <div   class="loader"></div>
    </div>
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
      openSearchBar: false,
      isLoading: false
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
    this.isLoading = true
    this.$store.dispatch({ type: "loadStays" }).then(() => this.isLoading = false)
    this.$store.dispatch({ type: 'loadUser' })
    this.$store.dispatch({ type: 'loadOrders' })
  },

};
</script>

<style>
</style>

