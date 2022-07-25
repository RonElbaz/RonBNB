<template>
    <section @click="moveToDetails" class="stay-preview">
        <div class="img-container block text-center">
            <span class="demonstration"></span>
            <el-carousel trigger="click" :autoplay="false" height="300px">
                <el-carousel-item v-for="image, idx in stay.imgUrls" :key="idx">
                    <img class="small justify-center stay-img" :src="imgUrl(image)">
                </el-carousel-item>
            </el-carousel>
        </div>
        <button class="like-btn" @click.stop="addStayToLike(stay._id)" :style="changeHeartColor(stay._id)">
            <i class="fas fa-heart"></i>
        </button>
        <p v-if="stay.host.isSuperhost" class="super-host-title">SuperHost</p>
        <div class="stay-info">
            <div class="stay-header flex space-between">
                <h1 class="stay-address">{{ stay.address.city }} ,<span>{{ stay.address.country }}</span></h1>
                <h1 class="stay-rating"> <i class="fa-solid fa-star star-rating"></i> {{
                        ((stay.reviewScores.rating) / 20).toFixed(2) 
                }} ({{((stay.numOfReviews))}}) </h1>
            </div>
            <h1 class="stay-description">{{stay.summary.substring(1,30)}}...</h1>
            <h1 v-if="stay.stayDate" class="stay-date">{{fomratStayDate}}</h1>
            <h1 class="stay-price">${{ stay.price }}<span class="stay-night"> night</span></h1>
        </div>
    </section>
</template>

<script>
import { start } from '@popperjs/core'



export default {
    name: 'stay-preview',
    props:
    {
        stay: {
            stay: Object,
            required: true,
        },
    },
    data() {
        return {
            isLike: false
        }
    },
    components: {
    },
    methods: {
        moveToDetails() {
            this.$router.push(`/stay/details/${this.stay._id}`)
        },
        imgUrl(image) {
            return new URL(`../images/stay-images/${image}`, import.meta.url).href
        },
        changeHeartColor() {
            if (this.isLike) return { color: 'red' }
            else return { color: 'rgba(0,0,0,.5019607843137255)' }
        },

        addStayToLike() {
            this.isLike = !this.isLike
        }
    },
    computed: {
        fomratStayDate() {
            const startMilliseconds = +this.stay.stayDate.startDate * 1000
            const startDateObject = new Date(startMilliseconds)
            const endMilliseconds = +this.stay.stayDate.endDate * 1000
            const endDateObject = new Date(endMilliseconds)
            var startMonth = startDateObject.toLocaleString("en-US", { month: "short" })
            var startDay = startDateObject.toLocaleString("en-US", { day: "numeric" })
            var endMonth = endDateObject.toLocaleString("en-US", { month: "short" })
            var endDay = endDateObject.toLocaleString("en-US", { day: "numeric" })

            // console.log(startMonth, startDay, endMonth, endDay);
            return (startMonth === endMonth) ? ` ${startMonth} ${startDay} - ${endDay}` : `${startMonth} ${startDay} - ${endMonth} ${endDay}`


        }
    }
}
</script>

<style>
</style>