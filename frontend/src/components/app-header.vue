<template>
    <div>
        <header class="main-layout" :class="{ 'modal-header': modalSearch }">
            <nav class="flex justify-content-space-between" :class="{ 'nav-modal': modalSearch }">
                <div class="branding flex align-items-center">
                    <router-link class="link" to="/"><img src="../img/airbnb-logo.png" alt="logo"></router-link>
                </div>
                <div v-if="!modalSearch" @click="openModal"
                    class="flex align-items-center align-self-center border-thin-black-round search">
                    <button @click="openModalSearchDest" class="clean-button"><span>Anywhere</span></button>
                    <button @click="openModalSearchDate" class="clean-button"><span>Any week</span></button>
                    <button @click="openModalSearchGuest" class="clean-button guest">
                        <div>Add guests</div>
                    </button>
                    <div class="search-logo"><i class="fa-solid fa-magnifying-glass"></i></div>
                </div>
                <div v-show="!mobile" class="flex align-items-center justify-content-end bar">
                    <!-- <div class="explore"><span>Explore</span></div> -->
                    <div class="switch"><span>Switch to hosting</span></div>
                    <img class="globe" src="../img/globe.png" alt="" />
                    <div class="flex align-items-center dropdown border-thin-black-round user">
                        <span>☰</span>
                        <img src="../img/user1.jpg" alt="" />
                    </div>
                </div>
            </nav>
            <transition name="mobile-nav">
                <div v-if="modalSearch" class=" search-modal" @click="showSearchTxt" v-click-outside="closeSearchTxt">
                    <div class="flex align-items-center border-thin-black-roundalign-self-center search ">
                        <div class="dest-container" @click="selectDestPicker" v-click-outside="unSelectDestPicker"
                            :class="{ 'selected-picker': !isDestPickerSelected, 'selected-dest': isDestPickerSelected }">
                            <label class="dest-wraper" for="dest">
                                <div class=" destination">
                                    <div class="header">Where</div>
                                    <input id="dest" type="text" class="text" placeholder="Search destinations"
                                        v-model="destination" @blur="addDestination">
                                </div>
                            </label>
                        </div>
                        <!-- <div class="start-date" @click="selectDatePicker" v-click-outside="unSelectDatePicker"
                            :class="{ 'selected-picker': !isDatePickerSelected, 'selected-date': isDatePickerSelected }">
                            <div class="header">Check in</div>
                            <div class="text">Add dates</div>
                        </div> -->
                        <!-- <div class="line">
                            <div class="dummy">a</div>
                        </div> -->

                        <!-- <div class="end-date">
                            <div class="header">Check out</div>
                            <div class="text">Add dates</div>
                        </div> -->

                        <date-picker id="date" @getDate="buildDate" class="date-picker" />

                        <guests-picker :isHeader="true" @addGuests="addGuest" @click="selectGuestPicker"
                            v-click-outside="unSelectGuestPicker"
                            :class="{ 'selected-picker': !isGuestPickerSelected, 'selected-guest': isGuestPickerSelected }"
                            class="clean-button guest-modal" />
                        <div v-if="!isSearchTxt" class="search-modal-logo" @click="searchFilter"><i
                                class="fa-solid fa-magnifying-glass">
                            </i>
                        </div>
                        <div v-if="isSearchTxt" class="search-modal-logo-open flex space-between align-items-center"
                            @click="searchFilter">
                            <i class="fa-solid fa-magnifying-glass"></i>
                            <div class="search-modal-logo-open-txt">Search</div>
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
            isGuestPickerSelected: false,
            isDestPickerSelected: false,
            isDatePickerSelected: false,
            isSearchTxt: false,
        }
    },
    created() {
        window.addEventListener("resize", this.cheackScreen)
        this.cheackScreen()
    },
    methods: {
        aaa() { console.log("aaa") },
        showSearchTxt() {
            this.isSearchTxt = true
        },
        closeSearchTxt() {
            this.isSearchTxt = false
        },
        openModalSearchDest() {
            this.modalSearch = true
            this.selectDestPicker()
        },
        openModalSearchDate() {
            this.modalSearch = true
            this.selectDatePicker()
        },
        openModalSearchGuest() {
            this.modalSearch = true
            this.selectGuestPicker()
        },
        selectDestPicker() {
            this.isDestPickerSelected = true

        }, unSelectDestPicker() {
            this.isDestPickerSelected = false
        },
        selectDatePicker() {
            this.isDatePickerSelected = true
        }, unSelectDatePicker() {
            this.isDatePickerSelected = false
        },
        selectGuestPicker() {
            this.isGuestPickerSelected = true
        }, unSelectGuestPicker() {
            this.isGuestPickerSelected = false
        },
        openModal() {
            this.isOpenScreen = true
            this.showSearchTxt()
        },
        closeModal() {
            this.isOpenScreen = false
            this.modalSearch = false
            this.isGuestPickerSelected = false
            this.isDestPickerSelected = false
            this.isDatePickerSelected = false
            this.closeSearchTxt()
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
        addGuest(guests) {
            this.search.guests = guests
        },
        searchFilter() {
            var startDate = new Date(this.search.startDate).getTime()
            var endDate = new Date(this.search.endDate).getTime()
            var currDate = Date.now()
            if (currDate > startDate || currDate > endDate) {
                console.log("cant pick past dates")
                return
            }
            var filter = { ...this.search }
            delete filter.startDate
            delete filter.endDate
            this.$store.dispatch({ type: "setFilter", filterBy: filter })
            this.closeModal()
        }
    },
    computed: {},
    components: { datePicker, guestsPicker },
}

</script>