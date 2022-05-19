<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <button @click="jump">go to test</button> -->
  <nav>
    <router-link to="/test">Test</router-link>|
    <router-link to="/keep">keep</router-link>|
    <router-link to="/notkeep">not keep</router-link>
  </nav>
  <router-view v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <keep-alive :include="alive">
        <component :is="Component" :key="$route.fullPath"></component>
      </keep-alive>
    </Transition>
  </router-view>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import AsyncTest from './components/AsyncTest.vue'
import { ref } from 'vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
    // AsyncTest
  },
  setup() {
    const alive = ref(['SadName', 'WillKeep', 'WillnotKeep'])

    return {
      alive
    }
  }
}
</script>

<style>
/* .slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
} */

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
