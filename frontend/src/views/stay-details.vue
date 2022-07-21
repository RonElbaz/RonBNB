<template>
    <section v-if="stay" class="main-layout details-page">
        <section v-if="stay" class="header-details">
            <h1 class="stay-name">{{ stay.name }}</h1>
            <div class="stay-info">
                <h3>{{ stay.numOfReviews }} reviews • <span>{{ superHost }}</span> •
                    <span>{{ stay.address.city }},{{ stay.address.country }}</span>
                </h3>
            </div>
        </section>
        <div>
            <image-gallery :images="stay.imgUrls"></image-gallery>
        </div>
        <section class="bottom-area-details">
            <div v-if="stay" class="host-info">
                <div class="host-text">
                    <h1 class="host-name"> hosted by {{ stay.host.fullname }} </h1> <br>
                    <p>{{ stay.capacity }} {{ guestSrting }} • {{ stay.bedrooms }}
                        {{ bedroomString }} • {{ stay.beds }} {{ bedString }} • {{ stay.bathrooms }} {{ bathroomString
                        }}
                    </p>
                </div>
                <el-row class="demo-avatar demo-basic">
                    <el-col :span="12">
                        <div class="demo-basic--circle">
                            <div class="block">
                                <el-avatar :size="50" :src="randomUser()" />
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <hr>
            <div v-if="stay" class="amenities-area">
                <h1 class="amenities-title">What this place offers</h1>
                <ul class="flex wrap">
                    <li class="amenitiey" v-for="amenitie in formatedAmenities" :key="stay._id">
                        <div class="amenities-container">
                            <p class="amenities-prop"><span class="amenities-symbol" v-html="amenitieSymbol(amenitie)"></span>{{ amenitie }}</p>
                            <!-- <span v-if="!isMore && longAmenities"></span></p> -->
                        </div>
                    </li>
                </ul>
            </div>
            <div v-if="stay" class="reviews-area">

                <!-- <li v-for="reviewScore in stay.reviewScores" :key="stay._id">
            <h2>{{reviewScore}}</h2>
            </li> -->
                <li v-for="review in formatedreviews" :key="stay._id">
                    <div class="review-container">
                        <div class="review-info flex ">
                            <img class="user-img" :src="randomUser()" alt="">
                            <h1 class="user-info">{{ review.by.fullname }} <br> <span>{{ review.at }}</span></h1>
                        </div>
                        <p class="review-txt">{{ review.txt }}</p>
                        <!-- <span v-if="!isMore && longAmenities"></span></p> -->
                    </div>
                </li>
            </div>
        </section>
    </section>
</template>

<script>
import { stayService } from '../services/stay-service.js'
import imageGallery from '../components/image-gallery.vue'
import moment from 'moment'

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
            this.formatedreviews = this.formatreviews
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
            return (this.stay.bathrooms === 1) ? 'bathroom' : 'bathrooms'
        },
        formatAmenities() {
            return (this.stay.amenities < 10) ? this.stay.amenities : this.stay.amenities.splice(0, 10)
        },
        formatreviews() {
            return (this.stay.reviews < 10) ? this.stay.reviews : this.stay.reviews.splice(0, 10)
        },
        timeFormat() {

            return moment(this.stay.reviews.at).format()
            moment().format('MMMM Do YYYY, h:mm:ss a')
            // return moment("20120620", "YYYYMMDD").fromNow()
            // return moment(this.stay.reviews.at, "YYYYMMDD").fromNow()
        }

    },
    components: {
        imageGallery
    }
}
</script>
