<template>
<div>
  <div id="app">
    <router-view/>
    <footercustom/>
  </div>
</div>
</template>

<script>
import footercustom from '@/components/FooterCustom'

export default {
  components: {
    footercustom
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,400;0,500;0,600;0,900;1,700&display=swap');
#app {
  font-family: 'Raleway', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rebeccapurple;
}
html {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAASUlEQVQoU2NMM5qRxsjA8JwBD/jPwCDJmG40wxfMwKEYJgdWCDIMm2JkMbhCdMXoGlEUwhSDaHSnkKcQ2TqcVhPlGaKCh9gABwCVQS8nZza2mQAAAABJRU5ErkJggg==) repeat;
}

</style>
