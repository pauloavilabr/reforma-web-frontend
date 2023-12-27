<template>
  <div class="register">
    <div class="items">
      <div class="container col-6 col-md-6" id="form-container">
          <div class="row gx-5">
              <div class="col-md-12">
                  <h2>Cadastre o seu produto</h2>
                  <form @submit.prevent="createProduct">
                      <div class="form-floating mb-3">
                          <input type="text" class="form-control" id="productname" name="name" placeholder="Digite o nome do Produto" v-model="productName" required>
                          <label for="productname" class="form-label">Digite o nome do produto</label>
                      </div>
                      <div class="mb-4">
                        <select class="form-select" v-model="categorie" placeholder="Escolha a categoria" required> 
                          <option selected>Selecione uma categoria</option>
                          <option value="1">Construção</option>
                          <option value="2">Jardinagem</option>
                        </select>
                        
                      </div>

                      <div class="form-floating mb-3">                        
                          <input  type="text" class="form-control" id="price" name="price" placeholder="Digite o preço" v-model="price" vueMask="'###.###,##'" required>
                          <label for="price" class="form-label">Digite o preço</label>
                      </div>
                      <div class="form-floating mb-3">                        
                          <input type="file" class="form-control" id="image" name="image" placeholder="Escolha a imagem" @change ="onFileSelected">
                          <label for="image" class="form-label">Escolha a imagem</label>
                      </div>
  
                      <div class="form-floating mb-3">                        
                          <textarea  type="text" class="form-control" id="productdescription" name="productdescription" placeholder="Digite a descrição do produto"  rows="3" v-model="productDescription" required></textarea>
                          <label for="productdescription" class="form-label">Descrição do produto</label>
                      </div>
                      <input type="submit" class="btn btn-primary" value="Cadastrar">
                  </form>
              </div>
          </div>
          <template v-if='this.status === 204'>
            <div class="alert alert-success alert-dismissible fade show" role="alert">
              {{this.msg}}
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          </template>
          <template v-else-if='this.status >= 400'>

            <div class="alert alert-danger alert-dismissible fade show" role="alert">
              {{this.msg}}
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios';

export default {
  name: 'SellProduct',

  data(){
    return{
        productName: "",
        productDescription:"",
        categorie:"",
        image:null,
        price:"",
        msg:"",
        status: 0


    }
  },

  methods: {
    cleanForm(){
        
        this.productName = "",
        this.productDescription ="",
        this.categorie = "",
        this.image = null,
        this.price = ""

    },
    onFileSelected(event){
      this.image = event.target.files[0]
    
    },

    async createProduct (){

        let msg = ""
        let status = ""
        // const fd = new FormData();
        // fd.append('image', this.image, this.image.name)
        // console.log(fd)

        const body = {
                        "productName": this.productName,
                        "productDescription": this.productDescription,
                        "image": this.image,
                        "price": this.price.replace(",", "."),
                        "idUserSeller": this.$store.state.user.idUser,
                        "idCategorie": this.categorie
                    }

        await axios.post(`http://localhost:4000/products`, body)
                    .then(function (response) {
                        console.log(`OK - status: ${response.status} statusText: ${response.statusText}`)
                        status = response.status
                        msg = "Cadastro realizado com sucesso"
                        
                    })
                    .catch(function (error) {
                        
                      if(error.response.status === 400){
                          status = error.response.status
                          msg = error.response.data.Error

                      }else{
                          status = 500
                          msg = "Ops... Algo deu errado." 
                      }
                    })
        this.msg = msg
        this.status = status
        if(status === 204 ){
          this.cleanForm()
        }      

        return msg

    },
},
  computed: mapState([

  ]),
}
</script>

<style lang="scss">



</style>
