<template>
  <div>
    <!-- <div :class="{ 'open-modal': openSearchBar }"> -->
    <app-header @isOpenScreen="isOpenScreen" />
    <!-- </div> -->
    <div v-if="isLoading" class="loader-container">

      <div class="loader"></div>
    </div>
    <router-view></router-view>
    <app-footer v-if="mobile" />
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
      openSearchBar: false,
      isLoading: false,
      mobile: null,
    }
  },
  methods: {
    cheackScreen() {
      this.windowWidth = window.innerWidth
      if (this.windowWidth < 744) {
        this.mobile = true
        return
      }
      this.mobile = false
      return
    },
  },

  created() {
    this.isLoading = true
    this.$store.dispatch({ type: "loadStays" }).then(() => this.isLoading = false)
    this.$store.dispatch({ type: 'loadUser' })
    this.$store.dispatch({ type: 'loadOrders' })
    window.addEventListener("resize", this.cheackScreen)
    this.cheackScreen()
  },

};
</script>

<style>
</style>

