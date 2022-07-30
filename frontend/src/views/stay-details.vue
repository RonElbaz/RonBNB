<template>
    <section v-if="stay" class="details-layout details-page">
        <section v-if="stay" class="header-details">
            <h1 class="stay-name">{{ stay.name }}</h1>
            <div class="stay-info flex space-between">
                <div>
                    <h3><span class="stay-review-info"> <i class="fa-solid fa-star star-rating"></i>
                            {{ getRatingAvg.toFixed(2) }} ·</span><span class="stay-reviews-info">{{ stay.numOfReviews
                            }} reviews </span><span class="dot-separate">·</span> <span class="stay-super-host"
                            v-if="stay.host.isSuperhost"> <i class="fa-solid fa-award award-symbol-info"></i> {{
                                    superHost
                            }} <span class="dot-separate">·</span></span>
                        <span class="stay-reviews-info">{{ stay.address.city }},{{ stay.address.country }}</span>
                    </h3>
                </div>
                <div class="media-btn">
                    <div class="flex">
                        <span>
                            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                                role="presentation" focusable="false"
                                style="display: block; fill: none; height: 16px; width: 16px; stroke: currentcolor; stroke-width: 2; overflow: visible;">
                                <g fill="none">
                                    <path d="M27 18v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9"></path>
                                    <path d="M16 3v23V3z"></path>
                                    <path d="M6 13l9.293-9.293a1 1 0 0 1 1.414 0L26 13"></path>
                                </g>
                            </svg>
                        </span>
                        <span style="margin-right:15px" class="stay-reviews-info">Share</span>
                        <span> <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                                role="presentation" focusable="false"
                                style="display: block; fill: none; height: 16px; width: 16px; stroke: currentcolor; stroke-width: 2; overflow: visible;">
                                <path
                                    d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z">
                                </path>
                            </svg>
                        </span>
                        <span class="stay-reviews-info">Save</span>
                    </div>
                </div>
            </div>
        </section>
        <div id="gallery">
            <image-gallery :images="stay.imgUrls"></image-gallery>
        </div>

        <section v-if="scrollpx > 600" class="nav-details-container details-layout">
            <div class="header-reserve " v-if="scrollpx > 600">
                <div class="flex">
                    <div class="nav-txt details-layout flex">
                        <a href="#gallery" class="txt">Photo</a>
                        <a href="#amenities" class="txt">Amenities</a>
                        <a href="#reviews" class="txt">Reviews</a>
                        <a href="#map" class="txt">Loctaion</a>
                        <div v-if="scrollpx > 1510" class="header-reserve-container flex">
                            <div class="">
                                <h1 class="reserve-stay-price"> ${{ stay.price }} <span class="reserve-stay-night">
                                        night
                                    </span></h1>
                                <h1 class="reserve-stay-review"> <i class="fa-solid fa-star star-rating-reserve"></i>
                                    <span class="reserve-reviews-rating"> {{
                                            getRatingAvg.toFixed(2)
                                    }} </span>
                                    <span class="dot-separate">·</span>
                                    <span class="reserve-reviews-amount"> {{ stay.numOfReviews }} reviews </span>
                                </h1>
                            </div>
                            <el-button class="bnb-btn" @mousemove="getPos"
                                :style="{ '--mouse-x': mouseX, '--mouse-y': mouseY }" @click="onAddOrder">Reserve
                            </el-button>
                            <!-- <button </button> -->
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="bottom-area-details grey-underline">
            <div class="details-info">
                <div v-if="stay" class="host-info grey-underline">
                    <div class="host-text">
                        <h1 class="host-name"> hosted by {{ stay.host.fullname }} </h1> <br>
                        <p class="rooms-info">{{ stay.capacity }} {{ guestSrting }} <span>·</span>
                            {{ stay.bedrooms }}
                            {{ bedroomString }} <span>·</span> {{ stay.beds }} {{ bedString }}
                            <span>·</span> {{ stay.bathrooms }} {{
                                    bathroomString
                            }}
                        </p>
                    </div>
                    <div class="host-img-area">
                        <img class="host-img" :src=randomUser(0) alt="">
                        <svg class="super-host-symbol" v-if="stay.host.isSuperhost" viewBox="0 0 14 24"
                            role="presentation" aria-hidden="true" focusable="false"
                            style="height: 27px; width: 27px; display: block; fill: currentcolor;">
                            <path
                                d="m10.5 20.0005065c0 1.9326761-1.56704361 3.4994935-3.5 3.4994935s-3.5-1.5668174-3.5-3.4994935c0-1.9326762 1.5670426-3.5005065 3.5-3.5005065s3.5 1.5678303 3.5 3.5005065m-9.99486248-18.58757644-.00513752 8.13836018c0 .45796416.21682079.88992936.58880718 1.17090736l5.07730539 3.831699c.4870761.367971 1.16836618.367971 1.65647028.0009994l5.08141685-3.8266984c.3719859-.2789784.5898342-.7109444.5908612-1.16790827.0010271-1.75186288.0041101-6.21051146.0051391-8.14035983 0-.50396002-.4202834-.91292822-.9392158-.91292822l-11.11643181-.00699945c-.51790391-.00099942-.93818728.40796878-.93921487.91292823"
                                fill="#fff"></path>
                            <path
                                d="m12 9.5-5-3.70124468 5-3.79875532zm-6.1292309 9.187485c-.52182677.3180834-.8707691.8762459-.8707691 1.5144379 0 .9937534.83703449 1.7980771 1.870162 1.7980771.81806646 0 1.50434636-.5065007 1.75946763-1.2095239z"
                                fill="#ffb400"></path>
                            <path d="m12 9.5-5 3.75-5-3.75v-7.5z" fill="#ff5a5f"></path>
                            <path
                                d="m7 24c-2.2060547 0-4-1.7939453-4-3.9990234 0-2.2060547 1.7939453-4.0009766 4-4.0009766s4 1.7949219 4 4.0009766c0 2.2050781-1.7939453 3.9990234-4 3.9990234zm0-7c-1.6542969 0-3 1.3466797-3 3.0009766 0 1.6533203 1.3457031 2.9990234 3 2.9990234s3-1.3457031 3-2.9990234c0-1.6542969-1.3457031-3.0009766-3-3.0009766zm.0039062-1.8242188c-.4560547 0-.9121094-.1064453-1.2617188-.3164062l-5.0458984-3.8642578c-.4697265-.3642578-.696289-.8525391-.696289-1.4951172v-8c.0009766-.3730469.1679688-.7529297.4580078-1.0429688.2900391-.2905273.6689453-.4570312 1.0410156-.4570312h.0019531 10.9990235c.7851562 0 1.5.7148438 1.5 1.5v7.9277344c-.0009766.6762695-.2421875 1.2177734-.6953125 1.5668945l-5.0009766 3.8325195c-.3505859.2333985-.8251953.3486328-1.2998047.3486328zm-5.5058593-14.1757812c-.1044922 0-.2324219.0625-.3330078.1635742-.1015625.1020508-.1650391.230957-.1650391.3374024v7.9990234c0 .3305664.0888672.5341797.3066406.703125l4.9970703 3.8310547c.3330078.1953125 1.0859375.2001953 1.4208984-.0205078l4.9716797-3.8125c.2001954-.1542969.3027344-.4155274.303711-.7749024v-7.9267578c0-.2285156-.2714844-.4995117-.5-.4995117h-11-.0009766s0 0-.0009765 0z"
                                fill="#484848"></path>
                        </svg>
                    </div>
                </div>
                <div class="info-placeholder grey-underline">
                    <div v-if="stay.host.isSuperhost" class="super-host">
                        <h1 class="super-host-header"><i class="fa-solid fa-award award-symbol-info"></i> <span
                                class="super-host-header-txt"> {{ stay.host.fullname }} is a Superhost</span>
                            <p class="super-host-txt">Superhosts are experienced, highly rated hosts who are committed
                                to providing great stays
                                for guests.
                                Free cancellation before Oct </p>
                        </h1>
                    </div>
                    <h1 class="free-cancellation"><i class="fa-regular fa-calendar"></i><span
                            class="free-cancellation-txt">Free cancellation before Oct 27.</span> </h1>
                </div>
                <div class="aircover-area grey-underline">
                    <img style="height: 26px; margin-bottom: 16px ;"
                        src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg"
                        alt="AirCover" />
                    <p class="aircover-txt">Every booking includes free protection from Host cancellations, listing
                        inaccuracies, and other issues like trouble checking in.</p>
                </div>
                <div class="description grey-underline">
                    <h1 class="description-header">Stay description</h1>
                    <p class="description-txt">Hello, welcome to our sunny and spacious West Village gem! Our apartment
                        has been designed with elegance and comfort in mind. Previously featured on Apartment Therapy,
                        we've redone the interior but kept the layout readers loved.</p>
                </div>
                <div v-if="stay" id="amenities" class="amenities-area  grey-underline">
                    <h1 class="amenities-title">What this place offers</h1>
                    <ul class="amenities-ul">
                        <li class="amenitie" v-for="amenitie in stay.amentie" :key="stay._id">
                            <div class="amenities-container">
                                <p class="amenities-prop"><span class="amenities-symbol"
                                        v-html="amenitieSymbol(amenitie)"></span>{{ amenitie }}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <section class="reserve">
                <div class="reserve-area flex column space-between">
                    <div class=" reserve-header flex space-between">
                        <h1 class="reserve-stay-price"> ${{ stay.price }} <span class="reserve-stay-night"> night
                            </span></h1>
                        <h1 class="reserve-stay-review"> <i class="fa-solid fa-star star-rating-reserve"></i> <span
                                class="reserve-reviews-rating"> {{
                                        getRatingAvg.toFixed(2)
                                }} </span>
                            <span class="dot-separate">·</span>
                            <span class="reserve-reviews-amount"> {{ stay.numOfReviews }} reviews </span>
                        </h1>
                    </div>
                    <div class="date-area">
                        <date-picker-try @addDate="setDate" />
                        <guests-picker @addGuests="setGuests" :isHeader="false" />
                        <!-- <el-button plain class="bnb-btn" @mousemove="getPos"
                            :style="{ '--mouse-x': mouseX, '--mouse-y': mouseY }" @click="onAddOrder">Reserve
                        </el-button> -->
                        <el-button class="bnb-btn" @mousemove="getPos"
                            :style="{ '--mouse-x': mouseX, '--mouse-y': mouseY }" @click="onAddOrder">Reserve
                        </el-button>
                        <el-dialog v-model="centerDialogVisible" title="Your order has been compelted!" width="30%"
                            center>
                            <span>Now you just need to wait the host will approve your order</span>
                            <template #footer>
                                <span class="dialog-footer">
                                    <el-button @click="moveToTrips">Move to my trips</el-button>
                                    <el-button @click="moveToHomePage">Confirm</el-button>
                                </span>
                            </template>
                        </el-dialog>
                        <div v-if="stayLength" class="date-area-text">
                            <div>
                                <!-- <p class="charged">You won't be charged yet</p> -->
                            </div>
                            <div class="flex space-between">
                                <span class="text-decorate">{{ stay.price }} x {{ getNights }}</span>
                                <span>${{ (stay.price * stayLength).toLocaleString() }}</span>
                            </div>
                            <div class="flex space-between service-fee">
                                <span class="text-decorate">Service fee</span>
                                <span>${{ stayLength * 25 }}</span>
                            </div>

                        </div>
                        <div v-if="stayLength" class="flex space-between">
                            <span>Total</span>
                            <span>${{ (stay.price * stayLength + (stayLength * 25)).toLocaleString() }}</span>
                        </div>
                    </div>
                </div>
            </section>
        </section>

        <div id="reviews" v-if="stay" class="reviews-area">
            <h1 class="review-rating"> <i class="fa-solid fa-star star-rating"></i>
                {{ getRatingAvg.toFixed(2) }} · {{ stay.numOfReviews }} reviews </h1>
            <div class="review-score">
                <li v-for="reviewScore in Object.entries(stay.reviewScores)" :key="stay._id">
                    <div class="flex space-between" v-html="formatReviewScore(reviewScore)"></div>

                </li>
            </div>

            <div class="reviews-container  grey-underline">
                <li v-for="review, idx in formatedreviews" :key="stay._id">
                    <div class="review-container">
                        <div class="review-info flex ">
                            <img class="user-img" :src=randomUser(idx+1) alt="">
                            <h1 class="user-info"><span class="user-name-review">{{ review.by.fullname }} </span> <br>
                                <span class="review-date">{{ timeFormat(review.at) }}</span>
                            </h1>
                        </div>
                        <p class="review-txt">{{ review.txt }}</p>
                    </div>
                </li>
            </div>
        </div>
        <div id="map" class="map-area grey-underline">
            <h1 class="map-header">Where you’ll be</h1>
            <p class="map-adress">{{ stay.address.street }}</p>
            <GMapMap :center="stay.address.location" :zoom="10" map-type-id="terrain"
                style="width: 100%; height: 600px">
                <GMapCluster>
                    <GMapMarker :position="stay.address.location" :clickable="true" :draggable="true" />
                </GMapCluster>
            </GMapMap>
        </div>
        <section class="login-area" v-if="isReserveModal">
            <div class="grey-underline">
                <h1 class="login-title">Your order has been sent</h1>
            </div>
            <div class="inputs-container grey-underline">
                <h1 class="welcome-title">Now we wait the host wiil approve it</h1>
                <!-- <input class="username-input" type="text" placeholder="Username">
                    <input class="paswword-input" type="password" placeholder="Password"> -->
            </div>
            <div class="btn-reserve-modal-area">
                <button class="bnb-btn-reserve-modal" @click="moveToTrips">Move to my trips</button>
                <button class="bnb-btn-reserve-modal" @click="moveToHomePage">Confirm</button>
                <!-- <button @click="closeLoggedinModal" class="bnb-btn" @mousemove="getPos"
                    :style="{ '--mouse-x': mouseX, '--mouse-y': mouseY }">Confrim</button>-->
            </div> 
            <button @click="closeReserveModal" class="exit-modal">
                X
            </button>
        </section>
        <div v-if="isReserveModalOpen" @click="closeModal" class="modal-logged-screen"></div>
    </section>

</template>

<script>
import { stayService } from '../services/stay-service.js'
import imageGallery from '../components/image-gallery.vue'
import datePickerTry from '../components/date-picker-try.vue'
import guestsPicker from '../components/guests-picker.vue'

// import stayReserve from '../components/stay-reserve.vue'

export default {
    name: 'stay-details',
    data() {
        return {
            stay: null,
            formatedreviews: null,
            mouseX: 0,
            mouseY: 0,
            commentsArr: [],
            //TODO: uncomment when we have user service
            //user: nul;l,
            stayDate: null,
            guests: { adults: 1 },
            stayLength: null,
            scrollpx: 0,
            myLatlng: null,
            // centerDialogVisible: false,
            isReserveModalOpen: false,
            isReserveModal: false,
        }
    },
    async created() {
        try {
            const { stayId } = this.$route.params
            //TODO: uncomment when we have user service
            this.user = this.$store.getters.getLoggedInUser
            // console.log(this.user);
            var stay = await stayService.getById(stayId)
            this.stay = stay
            console.log(stay);
            this.formatedreviews = this.formatReviews
                ; 2
        } catch (error) {
            throw new Error('cannot get stay')
        }
        this.commentsArr = stayService.getRandomArr()
        // console.log("hhhhhhhhhhhhhhhhhhhhhhhh", this.stay.address.location)
        // console.log(this.commentsArr)

        window.addEventListener('scroll', this.handleScroll);


    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        amenitieSymbol(amenitie) {
            if (amenitie === 'TV') return '<i class="fa-solid fa-tv"></i>'
            if (amenitie === 'Wifi') return '<i class="fa-solid fa-wifi"></i>'
            if (amenitie === 'Pool') return '<i class="fa-solid fa-person-swimming"></i>'
            if (amenitie === 'Free parking on premises') return '<i class="fa-solid fa-car"></i>'
            if (amenitie === 'Kitchen') return '<i class="fa-solid fa-kitchen-set"></i>'
            if (amenitie === 'Air conditioning') return '<i class="fa-solid fa-snowflake"></i>'
            if (amenitie === 'Wheelchair accessible') return '<i class="fa-solid fa-wheelchair"></i>'
            if (amenitie === 'First aid kit') return '<i class="fa-solid fa-kit-medical"></i>'
            if (amenitie === 'Vault') return '<i class="fa-solid fa-vault"></i>'
            if (amenitie === 'Buthub') return '<i class="fa-solid fa-bath"></i>'
        },
        moveToTrips() {
            this.$router.push('/trips')
            this.isReserveModalOpen = false
        },
        moveToHomePage() {
            this.$router.push('/')
            this.isReserveModal = false
        },
        timeFormat(time) {
            const date = new Date(time)
            const month = date.toLocaleString('default', { month: 'long' })
            const year = date.getFullYear()
            return `${month} ${year}`
        },
        formatReviewScore(score) {
            let title = score[0].charAt(0).toUpperCase() + score[0].slice(1).toLowerCase();
            if (score[0] !== 'rating') {
                return `<h2 class="score-title"> ${title}</h2>
                <div class="progress-bar-container flex">
                    <progress class="progress-bar" value="${score[1]}" max="10"></progress>
                    <h2 class="score-number"> ${(score[1]) / 2}</h2>
                </div>`

            }
        },
        closeReserveModal() {
            this.isReserveModalOpen = false
            this.isReserveModal = false
        },
        onAddOrder() {
            if (!this.guests) {
                console.log("no guests");
                return
            }
            if (!this.stayDate) {
            }


            var order = {
                buyer: {},
                stay: {},
                host: {}
            };
            order.host.Id = this.stay._id
            order.host.fullname = this.stay.host.fullname
            order.stay.address = this.stay.address.street
            order.createdAt = Date.now()

            order.buyer._id = this.user._id
            order.buyer.fullname = this.user.fullname



            order.startDate = this.stayDate[0]
            order.endDate = this.stayDate[1]
            order.totalPrice = this.stay.price * this.stayLength + (this.stayLength * 25)
            order.guests = this.guests
            order.status = "Pending"
            order.stay._id = this.stay._id
            order.stay.name = this.stay.name
            order.stay.price = this.stay.price


            //TODO:uncomment when we can get date input from user
            this.$store.dispatch({ type: 'addOrder', order: { ...order } })
            // this.centerDialogVisible = true
            this.isReserveModalOpen = true
            this.isReserveModal = true

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
        randomUser(idx) {
            return new URL(`../images/user-images/${this.commentsArr[idx]}.jpg`, import.meta.url).href
        },
        setDate(selectedDate) {
            this.stayDate = selectedDate
            const startDate = new Date(selectedDate[0]);
            const endDate = new Date(selectedDate[1]);
            const diffTime = Math.abs(endDate - startDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            this.stayLength = diffDays
        },
        setGuests(guests) {
            this.guests = guests
        },
        handleScroll() {
            this.scrollpx = window.scrollY;
        },


    },
    computed: {
        superHost() {
            return this.stay.host.isSuperhost ? 'Superhost' : ''
        },

        guestSrting() {
            return (this.stay.capacity === 1) ? 'guest' : 'guests'
        },
        bedroomString() {
            return (this.stay.bedrooms === 1) ? 'bedroom' : 'bedrooms'
        },
        bedString() {
            return (this.stay.beds === 1) ? 'bed' : 'beds'
        },
        bathroomString() {
            return (this.stay.bathrooms === 1) ? 'bath' : 'baths'
        },
        formatReviews() {
            return (this.stay.reviews < 10) ? this.stay.reviews : this.stay.reviews.splice(0, 10)
        },
        getNights() {
            return (this.stayLength === 1) ? `1 night` : `${this.stayLength} nights`
        },
        getRatingAvg() {
            var sum = 0
            for (var el in this.stay.reviewScores) {
                if (el !== 'rating') sum += this.stay.reviewScores[el]
            }
            return (sum / (Object.keys(this.stay.reviewScores).length - 1)) / 2
        }
    },
    components: {
        imageGallery,
        datePickerTry,
        guestsPicker,

    }
}
</script>
