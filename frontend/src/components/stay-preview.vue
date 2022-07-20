<template>
    <section class="stay-preview">
        <div class="block text-center" m="t-4">
            <el-carousel trigger="click" height="150px">
                <el-carousel-item v-for="item in stay.imgUrls" :key="item">
                    <h3 class="small justify-center" text="2xl">../images/{{ item }}</h3>
                    <img class="small justify-center" :src="`../images/${item}`">
                    <!-- <img class="small justify-center" src="../images/045.jpeg"> -->
                </el-carousel-item>
            </el-carousel>
        </div>
        <h1>{{ stay.name }}</h1>
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
    },
    computed: {
    }
}
</script>

<style>
</style>