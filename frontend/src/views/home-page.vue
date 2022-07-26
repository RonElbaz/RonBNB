<template>
  <!-- <div class="main-layout filter-container"> -->
    <stay-filter :showList="true" />
  <!-- </div> -->
  <stay-list :stays="getStays" />
</template>

<script>
import appHeader from "../components/app-header.vue"
import appFooter from "../components/app-footer.vue"
import stayFilter from "../components/stay-filter.vue"
import StayList from "../components/stay-list.vue"

export default {
  name: "main-app",
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
      return this.$store.getters.staysForDisplay
    },
  },
};
</script>

<style>
</style>
