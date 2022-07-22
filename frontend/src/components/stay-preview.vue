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
        <div class="stay-info">
            <h1 class="stay-address">{{ stay.address.city }} ,<span>{{ stay.address.country }}</span></h1>
            <h1 class="stay-price">${{ stay.price }}<span class="stay-night"> night</span></h1>
        </div>
    </section>
</template>

<script>


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
    }
}
</script>

<style>
</style>