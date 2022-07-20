<!-- 
<template>
    <p>{{ formatedArray }}<span v-if="!isMore && longArray"></span>
     <span :style="readStyle" v-if="longArrey" @click="isMore = !isMore">{{ readText }} </span> -->
    </p>
</template>

<script>

export default {
    name: 'long-array',
    props:
    {
        array: {
            array: string,
            required: true,
        },
    },
    data() {
        return {
            isMore: false,
            longArray: this.array.length > 10,
        }
    },
    computed: {
        formatedArray() {
            console.log(this.array)
            return this.array.slice(0,10)

            // return this.isMore ? this.array : this.array.splice(0, 10)
        },
        // readText() {
        //     return this.isMore ? ' Read Less' : ' Read more'
        // },
        // readStyle() {
        //     return {
        //         color: this.isMore ? 'red' : 'blue',
        //         cursor: 'pointer',
        //         'text-decoration': 'underline',
        //         // textDecoration: 'underline',
        //     }
        // },
    },
}
</script>

<style>
</style>
<!-- export default {
	props: ['text'],
	template: `
    <p>{{formatedText}}<span v-if="!isMore && longText">...</span> <span :style="readStyle" v-if="longText" @click="isMore=!isMore">{{readText}} </span></p>
`,
	data() {
		return {
			isMore: false,
			longText: this.text.length > 100,
		}
	},
	methods: {},
	computed: {
		formatedText() {
			return this.isMore ? this.text : this.text.slice(0, 100)
		},
		readText() {
			return this.isMore ? ' Read Less' : ' Read more'
		},
		readStyle() {
			return {
				color: this.isMore ? 'red' : 'blue',
				cursor: 'pointer',
				'text-decoration': 'underline',
				// textDecoration: 'underline',
			}
		},
	},
} 
 -->
