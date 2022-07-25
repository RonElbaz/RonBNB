<template>
  <div>
    <div class="main-layout filter-container">

      <stay-filter :showList="false" :stayLength="getStays.length" />
    </div>
    <stay-list :stays="getStays" />
  </div>

</template>

<script>
import stayFilter from "../components/stay-filter.vue"
import StayList from "../components/stay-list.vue"

export default {
  name: 'explore',
  // emits: ["getCountryName"],
  data() {
    return {

    }
  },
  async created() {
    const { destination } = this.$route.params
    if (destination === '') return
    var filter = {};
    filter.destination = destination
    await this.$store.dispatch({ type: "setFilter", filterBy: { ...filter } })
    // await this.$emit("getCountryName", this.getStays[0].address.country)
  },
  methods: {

  },
  computed: {
    getStays() {
      return this.$store.getters.staysForDisplay
    },
  },
  components: {
    stayFilter,
    StayList,

  },

}
</script>






