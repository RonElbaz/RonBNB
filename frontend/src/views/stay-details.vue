<template>
    <section v-if="stay" class="header-details">
        <h1>{{ stay.name }}</h1>
        <h3>{{ stay.numOfReviews }} reviews • <span>{{ superHost }}</span> •
            <span>{{ stay.address.city }},{{ stay.address.country }}</span>
        </h3>
    </section>
    <div v-if="stay" class="host-info">
        <h1> hosted by {{ stay.host.fullname }} </h1> <br>
        <p>{{ stay.capacity }} {{ guestSrting }} • {{ stay.bedrooms }}
            {{ bedroomString }} • {{ stay.beds }} {{ bedString }} • {{ stay.bathrooms }} {{ bathroomString }} </p>

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
        <h1>What this place offers</h1>
        <li v-for="amenitie in formatedAmenities" :key="stay._id">
            <p>{{ amenitieSymbol(amenitie) }} {{ amenitie }}</p>
            <!-- <span v-if="!isMore && longAmenities"></span></p> -->
        </li>
    </div>
    <div v-if="stay" class="reviews-area">

        <li v-for="review in formatedreviews" :key="stay._id">
            <el-row class="demo-avatar demo-basic">
                <el-col :span="12">
                    <div class="demo-basic--circle">
                        <div class="block">
                            <el-avatar :size="50" :src="randomUser()" />
                            <h1>{{review.by.fullname}} <span>{{review.at}}</span></h1>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <p>{{ review.txt }}</p>
            <!-- <span v-if="!isMore && longAmenities"></span></p> -->
        </li>
    </div>

    <section>

    </section>
</template>

<script>
import { stayService } from '../services/stay-service.js'

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
            if (amenitie === 'TV') return '📺'
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

    },
    components: {

    }
}
</script>
