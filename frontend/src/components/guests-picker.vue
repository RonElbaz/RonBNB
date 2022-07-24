<template>
    <div class="guest-container" @click="openGuest" @mouseover="onGuestHover" @mouseleave="onGuestHoverLeave">
        <div v-if="isHeader" class="guest-wraper">
            <div class="header">Who</div>
            <div class="text">Add guests</div>
        </div>
        <div class="guest-reserve" v-else>
            <div class="flex column">
                <label>Guests</label>
                <input class="input-guests-reserve" disabled :placeholder=getGuests>
            </div>
        </div>
        <div v-if="isGuest" class="flex column space-between guest-dropdown" v-click-outside="closeGuest, null">
            <guest class="guest-component" title="adults" desc="Ages 13 or above" @addGuest="addAdults" />
            <guest class="guest-component" title="Children" desc="Ages 2-12" @addGuest="addChildren" />
            <guest class="guest-component" title="Infants" desc="Ages 13 or above" @addGuest="addInfants" />
            <guest class="guest-component" title="Pets" desc="Bringing a service animal?" @addGuest="addPets" />
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
            guests: {},
            isGuest: false,
            isGuestHover: false,
        }
    },
    created() {
    },
    methods: {
        onGuestHover() {
            if (this.isGuestHover === true) return
            this.isGuestHover = true
            this.$emit("getGuestHoverState", this.isGuestHover)
        },
        onGuestHoverLeave() {
            if (this.isGuestHover === false) return
            this.isGuestHover = false
            this.$emit("getGuestHoverState", this.isGuestHover)
        },
        openGuest() {
            this.isGuest = true
        },
        closeGuest() {
            this.isGuest = false
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