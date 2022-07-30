
<template>
     <p>{{formatedText}}<span v-if="!isMore && longText">...</span> <span :style="readStyle" v-if="longText" @click="isMore=!isMore">{{readText}} </span></p>
</template>

<script>


export default {
    name: 'long-txt',
    props:
    {
        text: {
            text: String,
            required: true,
        },
    },
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
				color: this.isMore ? 'black' : 'black',
				cursor: 'pointer',
				'text-decoration': 'underline',
			}
		},
	},
}
</script>

<style>
</style>


export default {
	props: ['text'],
	template: `
  
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
				color: this.isMore ? 'black' : 'blue',
				cursor: 'pointer',
				'text-decoration': 'underline',
				// textDecoration: 'underline',
			}
		},
	},
}
