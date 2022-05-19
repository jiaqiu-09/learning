<template>
  <div>
    <test-a v-if="show" />
    <button @click="changeShow">show</button>
  </div>
</template>

<script>
import { defineAsyncComponent, ref, onMounted } from 'vue'
import TestB from './TestB.vue'
// import TestA from './TestA.vue'
export default {
  name: 'SadName',
  components: {
    TestA: defineAsyncComponent({
      loader: () => import('./TestA.vue'),
      loadingComponent: TestB,
      delay: 10
    }),
  },
  // components: {
  //   TestA
  // },
  setup() {
    onMounted(() => {
      console.log('==== async')
    })
    const show = ref(false)
    console.log('f')
    const Component = ref('')

    const changeShow = () => {
      show.value = !show.value
    }

    return {
      show,
      changeShow,
      Component
    }
  },
}
</script>