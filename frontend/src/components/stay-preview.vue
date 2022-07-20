<template>
    <section @click="moveToDetails" class="stay-preview">
        <!-- <div class="block text-center" m="t-4">
            <el-carousel trigger="click" height="150px">
                <el-carousel-item v-for="image in stay.imgUrls" :key="image">
                    <h3 class="small justify-center" text="2xl">../images/{{ image }}</h3>
                    <img class="small justify-center" :src="'../images/stay-images/' + image" />
                    <img class="small justify-center" src="../images/stay-images/045.jpeg">
                </el-carousel-item>
            </el-carousel>
        </div>
        <h1>{{ stay.address.city }} ,<span>{{ stay.address.country }}</span></h1> -->
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
    },
    computed: {
    }
}
</script>

<style>
</style>