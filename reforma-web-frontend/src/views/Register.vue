<template>
  <div class="register">
    <div class="items">
      <div class="container col-6 col-md-6" id="form-container">
          <div class="row gx-5">
              <div class="col-md-12">
                  <h2>Realize o seu cadastro</h2>
                  <form @submit.prevent="createUser">
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
                      <div class="form-floating mb-3">                        
                          <input type="email" class="form-control" id="email" name="email" placeholder="Digite seu email" v-model="email" required>
                          <label for="email" class="form-label">Digite seu e-mail</label>
                      </div>
                      <div class="form-floating mb-3">                        
                          <input type="password" class="form-control" id="password" name="password" placeholder="Digite sua senha" v-model="password" required>
                          <label for="password" class="form-label">Digite sua senha</label>
                      </div>
                      <div class="form-floating mb-3">                        
                          <input type="password" class="form-control" id="confirmpassword" name="confirmpassword" placeholder="Confirme sua senha"  v-model="confirmpassword" required>
                          <label for="confirmpassword" class="form-label">Confirme sua senha</label>
                      </div>
                      <div class="mb-3">
                            <div class="col-12" id="link-container">
                                <router-link  to="/login" class="dropdown-item" >Eu já tenho uma conta</router-link>
                            </div>
                      </div>
                      <input type="submit" class="btn btn-primary" value="Cadastrar">
                      <div class="valid-feedback">
                          Looks good!
                      </div>
                  </form>
              </div>

          </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import axios from 'axios';

export default {
  name: 'RegisterUser',

  data(){
    return{
        name: "",
        lastname:"",
        cpf:"",
        email:"",
        password:"",
        confirmpassword:""

    }
  },

  methods: {
    cleanForm(){
        
        this.name= "",
        this.email=""
    },
    async createUser (){

        
        const body = {
                        "name": this.name,
                        "lastName": this.lastname,
                        "cpf": this.cpf,
                        "email": this.email,
                        "password": this.password,
                        "confirmPassword": this.confirmpassword,
                        "situation": true
                    }

        try{

          let response = await axios.post(`http://localhost:4000/users`, body)

          if(response.status == 204){

          
            this.$router.push({name:'LoginUser'})
            
            
          }

        }catch(error){
          console.log(error.response.status)
        } 

    },

},
  computed: mapState([

  ]),
}
</script>

<style lang="scss">



</style>
