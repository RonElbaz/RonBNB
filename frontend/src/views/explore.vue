<template>
  <div>
    <div class="main-layout filter-container">

      <stay-filter :showList="false" :stayLength="getStays.length" />
    </div>
      <div v-if="isLoading" class="loader-container">

      <div   class="loader"></div>
    </div>
    <stay-list v-if="!isLoading" :stays="getStays" />
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
      isLoading: false


    }
  },
  async created() {
    const { destination } = this.$route.params
    if (destination === '') return
    var filter = {};
    this.isLoading = true
    filter.destination = destination
    setTimeout(()=>{
      this.isLoading = false
    },2000)
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






