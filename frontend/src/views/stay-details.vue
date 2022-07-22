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
        <div>
            <image-gallery :images="stay.imgUrls"></image-gallery>
        </div>
        <section class="bottom-area-details">
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
                <img class="host-img" :src="randomUser()" alt="">
            </div>
            <div v-if="stay" class="amenities-area  gray-underline">
                <h1 class="amenities-title">What this place offers</h1>
                <ul class="flex wrap">
                    <li class="amenitiey" v-for="amenitie in formatedAmenities" :key="stay._id">
                        <div class="amenities-container">
                            <p class="amenities-prop"><span class="amenities-symbol"
                                    v-html="amenitieSymbol(amenitie)"></span>{{ amenitie }}</p>
                            <!-- <span v-if="!isMore && longAmenities"></span></p> -->
                        </div>
                    </li>
                </ul>
            </div>
            <section class="reserve">
                <div class="flex space-between">
                    <h1> $ {{ stay.price }} night</h1>
                    <h1> <i class="fa-solid fa-star"></i> {{ stay.reviewScores.rating }}
                        <span class="dot-separate">·</span>
                        {{stay.numOfReviews}} reviews
                    </h1>
                </div>
                <div class="date-area">
                    <h1>date will be here</h1>
                </div>
                <button>Reserve</button>
            </section>
        </section>
        <div v-if="stay" class="reviews-area">
            <div class="review-score">
                <li v-for="reviewScore in Object.entries(stay.reviewScores)" :key="stay._id">
                    <div class="flex space-between" v-html="formatReviewScore(reviewScore)"></div>

                </li>
            </div>
            <div class="reviews-container">
                <li v-for="review in formatedreviews" :key="stay._id">
                    <div class="review-container">
                        <div class="review-info flex ">
                            <img class="user-img" :src="randomUser()" alt="">
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

export default {
    name: 'stay-details',
    data() {
        return {
            stay: null,
            isMore: false,
            // longAmenities: null,
            formatedAmenities: null,
            formatedreviews: null
        }
    },
    async created() {
        try {
            const { stayId } = this.$route.params
            var stay = await stayService.getById(stayId)
            this.stay = stay
            // this.longAmenities = this.stay.amenities > 10
            this.formatedreviews = this.formatReviews
            this.formatedAmenities = this.formatAmenities
        } catch (error) {
            throw new Error('cannot get stay')
        }

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
        randomUser() {
            var image = stayService.getRandomInt(1, 26)
            return new URL(`../images/user-images/${image}.jpg`, import.meta.url).href
        },
        timeFormat(time) {
            const date = new Date(time)
            const month = date.toLocaleString('default', { month: 'long' })
            const year = date.getFullYear()
            return `${month} ${year}`
        },
        formatReviewScore(score) {
            if (score[0] !== 'rating') {
                // var res = Vue.compile(`<el-progress :percentage="50" color="black"></el-progress>`)
                return `<h2> ${score[0]}</h2>
                <div class="flex">
                    <h2> ${(score[1]) / 2}</h2>
                </div>`

            }
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
        formatAmenities() {
            return (this.stay.amenities < 10) ? this.stay.amenities : this.stay.amenities.splice(0, 10)
        },
        formatReviews() {
            return (this.stay.reviews < 10) ? this.stay.reviews : this.stay.reviews.splice(0, 10)
        },



    },
    components: {
        imageGallery
    }
}
</script>
