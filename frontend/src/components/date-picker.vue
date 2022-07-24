<template>
    <div class="date-container">
        <label for="a" class="flex date-wraper">
            <div class="start-date">
                <div class="start-date-line">
                    <div class="header">Check in</div>
                    <div class="text">Add dates</div>
                </div>
            </div>

            <div class="end-date">
                <div class="header">Check out</div>
                <div class="text">Add dates</div>
            </div>
            <div class="date-picker">
                <el-date-picker class="date-picker-input" id="a" @blur="pick" v-model="value" type="daterange"
                    :default-time="defaultTime" />
            </div>
        </label>

    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const emit = defineEmits(['getDate', 'eventB'])
const value = ref('')
const defaultTime = ref([
    new Date(2022, 24, 7, 0, 0, 0),
    new Date(2000, 2, 1, 23, 59, 59),
])
// const elDivDatedocument.querySelector
function pick() {
    const date = value.value
    emit("getDate", value)
}
</script>
<style scoped>
.date-picker {
    display: none;
}
</style>
