<template>
  <nav :style="{ background: background || '#333' }">
      <ul :style="{ background: background || '#333'}" ref="nav">
          <figure class="image-logo" @click="toggleNav">
              <img :src="imagePath" height="40px" width="40px" alt="Logo">
          </figure>
          <li 
          v-for="(link, index) in navLinks" :key="index" 
          @mouseenter="$event.currentTarget.style.background = hoverBackground || '#999'"
          @mouseleave="$event.currentTarget.style.background = background || '#333'"
          >
              <router-link 
              :to="link.path"
              :style="{ color: linkColor || '#DDD'}" 
              >
                  {{ link.text }}
                  <i :class="link.icon"/>
              </router-link>
          </li>
      </ul>
  </nav>
</template>

<script>
export default {
    props: ['navLinks', 'background', 'linkColor', 'hoverBackground', 'imagePath'],
    methods: {
        toggleNav() {
            const nav = this.$refs.nav.classList
            nav.contains('active') ? nav.remove('active') : nav.add('active')
        }
    }
}
</script>

<style scoped>
nav {
    height: 60px;
    width: 100%;
    box-shadow: 2px 2px 2px #CCC;
}
nav ul {
    display: flex;
    min-height: 100vh;
    align-items: center;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    list-style: none;
    box-shadow: 2px 2px 2px #CCC;
}
nav ul a {
    text-decoration: none;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
}
nav ul li {
    list-style-type: none;
    padding: 10px 20px;
}
nav ul i {
    margin-right: 10px;
    font-size: 20px;
}
figure {
    cursor: pointer;
}

@media screen and (max-width: 759px) {
    nav {
        height: 0;
    }
    nav ul {
        position: absolute;
        width: 300px;
        flex-direction: column;
        padding: 0;
        left: -305px;
        transition: 300ms ease all;
        top: 60px;
    }
    nav ul.active {
        left: 0px;
    }
    nav ul li {
        width: 100%;
        padding-left: 0;
        padding-right: 0;
    }
    nav ul a {
        flex-direction: row;
        margin-left: 20px;
        justify-content: space-between;
        margin-right: 13px;
    }
    nav ul figure {
        position: fixed;
        z-index: 1;
        top: 10px;
        left: 2px;
    }
}
</style>