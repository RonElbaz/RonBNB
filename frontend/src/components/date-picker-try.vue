<template>
 
  <div class="date-container">
    <label for="R" class="">
      <div class="date-area">
        <div class="flex space-between">
          <div class="start-date-try left">
            <div class="start-date-line-try">
              <div class="header">CHECK IN</div>
              <div class="text">{{getStartDate }}</div>
            </div>
          </div>

          <div class="start-date-try right">
            <div class="start-date-line-try">
              <div class="header">CHECK OUT</div>
              <div class="text">{{ getEndDate }}</div>
            </div>
          </div>
        </div>
        <div class="date-picker">
          <el-date-picker popper-class="reserve-date-input" id="R" @change="emitDate" @blur="emitDate"
            v-model="selectedDate" type="daterange" />
        </div>
      </div>
    </label>

  </div>

</template>

<script>





export default {
  name: 'date-picker-try',
  data() {
    return {
      selectedDate: [],
    }
  },
  props: {
    startDate: {
      startDate: String,
    },
    endDate: {
      endDate: String,
    }
  },
  created(){
    let dateToEdit = []
    dateToEdit[0] =  new Date(+this.startDate * 1000).toString()
    dateToEdit[1] = new Date(+this.endDate * 1000).toString()
    console.log('this.selectedDate',this.selectedDate);
    
    if(dateToEdit.length > 0){
      this.$emit("addDate", dateToEdit)
    }
  },
  components: {

  },
  methods: {
    emitDate() {
      console.log('this.selectedDate',this.selectedDate);
      this.$emit("addDate", this.selectedDate)
    },
   

  },
  computed:{
    getStartDate() {
      var startDate = new Date(+this.startDate * 1000)

      if (this.selectedDate[0]) {
        return this.selectedDate[0].toLocaleDateString()
    } 
     startDate = `${ startDate.getDate()}/${ startDate.getMonth() + 1}/${ startDate.getFullYear()}`
   this.selectedDate[0] = startDate

   return this.selectedDate[0]
  },
    getEndDate() {
      var endDate = new Date(+this.endDate * 1000)
      if (this.selectedDate[1]) {
        return this.selectedDate[1].toLocaleDateString()
    } 
    endDate = `${ endDate.getDate()}/${ endDate.getMonth() + 1}/${ endDate.getFullYear()}`
   this.selectedDate[1] = endDate
   return this.selectedDate[1]
  },
}
}
</script>
