<template>
    <div>
        <header class="main-layout" :class="{ 'modal-header': modalSearch }">
            <nav class="flex justify-content-space-between" :class="{ 'nav-modal': modalSearch }">
                <div class="branding flex align-items-center">
                    <router-link class="link" to="/"><img src="../img/airbnb-logo.png" alt="logo"></router-link>
                </div>
                <div v-if="!modalSearch" @click="isOpenScreen = true"
                    class="flex align-items-center align-self-center border-thin-black-round search"
                    :class="{ 'icon-active': modalSearch }">
                    <button @click="modalSearch = true" class="clean-button"><span>Anywhere</span></button>
                    <button @click="modalSearch = true" class="clean-button"><span>Any week</span></button>
                    <button @click="modalSearch = true" class="clean-button guest">
                        <div>Add guests</div>
                    </button>
                    <div class="search-logo"><i class="fa-solid fa-magnifying-glass"></i></div>
                </div>
                <div v-show="!mobile" class="flex align-items-center justify-content-end bar">
                    <!-- <div><span>Explore</span></div> -->
                    <div><span>Switch to hosting</span></div>
                    <img class="globe" src="../img/globe.png" alt="" />
                    <div class="flex align-items-center dropdown border-thin-black-round">
                        <span>☰</span>
                        <img src="../img/user1.jpg" alt="" />
                    </div>
                </div>
            </nav>
            <transition name="mobile-nav">
                <div v-if="modalSearch" class=" search-modal">
                    <div class="flex align-items-center border-thin-black-roundalign-self-center search">
                        <label for="dest">
                            <div class="destination">
                                <div class="header">Where</div>
                                <input id="dest" type="text" class="text" placeholder="Search destinations"
                                    v-model="destination" @blur="addDestination">
                            </div>
                        </label>
                        <div class="start-date">
                            <div class="header">Check in</div>
                            <div class="text">Add dates</div>

                        </div>
                        <div class="line">
                            <div class="dummy">a</div>
                        </div>
                        <div class="end-date">
                            <div class="header">Check out</div>
                            <div class="text">Add dates</div>
                        </div>
                        <date-picker id="date" popper-class="custom-date-picker" @getDate="buildDate"
                            class="date-picker" />
                        <guests-picker @addGuests="addGuest" class="clean-button guest" />
                        <div class="search-modal-logo" @click="searchFilter"><i class="fa-solid fa-magnifying-glass"></i>
                        </div>
                    </div>
                </div>
            </transition>

        </header>

        <div v-if="isOpenScreen" @click="closeModal" class="modal-screen"></div>
    </div>
</template>

<script>
import datePicker from './date-picker.vue'
import guestsPicker from './guests-picker.vue'
export default {
    name: "app-header",
    data() {
        return {
            scrollNav: null,
            mobile: null,
            mobileNav: null,
            windowWidth: null,
            modalSearch: false,
            search: {},
            destination: null,
            isOpenScreen: false,
        }
    },
    created() {
        window.addEventListener("resize", this.cheackScreen)
        this.cheackScreen()
    },
    methods: {
        closeModal() {
            this.isOpenScreen = false
            this.modalSearch = false
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
            console.log(this.search)
        },
        addDestination() {
            this.search.destination = this.destination
            console.log(this.search)
        },
        addGuest(guests) {
            this.search.guests = guests
            console.log(this.search)
        },
        SearchFilter() {
            // connect this.search to the filter
            // this.search
        }
    },
    computed: {},
    components: { datePicker, guestsPicker },
}

</script>