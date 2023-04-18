<template>
  <div id="app">
    <FormUser/>
  </div>
</template>

<script>
import FormUser from './components/FormUser.vue'

export default {
  name: 'App',
  setup(){
  },
  components: {
    FormUser
  }
}
</script>
<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  -webkit-animation: fadeIn 2s ease-in-out;
  -moz-animation: fadeIn 2s ease-in-out;
  -o-animation: fadeIn 2s ease-in-out;
  animation: fadeIn 2s ease-in-out;
}
</style>