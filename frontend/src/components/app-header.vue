<template>
    <div>
        <header class="main-layout">
            <nav class="flex justify-content-space-between">
                <div class="branding flex align-items-center">
                    <router-link class="link" to="/"><img src="../img/airbnb-logo.png" alt="logo">
                    </router-link>
                    <router-link class="link" to="/"><h1 class="app-logo">Rentya</h1>
                    </router-link>
                    
                </div>
                <div v-if="!isOpenScreen" @click="openModal" class="flex align-items-center align-self-center search">
                    <button @click="selectDestPicker" class="clean-button"><span>{{ countryName }}</span></button>
                    <button @click="selectDatePicker" class="clean-button"><span>Any week</span></button>
                    <button @click="selectGuestPicker" class="clean-button guest">
                        <div>Add guests</div>
                    </button>
                    <div @click="goExplore" class="search-logo"><i class="fa-solid fa-magnifying-glass"></i></div>
                </div>
                <div v-show="!mobile" class="flex align-items-center justify-content-end bar">
                    <!-- <div class="explore"><span>Explore</span></div> -->
                    <div class="switch"><span>Become a Host</span></div>
                    <img class="globe" src="../img/globe.png" alt="" />
                    <div class="flex align-items-center dropdown border-thin-black-round user">
                        <span>☰</span>
                        <img src="../img/user1.jpg" alt="" />
                    </div>
                </div>
            </nav>
            <transition name="mobile-nav">
                <div v-if="isOpenScreen" class="search-modal flex justify-content-center">
                    <div class="flex align-items-center border-thin-black-roundalign-self-center search-bar"
                        @click="showSearchTxt" v-click-outside="closeSearchTxt"
                        :class="{ 'search-modal-active': isSearchModalActive }">
                        <div class="dest-container flex align-items-center " @click="selectDestPicker"
                            v-click-outside="unSelectDestPicker"
                            :class="{ 'unselected-picker': !isDestPickerSelected, 'selected-dest': isDestPickerSelected }">
                            <label class="dest-wraper" for="dest"
                                :class="{ 'date-hover': isStartDateHover, 'start-date-selected': isStartDateSelected }">
                                <div class="header">Where</div>
                                <input ref="searchInput" id="dest" autocomplete="off" type="text" class="text"
                                    placeholder="Search destinations" v-model="destination" @blur="addDestination">
                            </label>
                        </div>
                        <date-picker id="date" :isGuestHover="isGuestHover" :isGuestSelect="isGuestSelect"
                            @getDate="addDate" @getStartDateSelectedState="onStartDateSelectedChange"
                            @getStartDateHoverState="onStartDateHoverChange"
                            @getEndDateHoverState="onEndDateHoverChange" class="date-component" />

                        <guests-picker @getGuestHoverState="onGuestHoverChange"
                            @getGuestSelectState="onGuestSelectChange" :isHeader="true" @addGuests="addGuest"
                            @click="selectGuestPicker" v-click-outside="unSelectGuestPicker"
                            :class="{ 'unselected-picker': !isGuestPickerSelected, 'selected-guest': isGuestPickerSelected }"
                            class="clean-button guest-picker-component" />
                        <div v-if="!isSearchModalActive" class="search-modal-logo" @click="searchFilter"><i
                                class="fa-solid fa-magnifying-glass">
                            </i>
                        </div>
                        <div v-if="isSearchModalActive"
                            class="search-modal-logo-open flex space-between align-items-center" @click="searchFilter">
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
            search: {},
            destination: null,
            isOpenScreen: false,
            isGuestPickerSelected: false,
            isStartDateSelected: false,
            isDestPickerSelected: false,
            isSearchModalActive: false,
            isStartDateHover: false,
            isEndDateHover: false,
            isGuestHover: false,
            isGuestSelect: false,
        }
    },
    created() {
        window.addEventListener("resize", this.cheackScreen)
        this.cheackScreen()
    },
    mounted() {

    },
    methods: {
        onGuestHoverChange(guestHoverState) {
            this.isGuestHover = guestHoverState
        },
        onGuestSelectChange(guestSelectState) {
            this.isGuestSelect = guestSelectState
        },
        onStartDateSelectedChange(startDateSelectedState) {
            this.isStartDateSelected = startDateSelectedState
        },
        onStartDateHoverChange(startDateHoverState) {
            this.isStartDateHover = startDateHoverState
        },
        onEndDateHoverChange(endDateHoverState) {
            this.isEndDateHover = endDateHoverState
        },
        showSearchTxt() {
            this.isSearchModalActive = true
        },
        closeSearchTxt() {
            this.isSearchModalActive = false
        },
        selectDestPicker() {
            this.isDestPickerSelected = true
        }, unSelectDestPicker() {
            this.isDestPickerSelected = false
        },
        selectGuestPicker() {
            this.isGuestPickerSelected = true
        }, unSelectGuestPicker() {
            this.isGuestPickerSelected = false
        },
        openModal() {
            this.isOpenScreen = true
            this.$emit("isOpenScreen", this.isOpenScreen)
            this.showSearchTxt()
        },
        closeModal() {
            this.isOpenScreen = false
            this.isGuestPickerSelected = false
            this.isDestPickerSelected = false
            this.isDatetPickerSelected = false
            this.closeSearchTxt()
            this.$emit("isOpenScreen", this.isOpenScreen)
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
        addDate(value) {
            this.search.startDate = value[0]
            this.search.endDate = value[1]
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
            // this.$store.dispatch({ type: "setFilter", filterBy: {...filter} })
            this.closeModal()
            console.log(filter);
            this.$router.push(`/explore/${filter.destination}`)
        }
    },
    computed: {
        countryName() {
            const { destination } = this.$route.params
            if (destination) {
                return this.$store.getters.staysForDisplay[0].address.country
            } else {
                this.destination = ""
                return "Anywhere"
            }

        },
    },
    components: { datePicker, guestsPicker }
}
</script>