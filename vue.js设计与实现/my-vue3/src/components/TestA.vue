<template>
  <h1>TestA works!</h1>
  status: {{status}}
  <button @click="changeStatus">change</button>
</template>
<script>
import { ref } from 'vue'
export default {
  setup() {
    console.log('s a', this)
    const status = ref('activated')

    function changeStatus() {
      status.value = status.value === 'activated' ? 'deactivated' : 'activated'
    }
    return {
      status,
      changeStatus
    }
  },
}
</script>