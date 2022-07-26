<template>
    <section v-if="stay" class="main-layout details-page">
        <section v-if="stay" class="header-details">
            <h1 class="stay-name">{{ stay.name }}</h1>
            <div class="stay-info flex space-between">
                <div>
                    <h3><span class="stay-reviews-info"> <i class="fa-solid fa-star star-rating"></i>
                            {{ ((stay.reviewScores.rating) / 20).toFixed(2) }} ·</span><span
                            class="stay-reviews-info">{{ stay.numOfReviews }} reviews </span><span
                            class="dot-separate">·</span> <span class="stay-super-host" v-if="stay.host.isSuperhost"> <i
                                class="fa-solid fa-award award-symbol-info"></i> {{ superHost }} <span
                                class="dot-separate">·</span></span>
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
                        <span style="margin-right:15px" class="stay-reviews-info">Save</span>
                        <span> <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                                role="presentation" focusable="false"
                                style="display: block; fill: none; height: 16px; width: 16px; stroke: currentcolor; stroke-width: 2; overflow: visible;">
                                <path
                                    d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z">
                                </path>
                            </svg>
                        </span>
                        <span class="stay-reviews-info">Share</span>
                    </div>
                </div>
            </div>
        </section>
        <div>
            <image-gallery :images="stay.imgUrls"></image-gallery>
        </div>

        <section v-if="scrollpx > 600" class="nav-details-container main-layout">
            <div id="myID" v-if="scrollpx > 600">
                <div class="flex">
                    <div class="nav-txt main-layout flex">
                        <h1 class="txt">Photo</h1>
                        <h1 class="txt">Amenities</h1>
                        <h1 class="txt">Reviews</h1>
                        <div v-if="scrollpx > 1300" class="header-reserve-container flex">
                            <div class="">
                                <h1 class="reserve-stay-price"> $ {{ stay.price }} <span class="reserve-stay-night">
                                        night
                                    </span></h1>
                                <h1 class="reserve-stay-review"> <i class="fa-solid fa-star star-rating-reserve"></i>
                                    <span class="reserve-reviews-rating"> {{
                                            ((stay.reviewScores.rating) / 20).toFixed(2)
                                    }} </span>
                                    <span class="dot-separate">·</span>
                                    <span class="reserve-reviews-amount"> {{ stay.numOfReviews }} reviews </span>
                                </h1>
                            </div>
                            <button class="bnb-btn" @mousemove="getPos"
                                :style="{ '--mouse-x': mouseX, '--mouse-y': mouseY }"
                                @click="onAddOrder">Reserve</button>
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
                    <img class="host-img" :src=randomUser(0) alt="">
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
                    <h1 class="aircover-header"><span class="air">air</span>cover</h1>
                    <p class="aircover-txt">Every booking includes free protection from Host cancellations, listing
                        inaccuracies, and other issues like trouble checking in.</p>
                </div>
                <div class="description grey-underline">
                    <h1 class="description-header">Stay description</h1>
                    <p class="description-txt">Hello, welcome to our sunny and spacious West Village gem! Our apartment
                        has been designed with elegance and comfort in mind. Previously featured on Apartment Therapy,
                        we've redone the interior but kept the layout readers loved.</p>
                </div>
                <div v-if="stay" class="amenities-area  grey-underline">
                    <h1 class="amenities-title">What this place offers</h1>
                    <ul class="amenities-ul">
                        <li class="amenitiey" v-for="amenitie in stay.amentie" :key="stay._id">
                            <div class="amenities-container">
                                <p class="amenities-prop"><span class="amenities-symbol"
                                        v-html="amenitieSymbol(amenitie)"></span>{{ amenitie }}</p>
                                <!-- <span v-if="!isMore && longAmenities"></span></p> -->
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="grey-underline">
                    <GMapMap :center="stay.address.location" :zoom="10" map-type-id="terrain" style="width: 500px; height: 300px">
                        <GMapCluster>
                            <GMapMarker :position="stay.address.location"
                                :clickable="true" :draggable="true"/>
                        </GMapCluster>
                    </GMapMap>
                </div>
            </div>
            <section class="reserve">
                <div class="reserve-area flex column space-between">
                    <div class=" reserve-header flex space-between">
                        <h1 class="reserve-stay-price"> $ {{ stay.price }} <span class="reserve-stay-night"> night
                            </span></h1>
                        <h1 class="reserve-stay-review"> <i class="fa-solid fa-star star-rating-reserve"></i> <span
                                class="reserve-reviews-rating"> {{
                                        ((stay.reviewScores.rating) / 20).toFixed(2)
                                }} </span>
                            <span class="dot-separate">·</span>
                            <span class="reserve-reviews-amount"> {{ stay.numOfReviews }} reviews </span>
                        </h1>
                    </div>

                    <div class="date-area">
                        <date-picker-try @addDate="setDate" />
                        <guests-picker @addGuests="setGuests" :isHeader="false" />
                        <button class="bnb-btn" @mousemove="getPos"
                            :style="{ '--mouse-x': mouseX, '--mouse-y': mouseY }" @click="onAddOrder">Reserve</button>
                        <div v-if="stayLength" class="date-area-text">
                            <div class="flex space-between">
                                <span class="text-decorate">{{ stay.price }} x {{ getNights }}</span>
                                <span>${{ stay.price * stayLength }}</span>
                            </div>
                            <div class="flex space-between service-fee">
                                <span class="text-decorate">Service fee</span>
                                <span>${{ stayLength * 25 }}</span>
                            </div>

                        </div>
                        <div v-if="stayLength" class="flex space-between">
                            <span>Total</span>
                            <span>${{ stay.price * stayLength + (stayLength * 25) }}</span>
                        </div>
                    </div>
                </div>
            </section>
        </section>
        <div v-if="stay" class="reviews-area">
            <h1 class="review-rating"> <i class="fa-solid fa-star star-rating"></i>
                {{ ((stay.reviewScores.rating) / 20).toFixed(2) }} · {{ stay.numOfReviews }} reviews </h1>
            <div class="review-score">
                <li v-for="reviewScore in Object.entries(stay.reviewScores)" :key="stay._id">
                    <div class="flex space-between" v-html="formatReviewScore(reviewScore)"></div>

                </li>
            </div>
            <div class="reviews-container">
                <li v-for="review, idx in formatedreviews" :key="stay._id">
                    <div class="review-container">
                        <div class="review-info flex ">
                            <img class="user-img" :src=randomUser(idx+1) alt="">
                            <h1 class="user-info"><span class="user-name-review">{{ review.by.fullname }} </span> <br>
                                <span class="review-date">{{ timeFormat(review.at) }}</span>
                            </h1>
                        </div>
                        <p class="review-txt">{{ review.txt }}</p>
                        <!-- <span v-if="!isMore && longAmenities"></span></p> -->
                    </div>
                </li>
            </div>
        </div>
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
            guests: null,
            stayLength: null,
            scrollpx: 0,
            myLatlng : null,
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
;2
        } catch (error) {
            throw new Error('cannot get stay')
        }
        this.commentsArr = stayService.getRandomArr()
        console.log("hhhhhhhhhhhhhhhhhhhhhhhh",this.stay.address.location)
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
        timeFormat(time) {
            const date = new Date(time)
            const month = date.toLocaleString('default', { month: 'long' })
            const year = date.getFullYear()
            return `${month} ${year}`
        },
        formatReviewScore(score) {
            if (score[0] !== 'rating') {
                return `<h2 class="score-title"> ${score[0]}</h2>
                <div class="progress-bar-container flex">
                    <progress class="progress-bar" value="${score[1]}" max="10"></progress>
                    <h2 class="score-number"> ${(score[1]) / 2}</h2>
                </div>`

            }
        },
        onAddOrder() {
            if (!this.guests) {
                console.log("no guests");
                return
            }

            var order = {
                buyer: {},
                stay: {},
            };
            order.hostId = this.stay._id
            order.createdAt = Date.now()

            order.buyer._id = this.user._id
            order.buyer.fullname = this.user.fullname


            order.startDate = this.stayDate[0]
            order.endDate = this.stayDate[1]
            order.totalPrice = this.stay.price * this.stayLength + (this.stayLength * 25)
            order.guests = this.guests
            order.status = "pending"
            order.stay._id = this.stay._id
            order.stay.name = this.stay.name
            order.stay.price = this.stay.price


            //TODO:uncomment when we can get date input from user
            this.$store.dispatch({ type: 'addOrder', order: { ...order } })

            console.log(order);
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

        }
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
    },
    components: {
        imageGallery,
        datePickerTry,
        guestsPicker,

    }
}
</script>
