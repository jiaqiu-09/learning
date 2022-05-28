/* eslint-disable */
<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <h1>list</h1>
    <ul>
      <!-- // eslint-disable-next-line -->
      <li v-for="(item, index) in list" :key="index">
        name: {{item.name}}, age: {{item.age}}
      </li>
    </ul>
    <button @click="add">add</button>
    <h1>name obj</h1>
    <pre>
      {{JSON.stringify(nameObj, null, 2)}}
    </pre>
    <button @click="objAdd">obj add</button>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  data() {
    return {
      list: [
        {name: 'a', age: 10},
        {name: 'b', age: 11}
      ],
      nameObj: {
        a: 'a'
      }
    }
  },
  methods: {
    add() {
      this.list.push({name: 'c', age: Math.round((Math.random() * 10))})
    },
    objAdd() {
      this.nameObj.b = 'b'
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
