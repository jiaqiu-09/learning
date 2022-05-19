<template>
  <div>
 <!-- <teleport to='#teleport' > -->
    <h1>will keep &lt;</h1>
    <div>status :{{a}}</div>
    <button @click="change">change</button>
  <!-- </teleport> -->
  </div>
</template>
<script>
import { ref } from '@vue/reactivity'
import { onMounted } from 'vue'
// import { ref } from 'vue'
export default {
  name: 'WillKeep',
  setup() {
    onMounted(() => {
      console.log('==== keep')
    })
    const a = ref('unchanged')

    function change() {
      a.value = a.value === 'unchanged' ?  'changed' : 'unchanged'
    }

    return {
      a,
      change
    }
  },
}
</script>