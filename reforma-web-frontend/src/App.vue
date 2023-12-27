<template>
<div>
  <header class="py-3 mb-3 border-bottom" id="nav">
      <div class="container-fluid d-grid gap-3 align-items-center " style="grid-template-columns: 1fr 2fr;">
        <div class="dropdown">
          <router-link to="/" class="navbar-brand" >Reforma Web</router-link>
        </div>
        <div class="d-flex justify-content-end ">

          <div class="w-10 me-4 justify-content-end" >
            <router-link to="/basket" class="nav-link" ><img src="./assets/cart-dash.svg" width="25" height="25"  > ({{this.productsInBag.length}})</router-link> 
          </div>

          <div class="flex-shrink-0 dropdown">
            
            <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle show" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="true">
              <img src="./assets/person-circle.svg" width="25" height="25">
            </a>
            <ul class="dropdown-menu text-small shadow " aria-labelledby="dropdownUser2" style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(-110px, 34px); " data-popper-placement="bottom-end">
              
              <template v-if="this.user.idUser > 0">
                <li><router-link  to="/profile" class="dropdown-item" >Perfil</router-link></li>
                <li><router-link  to="/sell" class="dropdown-item" >Vender</router-link></li>
                <li><router-link  to="/myproducts" class="dropdown-item" >Meus Produtos</router-link></li>
                <li><hr class="dropdown-divider"></li>
                <li><a v-on:click="this.$store.dispatch('logOut')" class="dropdown-item" href="/">Sair</a></li>
              </template>
              <template v-else>
                <li><router-link  to="/register" class="dropdown-item" >Cadastrar</router-link></li>
                <li><hr class="dropdown-divider"></li>
                <li><router-link  to="/login" class="dropdown-item" >Entrar</router-link></li>
              </template>
            </ul>
          </div>
        </div>
      </div>
  </header>
  <router-view/>
</div>
</template>

<script>
  
  import { mapState } from 'vuex'
  export default {

    created() {
      this.checkUser()
      this.$store.dispatch('loadProducts');
      this.$store.dispatch('loadBag');
      
    },
    methods:{
      checkUser(){
        if(this.user.idUser === 0){
          this.$router.push({name:'Home'})
        }
      }
      

    },
    computed: mapState([
      'productsInBag',
      'user'
    ]),

  }
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 1280px;
  margin: 80px auto;
}

#nav {
  padding: 16px 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  height: 10%;
  width: 100%;
  text-align: center;
  background-color: rgb(248, 246, 246);


}

#navbar .navbar-nav{
  flex-direction: row;
  justify-content: end;
}

#navbar .navbar-nav li{
  margin-left:1em;
}


/* Form */
#form-container {
  background-color: #FFF;

  margin: 25px auto;
  padding: 25px;
}

@media(min-width: 768px) {
  #form-container {
    margin: 50px auto;
    padding: 50px;
  }
}

#form-container h2 {
  font-weight: 900;
  margin-bottom: 30px;
}

#form-container a {
  color: #222;
  transition: .5s;
}

#form-container a:hover {
  color: #aaaaac;
}

#form-container form {
  padding-bottom: 50px;
}

#form-container .form-control {
  border: none;
  border-bottom: 1px solid #CCC;
  border-radius: 0;
}


#form-container .form-check-input:checked,
#form-container input[type="submit"] {
  background-color: #6b6b6b;
  border-color: #6b6b6b;
}

.btn.btn-primary {
  width: 100%;
}

@media(min-width: 768px) {
  .btn.btn-primary {
    width: auto;
  }
}

</style>
