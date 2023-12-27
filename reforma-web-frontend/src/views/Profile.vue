<template>
  <div class="register">
    <div class="items">
      <div class="container col-6 col-md-6" id="form-container">
          <div class="row gx-5">
              <div class="col-md-12">
                  <h2>Atualize o seu cadastro</h2>
                  <form @submit.prevent="updateUser">

                      <div class="form-floating mb-3">                        
                          <input type="email" class="form-control" id="email" name="email" placeholder="Digite seu email" v-model="email" required>
                          <label for="email" class="form-label">Digite seu e-mail</label>
                      </div>

                      <div class="form-floating mb-3">
                          <input type="text" class="form-control" id="name" name="name" placeholder="Digite seu nome" v-model="name" required>
                          <label for="name" class="form-label">Digite seu nome</label>
   
                      </div>
                      <div class="form-floating mb-3">                        
                          <input type="text" class="form-control" id="lastname" name="lastname" placeholder="Digite seu sobrenome" v-model="lastname" required>
                          <label for="lastname" class="form-label">Digite seu sobrenome</label>
                      </div>
                      <div class="form-floating mb-3">                        
                          <input type="text" class="form-control" id="cpf" name="cpf" placeholder="Digite seu CPF" v-model="cpf" required>
                          <label for="cpf" class="form-label">Digite seu CPF</label>
                      </div>
                      <input type="submit" class="btn btn-primary" value="Atualizar">
                  </form>
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
  </div>
</template>

<script>

import { mapState } from 'vuex'
import axios from 'axios';

export default {
  name: 'ProfileUser',

  data(){
    return{
        name: "",
        lastname:"",
        cpf:"",
        email:"",
        msg:"",
        status: 0

    }
  },

  created(){

    this.loadProfile()
  },

  methods: {

    async loadProfile() {
      await axios
      .get(`http://localhost:4000/users/${this.$store.state.user.idUser}`)
      .then(response => {
        this.name = response.data.name,
        this.lastname = response.data.lastName,
        this.cpf = response.data.cpf,
        this.email = response.data.email
      })
      
    },
    async updateUser (){

        let msg = ""
        let status = ""
        const body = {
                        "name": this.name,
                        "lastName": this.lastname,
                        "cpf": this.cpf,
                        "email": this.email,
                    }

        try{

          let response = await axios.put(`http://localhost:4000/users/${this.$store.state.user.idUser}`, body)
 
          if(response.status == 204){      
            status = response.status
            msg = "Cadastro realizado com sucesso"
          }

        }catch(error){
                        
          if(error.response.status){
              status = error.response.status
              msg = error.response.data.Error

          }else{
              status = 500
              msg = "Ops... Algo deu errado." 
          }
        } 
      this.msg = msg
      this.status = status
    },

},
  computed: mapState([
      'user'
  ]),
}
</script>

<style lang="scss">



</style>
