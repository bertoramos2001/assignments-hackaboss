<template>
  <div class="about">
    <menucustom/>
    <h1>This is an about page</h1>
  </div>
</template>

  <script>
  import menucustom from '@/components/MenuCustom.vue'
  
    export default {
      name: 'About',
      components: {
        menucustom
      }
    }
  </script>
