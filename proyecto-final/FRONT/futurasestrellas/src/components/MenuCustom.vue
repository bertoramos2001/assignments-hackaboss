<template>
  <nav>
      <show-at :breakpoints="{small: 759, medium: 1280, large: 1600}" breakpoint="small">
        <img :src="require('./../assets/logo.png')" class="logo" id="logoMobile" alt="Logo" height="40px" width="40px">
      </show-at>
      <show-at :breakpoints="{small: 759, medium: 1280, large: 1600}" breakpoint="mediumAndAbove">
        <img :src="require('./../assets/logo.png')" class="logo" id="logoDesktop" alt="Logo" height="40px" width="40px">
      </show-at>
      <ul ref="nav">
          <figure class="image-logo" @click="toggleNav">
              <hide-at :breakpoints="{small: 759, medium: 1280, large: 1600}" breakpoint="mediumAndAbove">
                <i class="ion-ios-menu" id="iconoMenu"/>
              </hide-at>
          </figure>
          <li 
          v-for="(link, index) in navLinks" :key="index" 
          @mouseenter="$event.currentTarget.style.background = '#ddd'"
          @mouseleave="$event.currentTarget.style.background = '#fff'"
          >
              <router-link :to="link.path">
                  {{ link.text }}
                  <i :class="link.icon"/>
              </router-link>
          </li>
      </ul>
  </nav>
</template>

<script>
import {showAt, hideAt} from 'vue-breakpoints'
export default {
    components: {
        hideAt,
        showAt
    },
    props: ['imagePath'],
      data (){
          return {
              navLinks: [
                  {
                    text: 'Home',
                    path: '/',
                    icon: 'ion-ios-home'
                  },
                  {
                    text: 'About',
                    path: '/about',
                    icon: 'ion-ios-information-circle'
                  }
              ]
          }
      },
    methods: {
        toggleNav() {
            const nav = this.$refs.nav.classList
            nav.contains('active') ? nav.remove('active') : nav.add('active')
        }
    }
}
</script>

<style scoped>
@import 'https://unpkg.com/ionicons@4.2.2/dist/css/ionicons.min.css';
html, body {
    height: 100%;
    overflow: hidden;
}
nav {
    height: 60px;
    width: 100%;
    box-shadow: 2px 2px 2px #CCC;
    background-color: #fff;
}
nav ul {
    display: flex;
    height: 100%;
    align-items: center;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    padding-inline-start: 0;
    list-style: none;
    box-shadow: 2px 2px 2px #CCC;
    background-color: #fff;
    margin-left: 50px;
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
    border-radius: 1rem;
}
nav ul i {
    margin-right: 10px;
    font-size: 20px;
}
figure {
    cursor: pointer;
}
#iconoMenu {
    font-size: 200%;
    padding-left: 1rem
}
nav ul li a {
    color: #333;
}
#logoDesktop {
    position:absolute;
    top:0;
    left: 0;
    padding: 10px 0 0 10px;
}
.logo {
    cursor: pointer;
}

@media screen and (max-width: 759px) {

    nav {
        height: 60px;
        position:fixed;
        top: 0;
    }
    nav ul {
        position: fixed;
        z-index: 1;
        width: 300px;
        flex-direction: column;
        padding: 0;
        left: -355px;
        transition: 300ms ease all;
        top: 60px;
    }
    nav ul.active {
        left: -50px;
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
    #logoMobile {
        position: fixed;
        right: 50%;
        top: 10px;
    }
}
</style>