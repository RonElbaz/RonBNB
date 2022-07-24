<template>
  <!-- <div class="demo-date-picker">
    <div class="block">
      <el-date-picker @change="emitDate"
        v-model="SelectedDate"
        type="daterange"
        start-placeholder="Start date"
        end-placeholder="End date"
        id="R"
        :default-time="defaultTime"
      />
    </div>
  </div> -->

  <div class="date-container">
        <label for="R" class="">
          <div class="date-area">
            <div class="flex space-between">
            <div class="start-date-try left">
                <div class="start-date-line-try">
                    <div class="header">Check in</div>
                    <div class="text">Add dates</div>
                </div>
            </div>
          
            <div class="start-date-try right">
              <div class="start-date-line-try">
                <div class="header">Check out</div>
                <div class="text">Add dates</div>
              </div>
            </div>
            </div>
            <div class="date-picker">
                <el-date-picker popper-class="reserve-date-input"  id="R"  @change="emitDate" @blur="emitDate" v-model="SelectedDate" type="daterange"/>
            </div>
            </div>
        </label>

    </div>
</template>

<script>
export default {
    name: 'date-picker-try',
    data(){
      return {
        SelectedDate:{
        },
      }
    },
    components: {
    },
    methods: {
      emitDate(){
        this.$emit("addDate", this.SelectedDate)
      }
    },
}
</script>
