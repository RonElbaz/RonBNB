<template>
    <div class="date-container">
        <label for="a" class="flex date-wraper">
            <div @click="selectStartDatePicker" v-click-outside="unSelectStartDatePicker"
                :class="{ 'unselected-picker': !isStartDatePickerSelected, 'selected-start-date': isStartDatePickerSelected }"
                class="start-date" @mouseover="onStartDateHover" @mouseleave="onStartDateHoverLeave">
                <div class="start-date-line" :class="{ 'end-date-hover': isEndDateHover }">
                    <div class="header">Check in</div>
                    <div class="text">Add dates</div>
                </div>
            </div>
            <div class="end-date" @click="selectEndDatePicker" v-click-outside="unSelectEndDatePicker"
                :class="{ 'unselected-picker': !isEndDatePickerSelected, 'selected-end-date': isEndDatePickerSelected }"
                @mouseover="onEndDateHover" @mouseleave="onEndDateHoverLeave">
                <div class="end-date-line"
                    :class="{ 'guest-hover': isGuestHover, 'unselected-picker': !isEndDatePickerSelected, 'selected-start-date': isEndDatePickerSelected }">
                    <div class="header">Check out</div>
                    <div class="text">Add dates</div>
                </div>
            </div>
            <div class="date-picker">
                <el-date-picker popper-class="header" id="a" @change="emitDate" v-model="selectedDate"
                    type="daterange" />
            </div>
        </label>
    </div>
</template>
<script >
export default {
    name: 'date-picker',
    props: {
        isGuestHover: {
            type: Boolean,
        },
    },
    data() {
        return {
            selectedDate: '',
            isStartDateHover: false,
            isEndDateHover: false,
            isStartDatePickerSelected: false,
            isEndDatePickerSelected: false,
        }
    },
    components: {
    },
    methods: {
        selectStartDatePicker() {
            this.isStartDatePickerSelected = true
        }, unSelectStartDatePicker() {
            this.isStartDatePickerSelected = false
        },
        selectEndDatePicker() {
            this.isEndDatePickerSelected = true
        }, unSelectEndDatePicker() {
            this.isEndDatePickerSelected = false
        },
        onStartDateHover() {
            if (this.isStartDateHover === true) return
            this.isStartDateHover = true
            this.$emit("getStartDateHoverState", this.isStartDateHover)
        },
        onStartDateHoverLeave() {
            if (this.isStartDateHover === false) return
            this.isStartDateHover = false
            this.$emit("getStartDateHoverState", this.isStartDateHover)
        },
        onEndDateHover() {
            if (this.isEndDateHover === true) return
            this.isEndDateHover = true
            // this.$emit("getEndDateHoverState", this.isEndDateHover)
        },
        onEndDateHoverLeave() {
            if (this.isEndDateHover === false) return
            this.isEndDateHover = false
            // this.$emit("getEndDateHoverState", this.isEndDateHover)
        },
        emitDate() {
            this.$emit("getDate", this.selectedDate)
        }
    },
}
</script>

