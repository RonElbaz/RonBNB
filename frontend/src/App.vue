<template>
  <div>
    <user-msg/>
    <!-- <div :class="{ 'open-modal': openSearchBar }"> -->
    <app-header @isOpenScreen="isOpenScreen" />
    <!-- </div> -->
    <div v-if="isLoading" class="loader-container">
      <div class="loader"></div>
    </div>
    <router-view></router-view>
    <app-footer />
  </div>
</template>

<script>
import appHeader from "./components/app-header.vue";
import appFooter from "./components/app-footer.vue";
import userMsg from './components/user-msg.vue'
export default {
  name: "main-app",
  props: [],
  components: {
    appHeader,
    appFooter,
    userMsg
  },
  data() {
    return {
      openSearchBar: false,
      isLoading: false
    };
  },
  methods: {
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

