<template>
    <div class="date-container">
        <label for="a" class="flex date-wraper">
            <div class="start-date" @mouseover="onStartDateHover" @mouseleave="onStartDateHoverLeave">
                <div class="start-date-line" :class="{ 'end-date-hover': isEndDateHover }">
                    <div class="header">Check in</div>
                    <div class="text">Add dates</div>
                </div>
            </div>
            <div class="end-date" @mouseover="onEndDateHover" @mouseleave="onEndDateHoverLeave">
                <div class="end-date-line" :class="{ 'guest-hover': isGuestHover }">
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
            isEndDateHover: false
        }
    },
    components: {
    },
    methods: {
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

