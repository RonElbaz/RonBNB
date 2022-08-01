<template>
    <div class="space-between ">
        <div class="guest-info">
            <div class="guest-type">{{ title }}</div>
            <div class="guest-conditions">{{ desc }}</div>
        </div>
        <div class="align-items-center guest-amount">
            <div class="guest-calc">
                <button class="flex btn-amount btn-minus" :disabled="isDecBtnDis" @click="dec"
                    :class="{ 'btn-disable': isDecBtnDis }">
                    <span class="btn-amount-icon">
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                            role="presentation" focusable="false"
                            style="display: block; fill: none; height: 12px; width: 12px; stroke: currentcolor; stroke-width: 5.33333; overflow: visible;">
                            <path d="m2 16h28"></path>
                        </svg>
                    </span>
                </button>
                <div class="guest-number"><span>{{ amount }}</span></div>
                <button class="flex btn-amount btn-plus" :disabled="isIncBtnDis" @click="inc"
                    :class="{ 'btn-disable': isIncBtnDis }">
                    <span class="btn-amount-icon">
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                            role="presentation" focusable="false"
                            style="display: block; fill: none; height: 12px; width: 12px; stroke: currentcolor; stroke-width: 5.33333; overflow: visible;">
                            <path d="m2 16h28m-14-14v28"></path>
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    </div>
</template>
<script>

export default {

    name: "guest",
    props: {
        title: {
            type: String,
        },
        desc: {
            type: String,
        },
    },
    data() {
        return {
            amount: 0,
            isDecBtnDis: true,
            isIncBtnDis: false,
        }
    },
    created() {
    },
    methods: {
        inc() {
            this.amount = this.amount + 1
            if (this.amount >= 10) {
                this.isIncBtnDis = true
            }
            this.isDecBtnDis = false
            this.$emit("addGuest", this.amount)

        },
        dec() {
            this.amount = this.amount - 1
            if (this.amount <= 0) {
                this.isDecBtnDis = true
            }
            this.isIncBtnDis = false
            this.$emit("addGuest", this.amount)
        }
    },
    computed: {},
    components: {},
}

</script>