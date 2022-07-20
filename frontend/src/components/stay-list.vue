<template>
    <section class="stay-list">
        <li v-for="stay in stays" :key="stay._id">
            <stay-preview :stay="stay">
            </stay-preview>
        </li>
    </section>
</template>

<script>

import stayPreview from './stay-preview.vue'

export default {
    name: 'stay-list',
    props: {
        stays: {
            type: Array,
            required: true,
        },
    },
    components: {
        stayPreview
    },
    methods: {
    },
}
</script>

<style>
</style>