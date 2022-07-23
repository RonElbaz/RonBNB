<template>
    <app-header />
    <router-view />
    <app-footer />
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
    return {};
  },
  methods: {},

  created() {
    this.$store.dispatch({type:"loadStays"})
    this.$store.dispatch({type:'loadUser'})
  },
  unmounted() {},
};
</script>

<style></style>

