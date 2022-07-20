<template>
    <section v-if="stay" class="header-details">
        <h1>{{ stay.name }}</h1>
        <h3>{{ stay.numOfReviews }} reviews • <span>{{ superHost }}</span> •
            <span>{{ stay.address.city }},{{ stay.address.country }}</span>
        </h3>
    </section>
    <el-row class="demo-avatar demo-basic">
        <el-col :span="12">
            <div class="sub-title">circle</div>
            <div class="demo-basic--circle">
                <div class="block">
                    <el-avatar :size="50" :src="randomUser" />
                </div>
            </div>
        </el-col>
    </el-row>
    <section>

    </section>
</template>

<script>
import { stayService } from '../services/stay-service.js'
export default {
    name: 'toy-detail',
    data() {
        return {
            stay: null,
        }
    },
    async created() {
        try {
            const { stayId } = this.$route.params
            var stay = await stayService.getById(stayId)
            this.stay = stay
        } catch (error) {
            throw new Error('cannot get stay')
        }

    },
    methods: {
    },
    computed: {
        superHost() {
            if (this.stay.host.isSuperhost) return 'Superhost'
            if (!this.stay.host.isSuperhost) return ''
        },
        randomUser(){
            var image = stayService.getRandomInt(1,8)
            return `../images/user-images/${image}.jpg`
        }
    }
}
</script>
