<template>
    <section class="img-gallery">
   <div v-for="image in images">
        <img :src="imgUrl(image)" />
    </div>
    </section>
</template>

<script>


export default {
    name: 'image-gallery',
    props:
    {
        images: {
            stay: Array,
            required: true,
        },
    },
    data() {
        return {
        }
    },
    components: {
    },
    methods: {
        imgUrl(image) {
            return new URL(`../images/stay-images/${image}`, import.meta.url).href
        },
    },
    computed: {
    }
}
</script>

<style>
</style>