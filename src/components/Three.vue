<template lang="pug">
  
</template>

<script>

import App from "./Three/App.js"

export default {
  name:"ThreeModel",

  mounted() {
    new App()
  }

}
</script>

<style>

body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
}

</style>