<template>
    <!-- <div class="header-container" :class="{ 'open-modal': isOpenScreen }"> -->
    <div :style="isOpenScreen ? withOutShadow : withShadow"
        :class="currentRoute === 'stay-details' ? ' header-container details-layout' : ' header-container main-layout'">
        <header>
            <!--    <div class="header-container" :class="{ 'open-modal': isOpenScreen }"> -->
            <!--   <header class="main-layout"> -->
            <nav class="flex justify-content-space-between">
                <div v-show="!mobile" class="branding flex align-items-center">
                    <router-link class="link" to="/">
                        <svg class="logo" width="36" height="32" style="display:block">
                            <path
                                d="M29.3864 22.7101C29.2429 22.3073 29.0752 21.9176 28.9157 21.5565C28.6701 21.0011 28.4129 20.4446 28.1641 19.9067L28.1444 19.864C25.9255 15.0589 23.5439 10.1881 21.0659 5.38701L20.9607 5.18316C20.7079 4.69289 20.4466 4.18596 20.1784 3.68786C19.8604 3.0575 19.4745 2.4636 19.0276 1.91668C18.5245 1.31651 17.8956 0.833822 17.1853 0.502654C16.475 0.171486 15.7005 -9.83959e-05 14.9165 4.23317e-08C14.1325 9.84805e-05 13.3581 0.171877 12.6478 0.503224C11.9376 0.834571 11.3088 1.31742 10.8059 1.91771C10.3595 2.46476 9.97383 3.05853 9.65572 3.68858C9.38521 4.19115 9.12145 4.70278 8.8664 5.19757L8.76872 5.38696C6.29061 10.1884 3.90903 15.0592 1.69015 19.8639L1.65782 19.9338C1.41334 20.463 1.16057 21.0102 0.919073 21.5563C0.75949 21.9171 0.592009 22.3065 0.448355 22.7103C0.0369063 23.8104 -0.094204 24.9953 0.0668098 26.1585C0.237562 27.334 0.713008 28.4447 1.44606 29.3804C2.17911 30.3161 3.14434 31.0444 4.24614 31.4932C5.07835 31.8299 5.96818 32.002 6.86616 32C7.14824 31.9999 7.43008 31.9835 7.71027 31.9509C8.846 31.8062 9.94136 31.4366 10.9321 30.8639C12.2317 30.1338 13.5152 29.0638 14.9173 27.5348C16.3194 29.0638 17.6029 30.1338 18.9025 30.8639C19.8932 31.4367 20.9886 31.8062 22.1243 31.9509C22.4045 31.9835 22.6864 31.9999 22.9685 32C23.8664 32.002 24.7561 31.8299 25.5883 31.4932C26.6901 31.0444 27.6554 30.3161 28.3885 29.3804C29.1216 28.4447 29.5971 27.3341 29.7679 26.1585C29.9287 24.9952 29.7976 23.8103 29.3864 22.7101ZM14.9173 24.377C13.1816 22.1769 12.0678 20.1338 11.677 18.421C11.5169 17.7792 11.4791 17.1131 11.5656 16.4573C11.6339 15.9766 11.8105 15.5176 12.0821 15.1148C12.4163 14.6814 12.8458 14.3304 13.3374 14.0889C13.829 13.8475 14.3696 13.7219 14.9175 13.7219C15.4655 13.722 16.006 13.8476 16.4976 14.0892C16.9892 14.3307 17.4186 14.6817 17.7528 15.1151C18.0244 15.5181 18.201 15.9771 18.2693 16.4579C18.3556 17.114 18.3177 17.7803 18.1573 18.4223C17.7661 20.1349 16.6526 22.1774 14.9173 24.377ZM27.7406 25.8689C27.6212 26.6908 27.2887 27.4674 26.7762 28.1216C26.2636 28.7759 25.5887 29.2852 24.8183 29.599C24.0393 29.9111 23.1939 30.0217 22.3607 29.9205C21.4946 29.8089 20.6599 29.5239 19.9069 29.0824C18.7501 28.4325 17.5791 27.4348 16.2614 25.9712C18.3591 23.3846 19.669 21.0005 20.154 18.877C20.3723 17.984 20.4196 17.0579 20.2935 16.1475C20.1791 15.3632 19.8879 14.615 19.4419 13.9593C18.9194 13.2519 18.2378 12.6768 17.452 12.2805C16.6661 11.8842 15.798 11.6777 14.9175 11.6777C14.0371 11.6777 13.1689 11.8841 12.383 12.2803C11.5971 12.6765 10.9155 13.2515 10.393 13.9589C9.94707 14.6144 9.65591 15.3624 9.5414 16.1465C9.41524 17.0566 9.4623 17.9822 9.68011 18.8749C10.1648 20.9993 11.4748 23.384 13.5732 25.9714C12.2555 27.4348 11.0845 28.4325 9.92769 29.0825C9.17468 29.5239 8.34007 29.809 7.47395 29.9205C6.64065 30.0217 5.79525 29.9111 5.0162 29.599C4.24581 29.2852 3.57092 28.7759 3.05838 28.1217C2.54585 27.4674 2.21345 26.6908 2.09411 25.8689C1.97932 25.0334 2.07701 24.1825 2.37818 23.3946C2.49266 23.0728 2.62663 22.757 2.7926 22.3818C3.0274 21.851 3.27657 21.3115 3.51759 20.7898L3.54996 20.7197C5.75643 15.9419 8.12481 11.0982 10.5894 6.32294L10.6875 6.13283C10.9384 5.64601 11.1979 5.14267 11.4597 4.6563C11.7101 4.15501 12.0132 3.68171 12.3639 3.2444C12.6746 2.86903 13.0646 2.56681 13.5059 2.35934C13.9473 2.15186 14.4291 2.04426 14.9169 2.04422C15.4047 2.04418 15.8866 2.15171 16.3279 2.35911C16.7693 2.56651 17.1593 2.86867 17.4701 3.24399C17.821 3.68097 18.1242 4.15411 18.3744 4.65538C18.6338 5.13742 18.891 5.63623 19.1398 6.11858L19.2452 6.32315C21.7097 11.0979 24.078 15.9415 26.2847 20.7201L26.3046 20.7631C26.5498 21.2936 26.8033 21.8419 27.042 22.382C27.2082 22.7577 27.3424 23.0738 27.4566 23.3944C27.7576 24.1824 27.8553 25.0333 27.7406 25.8689Z"
                                fill="currentcolor"></path>
                        </svg>
                    </router-link>
                    <router-link v-if="isShowNameLogo" class="link" to="/">
                        <h1 class="app-logo logo">rentya</h1>
                    </router-link>

                </div>
                <div v-if="mobile" @click="openModal" class="flex align-items-center align-self-center search"
                    :class="{ 'search-mobile': mobile }">
                    <div v-show="mobile" class="search-mobile-body">
                        <button class="flex search-mobile-dest">
                            <div class="search-mobile-dest-icon">
                                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                                    role="presentation" focusable="false"
                                    style="display: block; height: 16px; width: 16px; fill: currentcolor;">
                                    <path
                                        d="M13 0c7.18 0 13 5.82 13 13 0 2.868-.929 5.519-2.502 7.669l7.916 7.917-2.828 2.828-7.917-7.916A12.942 12.942 0 0 1 13 26C5.82 26 0 20.18 0 13S5.82 0 13 0zm0 4a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"
                                        opacity=".8"></path>
                                </svg>
                            </div>
                            <div class="flex search-mobile-content">
                                <div class="flex search-mobile-content-header">
                                    <div class="flex">
                                        <span>Where to?</span>
                                    </div>
                                </div>
                                <div class="flex search-mobile-content-footer">
                                    <div class="flex"> <span>Anywhere</span></div>
                                    <div>•</div>
                                    <div class="flex"> <span>Any week</span></div>
                                    <div>•</div>
                                    <div class="flex"><span> Add guests</span></div>
                                </div>
                            </div>

                        </button>
                    </div>
                    <div v-show="mobile" class="flex search-mobile-filter">
                        <button class="flex">
                            <div class="flex icon-container">
                                <div class="flex icon-container-filter">
                                    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                                        role="presentation" focusable="false"
                                        style="display: block; height: 16px; width: 16px; fill: rgb(34, 34, 34);">
                                        <path
                                            d="M5 8c1.306 0 2.418.835 2.83 2H14v2H7.829A3.001 3.001 0 1 1 5 8zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6-8a3 3 0 1 1-2.829 4H2V4h6.17A3.001 3.001 0 0 1 11 2zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>

                <div v-if="!isOpenScreen" @click="openModal"
                    class="flex align-items-center align-self-center search search-desktop">
                    <button @click="selectDestPicker"
                        :class="currentRoute === 'stay-details' ? 'clean-button serach-detils' : 'clean-button dest-btn'"><span>{{
                                currentRoute === 'stay-details' ? "Start youer search" : countryName
                        }}</span></button>
                    <button @click="selectDatePicker" class="clean-button date-btn"><span
                            v-if="currentRoute !== 'stay-details'">Any week</span></button>
                    <button @click="selectGuestPicker" class="clean-button guest-btn">
                        <div>
                            <span v-if="currentRoute !== 'stay-details'">Add guests</span>
                        </div>
                    </button>
                    <div v-show="!mobile" @click="goExplore" class="search-logo"><i
                            class="fa-solid fa-magnifying-glass"></i></div>
                </div>
                <div v-show="!mobile" class="flex align-items-center justify-content-end bar">
                    <!-- <div class="explore"><span>Explore</span></div> -->
                    <div class="switch"><span>Become a Host</span></div>
                    <div class="globe">
                        <svg @click="checkIt" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                            role="presentation" focusable="false"
                            style="display: block; height: 16px; width: 16px; fill: currentcolor;">
                            <path
                                d="m8.002.25a7.77 7.77 0 0 1 7.748 7.776 7.75 7.75 0 0 1 -7.521 7.72l-.246.004a7.75 7.75 0 0 1 -7.73-7.513l-.003-.245a7.75 7.75 0 0 1 7.752-7.742zm1.949 8.5h-3.903c.155 2.897 1.176 5.343 1.886 5.493l.068.007c.68-.002 1.72-2.365 1.932-5.23zm4.255 0h-2.752c-.091 1.96-.53 3.783-1.188 5.076a6.257 6.257 0 0 0 3.905-4.829zm-9.661 0h-2.75a6.257 6.257 0 0 0 3.934 5.075c-.615-1.208-1.036-2.875-1.162-4.686l-.022-.39zm1.188-6.576-.115.046a6.257 6.257 0 0 0 -3.823 5.03h2.75c.085-1.83.471-3.54 1.059-4.81zm2.262-.424c-.702.002-1.784 2.512-1.947 5.5h3.904c-.156-2.903-1.178-5.343-1.892-5.494l-.065-.007zm2.28.432.023.05c.643 1.288 1.069 3.084 1.157 5.018h2.748a6.275 6.275 0 0 0 -3.929-5.068z">
                            </path>
                        </svg>
                    </div>
                    <div @click="isShowDropdownMenu = !isShowDropdownMenu"
                        class="flex align-items-center border-thin-black-round menu">
                        <div>
                            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                                role="presentation" focusable="false"
                                style="display: block; fill: none; height: 16px; width: 16px; stroke: currentcolor; stroke-width: 3; overflow: visible;">
                                <g fill="none" fill-rule="nonzero">
                                    <path d="m2 16h28"></path>
                                    <path d="m2 24h28"></path>
                                    <path d="m2 8h28"></path>
                                </g>
                            </svg>
                        </div>
                        <div class="user-img-container">
                            <img class="user-img" src="../img/user1.jpg" alt="" />
                        </div>

                        <div class="dropdown-menu-container" v-if="isShowDropdownMenu"
                            v-click-outside="closeDropdownMenu">
                            <ul class="dropdown-menu">
                                <!-- ! show login-section and public-section and hide the others only if a user has not logged in ,  -->
                                <!-- v-if="" -->
                                <div v-if="checkLoggedIn" class="login-section">
                                    <li>
                                        <p class="link signup">Sign up</p>
                                    </li>
                                    <li>
                                        <p class="link login" @click="loggedInModal">Log in
                                        </p>
                                    </li>
                                </div>
                                <div v-if="checkLoggedIn" class="public-section">

                                    <li>
                                        <router-link class="link experience" to="/">Host your home</router-link>
                                    </li>
                                    <li>
                                        <router-link class="link experience" to="/">Host an experience</router-link>
                                    </li>
                                    <li>
                                        <router-link class="link help" to="/">Help</router-link>
                                    </li>
                                </div>
                                <div v-if="!checkLoggedIn" class="user-info-section">
                                    <li>
                                        <router-link class="link messages" to="/">Messages</router-link>
                                    </li>
                                    <li>
                                        <router-link class="link notifications" to="/">Notifications</router-link>
                                    </li>
                                    <li>
                                        <router-link class="link trips" to="/trips">Trips</router-link>
                                    </li>
                                    <li>
                                        <router-link class="link wishlists" to="/wishlists">Wishlists</router-link>
                                    </li>
                                    <li>
                                        <router-link class="link experience" to="/stay/dashboard/">Dashboard
                                        </router-link>
                                    </li>
                                </div>
                                <div v-if="!checkLoggedIn" class="user-manage-section">
                                    <li>
                                        <router-link class="link manage-listings " to="/">Manage listings</router-link>
                                    </li>
                                    <li>
                                        <router-link class="link experience" to="/">Host an experience</router-link>
                                    </li>
                                    <li>
                                        <router-link class="link host" to="/">Refer a Host</router-link>
                                    </li>
                                    <li>
                                        <router-link class="link account" to="/">Account</router-link>
                                    </li>
                                </div>
                                <div v-if="!checkLoggedIn" class="user-logout-section">
                                    <li>
                                        <router-link class="link help" to="/">Help</router-link>
                                    </li>
                                    <li>
                                        <router-link @click="doLogout" class="link logout" to="/">Log out</router-link>
                                    </li>
                                </div>
                            </ul>
                        </div>
                    </div>

                </div>
            </nav>
            <section class="login-area" v-if="isLoggedInModal">
                <div class="grey-underline">
                    <h1 class="login-title">Login</h1>
                </div>
                <div class="inputs-container grey-underline">
                    <h1 class="welcome-title">Welcome to restya</h1>
                    <input class="username-input" v-model="userCred.username" type="text" placeholder="Username">
                    <input class="paswword-input" v-model="userCred.password" type="password" placeholder="Password">
                </div>
                <div class="flex">
                    <button @click="closeLoggedinModal" class="bnb-btn" @mousemove="getPos"
                        :style="{ '--mouse-x': mouseX, '--mouse-y': mouseY }">Confrim</button>
                </div>
                <button @click="closeLoggedinModal" class="exit-modal">
                    X
                </button>
            </section>
            <transition name="mobile-nav">
                <div v-if="isOpenScreen" class="search-modal flex justify-content-center">
                    <div class="flex align-items-center border-thin-black-roundalign-self-center search-bar"
                        @click="showSearchTxt" v-click-outside="closeSearchTxt"
                        :class="{ 'search-modal-active': isSearchModalActive }">
                        <div class="dest-container " @click="selectDestPicker" v-click-outside="unSelectDestPicker"
                            :class="{ 'unselected-picker': !isDestPickerSelected, 'selected-dest': isDestPickerSelected }">
                            <div class="dest-box">
                                <label class="dest-wraper" for="dest">
                                    <div class="dest-holder">
                                        <div class="header">Where</div>
                                        <input ref="searchInput" id="dest" autocomplete="off" type="text" class="text"
                                            placeholder="Search destinations" v-model="destination"
                                            @blur="addDestination">
                                    </div>
                                </label>
                            </div>
                        </div>
                        <!-- <div class="dest-line"></div> -->
                        <date-picker id="date" :isGuestHover="isGuestHover" :isGuestSelect="isGuestSelect"
                            @getDate="addDate" class="date-component" :isDateSelect="isStartDateSelected"
                            @getStartDateSelectedState="unSelectDatePicker" />
                        <div class="guest-box" @click="selectGuestPicker" v-click-outside="unSelectGuestPicker">
                            <guests-picker :isHeader="true" @addGuests="addGuest" @mouseover="onGuestHoverChange"
                                @mouseleave="onGuestHoverChange"
                                :class="{ 'unselected-picker': !isGuestPickerSelected, 'selected-guest': isGuestPickerSelected }"
                                class="clean-button guest-picker-component" />
                            <div v-if="!isSearchModalActive || isOpenLogo" class="search-modal-logo"
                                @click="searchFilter">
                                <button class="search-logo-container">
                                    <div class="search-logo-img">
                                        <div>
                                            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"
                                                aria-hidden="true" role="presentation" focusable="false"
                                                style="display: block; fill: none; height: 16px; width: 16px; stroke: currentcolor; stroke-width: 4; overflow: visible;">
                                                <g fill="none">
                                                    <path
                                                        d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9">
                                                    </path>
                                                </g>
                                            </svg>
                                        </div>
                                        <div class="search-logo-txt">
                                            Search
                                        </div>
                                    </div>
                                </button>
                            </div>
                            <div v-if="isSearchModalActive"
                                class="search-modal-logo-open flex space-between align-items-center"
                                @click="searchFilter">
                                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                                    role="presentation" focusable="false"
                                    style="display: block; fill: none; height: 16px; width: 16px; stroke: currentcolor; stroke-width: 4; overflow: visible;">
                                    <g fill="none">
                                        <path
                                            d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9">
                                        </path>
                                    </g>
                                </svg>
                                <div class="search-modal-logo-open-txt">Search</div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </header>
        <div v-if="isOpenScreen" @click="closeModal" class="modal-screen"></div>
        <div v-if="isLoggedInModalOpen" @click="closeModal" class="modal-logged-screen"></div>
    </div>
    <!-- </div> -->
</template>

<script>
// import { debug } from '../../../RonBNB---backend/backend/services/logger.service'
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
            isShowNameLogo: true,
            isShowDropdownMenu: false,
            isLoggedInModal: false,
            isLoggedInUser: false,
            isLoggedInModalOpen: false,
            loggedinUser: null,
            isExplorePage: false,
            isOpenLogo: undefined,
            // isDateSelect: false,
            withShadow: {

            },
            withOutShadow: {
                boxShadow: "none"
            },
            userCred: {
                username: '',
                password: '',

            }

        }
    },
    created() {
        window.addEventListener("resize", this.cheackScreen)
        this.cheackScreen()
        // this.loggedinUser = this.$store.getters.getLoggedInUser
        // console.log(this.loggedinUser)

    },
    watch: {
        // loggedinUser() {
        //     console.log("in watch");
        //     if (this.loggedinUser.username !== "geust") {
        //         this.isLoggedInUser = this.check
        //         // this.$router.go()
        //     }
        //     else {
        //         this.isLoggedInUser = this.check
        //         // this.$router.go()
        //     }
        //     console.log(this.loggedinUser);
        // }
    },
    // mounted() {
    // const param = this.$router.currentRoute._value
    //         console.log('PRARAM', this.$router.currentRoute._value);
    //     // if(param === "stay-details"){
    //     //         console.log('fuck yea');
    //     // }
    // },
    methods: {
        loggedInModal() {
            this.isLoggedInModal = true
            this.isLoggedInModalOpen = true
        },
        closeLoggedinModal() {
            this.$store.dispatch({ type: "login", userCred: this.userCred })
            this.isLoggedInModal = false
            this.isLoggedInModalOpen = false
            var user = this.$store.getters.getLoggedInUser
            if (user.username !== "geust") {
                this.isLoggedInUser = true
                return true
            }
            else {
                this.isLoggedInUser = false
                return false
            }
            this.loggedinUser = this.$store.getters.getLoggedInUser
            this.isLoggedInModal = false
            this.isLoggedInModalOpen = false

        },
        openDropdownMenu() {
            this.isShowDropdownMenu = true
            console.log(this.isShowDropdownMenu);
        },
        closeDropdownMenu() {
            this.isShowDropdownMenu = false
            console.log(this.isShowDropdownMenu);
        },
        onGuestHoverChange(guestHoverState) {
            guestHoverState.type === "mouseover" ? this.isGuestHover = true : this.isGuestHover = false
        },
        onGuestSelectChange(guestSelectState) {
            // console.log(guestHoverState)
            this.isGuestSelect = guestSelectState
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
        selectDatePicker() {
            this.isStartDateSelected = true
        },
        unSelectDatePicker(value) {
            console.log(value)
            this.isStartDateSelected = false
            console.log(this.isStartDateSelected)
        },
        selectGuestPicker() {
            this.isGuestPickerSelected = true
            this.isGuestSelect = true
        }, unSelectGuestPicker() {
            this.isGuestPickerSelected = false
            this.isGuestSelect = false
        },
        openModal() {
            this.isOpenScreen = true
            this.showSearchTxt()
        },
        closeModal() {
            this.isOpenScreen = false
            this.isGuestPickerSelected = false
            this.isDestPickerSelected = false
            this.isDatetPickerSelected = false
            this.isStartDateSelected = false
            this.closeSearchTxt()
        },
        toogleMobileNav() {
            this.mobileNav = !this.mobileNav
        },
        cheackScreen() {
            this.windowWidth = window.innerWidth
            if (this.windowWidth < 1127) {
                this.isShowNameLogo = false
            } else {
                this.isShowNameLogo = true
            }
            if (this.windowWidth < 950) {
                this.isOpenLogo = true

            } else {
                this.isOpenLogo = false
            }
            if (this.windowWidth < 744) {
                this.mobile = true
                this.closeModal()
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
            // console.log(filter);
            this.$router.push(`/explore/${filter.destination}`)
            this.isExplorePage = true
        },
        getPos(ev) {
            // console.log(ev)
            var rect = ev.target.getBoundingClientRect();
            var x = ev.clientX - rect.left; //x position within the element.
            var y = ev.clientY - rect.top;  //y position within the element.
            this.mouseX = x
            this.mouseY = y
            ev.target.style.setProperty('--mouse-x', this.mouseX)
            ev.target.style.setProperty('--mouse-y', this.mouseY)
        },
        doLogout() {
            this.$store.dispatch({ type: 'logout' })
            this.$router.push('/')
        },
        checkIt() {
            console.log(this.loggedinUser);
        }
    },
    computed: {
        currentRoute() {
            return this.$route.name
        },
        countryName() {
            const { destination } = this.$route.params
            if (destination) {
                return this.$store.getters.staysForDisplay[0].address.country
            } else {
                this.destination = ""
                return "Anywhere"
            }

        },
        checkLoggedIn() {
            console.log("in computed");
            var user = this.$store.getters.getLoggedInUser
            if (user.username !== "geust") {
                this.isLoggedInUser = user
            }
            else {
                return this.isLoggedInUser = false
                return false
            }
        },
        check() {
            return this.$store.getters.getLoggedInUser
        },
        components: { datePicker, guestsPicker }
    }
}
</script>