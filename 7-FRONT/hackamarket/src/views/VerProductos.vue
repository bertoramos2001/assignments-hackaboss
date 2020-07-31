<template>
  <div>
      <menucustom/>
      <h1>LISTA DE PRODUCTOS</h1>
      <showproducts :productos="productos"/>

  </div>
</template>

<script>
import menucustom from '@/components/MenuCustom'
import showproducts from '@/components/ShowProducts'
import axios from 'axios';
import Swal from 'sweetalert2'

export default {
    name: 'VerProductos',
    components: {
        menucustom,
        showproducts
    },
    data() {
        return {
            productos: []
        }
    },
    methods: {
      //funcion para conseguir mis productos
      getProducts() {
      let self = this;
      //llamada de axios a la api
      axios.get('http://localhost:3051/productos')
      .then(function (response) {
        self.productos = response.data
      })
      .catch(function(error) {
        console.log(error)
      })
    }
    },
    created() {
    this.getProducts()
  }
}
</script>

<style scoped>

</style>