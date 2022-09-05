<template>
  <div id="app">
    <img alt="Vue logo" src="https://5310757-sb1.app.netsuite.com/core/media/media.nl?id=532075&c=5310757_SB1&h=ZjMC8INvPRe9L1gxHC9k9j59fqe5ZvQ_-CtroV-Q0NQNKAPH">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
@Component({
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {
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
