<template>
    <div class="flex">
        <div>
            <div>{{ title }}</div>
            <div>{{ desc }}</div>
        </div>
        <div>
            <button :disabled="isDecBtnDis" @click="dec"><span>-</span></button>
            <div><span>{{ amount }}</span></div>
            <button :disabled="isIncBtnDis" @click="inc"><span>+</span></button>
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