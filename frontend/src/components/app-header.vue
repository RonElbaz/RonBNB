<template>
    <!-- <header class="header main-header ">
        <div class="logo">logo</div>
        <div>
            <button>Anywhere</button>
            <span>|</span>
            <button>Any week</button>
            <span>|</span>
            <button>Add guests <span>@</span></button>
        </div>
        <nav>
            <div><span>Explore</span></div>
            <div><span>Switch to hosting</span><span>@</span></div>
            <div><span>≡</span><img src="" alt=""></div>
        </nav>
    </header> -->
    <header class="main-layout" :class="{ 'scrolled-nav': scrollNav }">
        <nav class="flex justify-content-space-between">
            <div class="branding flex">
                <router-link class="link" to="/"><img src="../img/airbnb-logo.png" alt="logo"></router-link>
            </div>
            <div v-if="!modalSearch" class="flex align-items-center search align-self-center border-thin-black-round"
                :class="{ 'icon-active': modalSearch }">
                <button @click="modalSearch = true" class="clean-button">Anywhere</button>
                <span>|</span>
                <button @click="modalSearch = true" class="clean-button">Any week</button>
                <span>|</span>
                <button @click="modalSearch = true" class="clean-button guest">Add guests </button>
                <div class="search-logo"><i class="fa-solid fa-magnifying-glass"></i></div>
            </div>
            <div v-if="modalSearch" class="flex align-items-center search align-self-center border-thin-black-round"
                :class="{ 'icon-active': modalSearch }">
                <div>
                    <div>Where</div>
                    <input type="text" placeholder="Search destinations" v-model="destination" @blur="addDestination">
                </div>
                <span>|</span>
                <date-picker @getDate="buildDate" />
                <span>|</span>
                <guests-picker @addGuests="addGuest" class="clean-button guest" />
                <!-- <button @click="modalSearch = true">Add guests </button> -->
                <div class="search-logo" @click="searchFilter"><i class="fa-solid fa-magnifying-glass"></i></div>
            </div>

            <!-- <ul v-show="!mobile" class="navigation clean-list">
                <li>
                    <router-link class="link clean-list" to="/">📚Books</router-link>
                </li>
                <li>
                    <router-link class="link clean-list" to="/">📌Keep</router-link>
                </li>
                <li>
                    <router-link class="link clean-list" to="/">📧Email</router-link>
                </li>
            </ul> -->
            <div v-show="!mobile" class="flex align-items-center justify-content-end bar">
                <!-- <div><span>Explore</span></div> -->
                <div><span>Switch to hosting</span></div>
                <div><img class="globe" src="../img/globe.png" alt="" /></div>
                <div class="flex align-items-center dropdown border-thin-black-round">
                    <span>☰</span>
                    <img src="../img/user1.jpg" alt="" />
                </div>
            </div>
            <!-- <div class="icon">
                <span @click="toogleMobileNav" :class="{ 'icon-active': mobileNav }"></span>
            </div> -->
            <!-- <transition name="mobile-nav"> -->
            <!-- <ul v-show="mobileNav" class="dropdown-nav"> -->
            <!-- <li> -->
            <!-- <router-link class="link" to="/book">📚Books</router-link> -->
            <!-- </li> -->
            <!-- <li> -->
            <!-- <router-link class="link" to="/keep">📌Keep</router-link> -->
            <!-- </li> -->
            <!-- <li> -->
            <!-- <router-link class="link" to="/email">📧Email</router-link> -->
            <!-- </li> -->
            <!-- </ul> -->
            <!-- </transition> -->
        </nav>
    </header>
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
        }
    },
    created() {
        window.addEventListener("resize", this.cheackScreen)
        this.cheackScreen()
    },
    methods: {
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