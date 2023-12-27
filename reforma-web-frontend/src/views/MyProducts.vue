<template>
  <div class="basket">
    <div class="items">
      
      <template v-if="this.products.length">

        <div v-for="(product, index) in this.products" :key="index" class="item">
          <div class="remove" @click="deleteProduct(product.idProduct)">Excluir Produto</div>
          <div class="photo">
            <img :src="product.image" alt="">
          </div>
          <div class="description">
              {{product.title}}
          </div>
          <div class="price">
            <span class="amount">R$ {{ product.price.replace(".", ",")}}</span>
          </div>
        </div>
        <div class="grand-total"> Total: R$ {{orderTotal()}}</div>

      </template>

      <template v-else>
        <h4>Não há items na sua lista de produtos :(</h4>
      </template>

    </div>
  </div>
</template>

<script>

import axios from 'axios';
import { mapState } from 'vuex'

export default {
  name: 'MyProducts',
  

  data(){
    return{
      products: []

    }
  },
  created(){

    this.loadMyProducts()
  },

  methods: {
    orderTotal() {
      var total = 0;
      this.products.forEach(item => {
        total += parseFloat(item.price);
      });
      //return total.toFixed(2);
      return total.toFixed(2).replace(".", ",");
    },

    loadMyProducts() {
      axios
      .get(`http://localhost:4000/products/${this.$store.state.user.idUser}`)
      .then(response => {
        this.products = response.data
      })
    },
    async deleteProduct(idProduct) {
        
        try{

          let response = await axios.delete(`http://localhost:4000/products/${idProduct}`)

          if(response.status == 204){
         
            this.removeFromProducts(idProduct) 
            
          }

        }catch(error){
          console.log(error.response.status)
        } 
        
    },
    removeFromProducts(idProduct) {
      var updatedList = this.products.filter(item => idProduct != item.idProduct);
      this.products = updatedList;
    },

  },
  computed: mapState([
      'productsInBag',
      'user'
    ]),
    propertyProducts(){
      return this.products
    
  }    
  
}
</script>

<style lang="scss">

.basket {
  padding: 60px 0;  
  .items {
    max-width: 800px;
    margin: auto;
    .item {
      display: flex;
      justify-content: space-between;
      padding: 40px 0;
      border-bottom: 1px solid lightgrey;
      position: relative;

      .remove {
        position: absolute;
        top: 8px;
        right: 0;
        font-size: 11px;
        text-decoration: underline;
        cursor: pointer;
      }

      .quantity-area {
        margin: 8px auto;
        height: 14px;

        button {
          width: 16px;
          height: 16px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }

        .quantity {

            margin: 0 4px;
        }
      }

      .photo {
        img {
          max-width: 80px;
        }
      }

      .description {
        padding-left: 30px;
        box-sizing: border-box;
        max-width: 50%;

      }

      .price {
        .amount {
          font-size: 16px;
          margin-left: 8px;
          vertical-align: middle;

        }
      }
    }
      .grand-total {
          font-size: 24px;
          font-weight: bold;
          text-align: right;
          margin-top: 8px;
      }

  }

}

</style>
