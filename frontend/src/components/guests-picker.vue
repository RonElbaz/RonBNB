<template>
    <div :class="isHeader ? 'guest-container' : 'guest-container-reserve'" @click="openGuest" @mouseover="onGuestHover"
        @mouseleave="onGuestHoverLeave">
        <div v-if="isHeader" class="guest-wraper">
            <div class="header">Who</div>
            <div class="text">Add guests</div>
        </div>
        <div class="guest-reserve" v-else>
            <div class="flex column">
                <label class="guest-reserve-label">GUESTS</label>
                <input class="input-guests-reserve" disabled :placeholder=getGuests>
            </div>
        </div>
        <div v-if="isGuestSelected" class="space-between guest-dropdown" v-click-outside="closeGuest, null">
            <!-- <div class="guest-holder"> -->
            <section class="guest-section">
                <div class="guest-blank">
                    <div class="guest-space">
                        <div class="guest-blank2">
                            <guest class="guest-component" title="Adults" desc="Ages 13 or above"
                                @addGuest="addAdults" />
                            <guest class="guest-component" title="Children" desc="Ages 2-12" @addGuest="addChildren" />
                            <guest class="guest-component" title="Infants" desc="Ages 13 or above"
                                @addGuest="addInfants" />
                            <guest class="guest-component" title="Pets" desc="Bringing a service animal?"
                                @addGuest="addPets" />
                        </div>
                    </div>
                </div>
            </section>
            <!-- </div> -->
        </div>
    </div>
</template>
<script>
import guest from './guest.vue'

export default {

    name: "guests-picker",
    props: {
        isHeader: {
            type: Boolean,
            required: true,
        },

    },
    data() {
        return {
            scrollNav: null,
            mobile: null,
            mobileNav: null,
            windowWidth: null,
            selected: null,
            guests: { "adults": 1 },
            isGuestSelected: false,
            isGuestHover: false,
        }
    },
    created() {
    },
    methods: {
        onGuestHover() {
            if (this.isGuestHover === true) return
            this.isGuestHover = true
            // this.$emit("getGuestHoverState", this.isGuestHover)
        },
        onGuestHoverLeave() {
            if (this.isGuestHover === false) return
            this.isGuestHover = false
            // this.$emit("getGuestHoverState", this.isGuestHover)
        },
        openGuest() {
            if (this.isGuestSelected === true) return
            this.isGuestSelected = true
            // this.$emit("getGuestSelectState", this.isGuestSelected)
        },
        closeGuest() {
            if (this.isGuestSelected === false) return
            this.isGuestSelected = false
            // this.$emit("getGuestSelectState", this.isGuestSelected)
        },
        toogleMobileNav() {
            this.mobileNav = !this.mobileNav
        },
        cheackScreen() {
            this.windowWidth = window.innerWidth
            if (this.windowWidth <= 750) {
                this.mobile = true
                return
            }
            this.mobile = false
            this.mobileNav = false
            return
        },
        buildDate(value) {
            this.search.startDate = value._value[0]
            this.search.endDate = value._value[0]
        },
        addDestination() {
            this.search.destination = this.destination
        },
        addAdults(adultAmount) {
            this.guests.adults = adultAmount
            this.$emit("addGuests", this.guests)
        },
        addChildren(childrenAmount) {
            this.guests.children = childrenAmount
            this.$emit("addGuests", this.guests)
        },
        addInfants(infantsAmount) {
            this.guests.infants = infantsAmount
            this.$emit("addGuests", this.guests)
        },
        addPets(petsAmount) {
            this.guests.pets = petsAmount
            this.$emit("addGuests", this.guests)
        },
    },
    computed: {
        getGuests() {
            var sumGuests = 0;
            Object.entries(this.guests).forEach((guest) => {
                sumGuests += guest[1]
            })
            return (sumGuests === 1) ? `1 guest` : `${sumGuests} guests`
        }
    },
    components: { guest },
}

</script>