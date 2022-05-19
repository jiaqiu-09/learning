<template>
  <div>
    <h1>will not keep</h1>
    <input v-model="a"/>
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  name: 'WillnotKeep',
  setup() {
    const a = ref(null)

    return {
      a
    }
  },
}
</script>