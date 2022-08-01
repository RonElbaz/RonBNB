<template>
  <div v-if="alive" class="alert" :class="alertClass">
    {{ msg.txt }}
  </div>
</template>


<script>
import { eventBus, SHOW_MSG } from "../services/event-bus.service.js"
import { ElMessage } from 'element-plus'


export default {
  created() {
    eventBus.on(SHOW_MSG, (msg) => {
      this.msg = msg
      var delay = msg.delay || 2000
      this.alive = true
      setTimeout(() => {
        this.alive = false
      }, delay)
    })
  },
  data() {
    return {
      alive: false,
      msg: null,
    }
  },
  computed: {
    alertClass() {
      if (!this.msg) return
      return `alert-${this.msg.type}`
    },
  },
  methods: {
    open2() {
      ElMessage({
        message: 'Congrats, this is a success message.',
        type: 'success',
      })
    }

  },
}
</script>