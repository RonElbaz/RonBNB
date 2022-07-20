<template>
    <section @click="moveToDetails" class="stay-preview">
        <div class="block text-center" m="t-4">
            <el-carousel trigger="click" height="350px">
                <el-carousel-item v-for="image, idx in stay.imgUrls" :key="idx">
                    <img class="small justify-center" :src="imgUrl(image)">
                </el-carousel-item>
            </el-carousel>
        </div>
        <h1>{{ stay.address.city }} ,<span>{{ stay.address.country }}</span></h1>
        <h1>${{ stay.price }} night</h1>
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
    components: {
    },
    methods: {
        moveToDetails() {
            this.$router.push(`/stay/details/${this.stay._id}`)
        },
        imgUrl(image) {
            return new URL(`../images/stay-images/${image}`, import.meta.url).href
        }
    },
    computed: {

    }
}
</script>

<style>
</style>