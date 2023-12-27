<template>
  <div class="login">
    <div class="items">
      

    <div class="container col-6 col-md-6" id="form-container">
        <div class="row align-items-center gx-5">
            <div class="col-md-12">
                <h2>Faça o login para continuar</h2>
                <form @submit.prevent="signIn">
                      <div class="form-floating mb-3">                        
                          <input type="email" class="form-control" id="email" name="email" placeholder="Digite seu email" v-model="email" required>
                          <label for="email" class="form-label">Digite seu e-mail</label>
                      </div>
                      <div class="form-floating mb-3">                        
                          <input type="password" class="form-control" id="password" name="password" placeholder="Digite sua senha" v-model="password" required>
                          <label for="password" class="form-label">Digite sua senha</label>
                      </div>
                      <div class="col-12" id="link-container">
                          <router-link  to="/register" class="dropdown-item" >Ainda não tem uma conta? Cadastre-se.</router-link>
                      </div>
                      <br/>
                    <input type="submit" class="btn btn-primary" value="Entrar">
                </form>
            </div>
            <template v-if='this.status >= 400'>
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
  name: 'LoginUser',

  data(){
    return{

        email:"",
        password:"",
        msg:"",
        status: 0
    }
  },

  computed: mapState([
    'user'
  ]),

  methods: {

    async signIn (){

        let msg = ""
        let status = ""
        const body = {"email": this.email, "password": this.password}

        try{

          let response = await axios.post(`http://localhost:4000/login`, body)

          if(response.status == 200){

            this.$store.commit('setUser', response.data)
            this.$store.dispatch('loadBag')           
            this.$router.push({name:'Home'})
          }

        }catch(error){

          if(error.response.status){
              status = error.response.status
              msg = error.response.data.Error
              this.msg = msg
              this.status = status
          }else{
              status = 500
              //msg = {"status": 500, "statusMessage": "Ops... Algo deu errado."}
              msg = "Ops... Algo deu errado." 
              this.msg = msg
              this.status = status
          }
        } 


    },
},


}
</script>

<style lang="scss">





</style>
