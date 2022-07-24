<template>
  <div class="demo-date-picker">
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
  </div>

  <div class="date-container">
        <label for="R" class="flex date-wraper">
          <div class="date-area">
            <div class="start-date">
                <div class="header">Check in</div>
                <div class="text">Add dates</div>
            </div>

            <div class="end-date">
                <div class="header">Check out</div>
                <div class="text">Add dates</div>
            </div>
                <el-date-picker popper-class="date-input" id="R" @change="emitDate" @blur="emitDate" v-model="selectedDate" type="daterange"
                    :default-time="defaultTime" />
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
