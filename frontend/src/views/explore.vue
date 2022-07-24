<template>

<div class="main-layout filter-container">
   
    <stay-filter :showList="false" />
  </div>
  <stay-list :stays="getStays" />


</template>

<script>
import stayFilter from "../components/stay-filter.vue"
import StayList from "../components/stay-list.vue"

export default {
    name: 'explore',
    data() {
        return {
            
        }
    },
    async created() {
            const { destination } = this.$route.params
            if(destination === '') return
            var filter = {};
            filter.destination = destination
            this.$store.dispatch({ type: "setFilter", filterBy: { ...filter } })    
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






