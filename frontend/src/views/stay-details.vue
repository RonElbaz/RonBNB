<template>
    <section v-if="stay" class="main-layout details-page">
        <section v-if="stay" class="header-details">
            <h1 class="stay-name">{{ stay.name }}</h1>
            <div class="stay-info">
                <h3><span class="stay-reviews-info">{{ stay.numOfReviews }} reviews </span><span
                        class="dot-separate">·</span> <span class="stay-super-host" v-if="stay.host.isSuperhost"> <i
                            class="fa-solid fa-award award-symbol-info"></i> {{ superHost }} <span
                            class="dot-separate">·</span></span>
                    <span class="stay-reviews-info">{{ stay.address.city }},{{ stay.address.country }}</span>
                </h3>
            </div>
        </section>
        <div>z
            <image-gallery :images="stay.imgUrls"></image-gallery>
        </div>
        <section class="bottom-area-details">
            <div class="details-info">
                <div v-if="stay" class="host-info gray-underline">
                    <div class="host-text">
                        <h1 class="host-name"> hosted by {{ stay.host.fullname }} </h1> <br>
                        <p class="rooms-info">{{ stay.capacity }} {{ guestSrting }} <span class="dot-separate">·</span>
                            {{ stay.bedrooms }}
                            {{ bedroomString }} <span class="dot-separate">·</span> {{ stay.beds }} {{ bedString }}
                            <span class="dot-separate">·</span> {{ stay.bathrooms }} {{
                                    bathroomString
                            }}
                        </p>
                    </div>
                       <img class="host-img" :src=randomUser(0) alt="">
                </div>
                <div class="description grey-underline">
                    <h1>Stay description</h1>
                    <p>{{stay.summary}}</p>
                </div>
                <div v-if="stay" class="amenities-area  gray-underline">
                    <h1 class="amenities-title">What this place offers</h1>
                    <ul class="amenities-ul">
                        <li class="amenitiey" v-for="amenitie in formatedAmenities" :key="stay._id">
                            <div class="amenities-container">
                                <p class="amenities-prop"><span class="amenities-symbol"
                                        v-html="amenitieSymbol(amenitie)"></span>{{ amenitie }}</p>
                                <!-- <span v-if="!isMore && longAmenities"></span></p> -->
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <section class="reserve" >
                <div class="reserve-area flex column">
                <div class=" reserve-header flex space-between">
                    <h1> $ {{ stay.price }} night</h1>
                    <h1> <i class="fa-solid fa-star"></i> {{ stay.reviewScores.rating }}
                        <span class="dot-separate">·</span>
                        {{ stay.numOfReviews }} reviews
                    </h1>
                </div>
                <div class="date-area">
                      <date-picker-try />
                </div>
                <button class="bnb-btn" @mousemove="getPos" :style="{ '--mouse-x': mouseX, '--mouse-y': mouseY }"
                    @click="onAddOrder">Reserve</button>
                    </div>
            </section>
        </section>
        <div v-if="stay" class="reviews-area">
                <h1 class="review-rating"> <i class="fa-solid fa-star star-rating"></i>
                    {{ ((stay.reviewScores.rating) / 20).toFixed(2) }} · {{stay.numOfReviews}} reviews  </h1>
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
// import stayReserve from '../components/stay-reserve.vue'

export default {
    name: 'stay-details',
    data() {
        return {
            stay: null,
            isMore: false,
            // longAmenities: null,
            formatedAmenities: null,
            formatedreviews: null,
            mouseX: 0,
            mouseY: 0,
            commentsArr: [],
            //TODO: uncomment when we have user service
            //user: null,
            //stayDate: {},
        }
    },
    async created() {
        try {
            const { stayId } = this.$route.params
            //TODO: uncomment when we have user service
            this.user = this.$store.getters.getLoggedInUser 
            var stay = await stayService.getById(stayId)
            this.stay = stay
            // this.longAmenities = this.stay.amenities > 10
            this.formatedreviews = this.formatReviews
            this.formatedAmenities = this.formatAmenities
        } catch (error) {
            throw new Error('cannot get stay')
        }
        this.commentsArr = stayService.getRandomArr()
        // console.log(this.commentsArr)

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
            var order = {
                buyer:{},
            };
            order.hostId = this.stay._id
            order.createdAt = Date.now()
            //TODO: uncomment when we have user service
            order.buyer._id = this.user._id
            // order.buyer.fullname = this.user.host.fullname

            //TODO:uncomment when we can get date input from user
            //order.startDate = this.stayDate.start
            //order.endDate = this.stayDate.end
            //order.totalPrice = calculate days amount somehow...
            //order.guests = stayDate.guests
            //order.status = "pending"
            //order.stay.name = this.stay.name
            //order.stay.price = this.stay.price

            //TODO:uncomment when we can get date input from user
            //this.$store.dispatch({type:'addOrder', order})
            
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
        selectDatePicker(){

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
        formatAmenities() {
            return (this.stay.amenities < 10) ? this.stay.amenities : this.stay.amenities.splice(0, 10)
        },
        formatReviews() {
            return (this.stay.reviews < 10) ? this.stay.reviews : this.stay.reviews.splice(0, 10)
        },



    },
    components: {
        imageGallery,
       datePickerTry
    }
}
</script>
