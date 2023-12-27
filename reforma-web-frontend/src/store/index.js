import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    products: [],
    productsInBag: [],
    user: {idUser:0, name:""}
  },
  mutations: {
    setUser (state, user) {
      state.user = {idUser:user.idUser, name:user.name};
    },
    loadProducts (state, products) {
      state.products = products;
    },
    loadBag (state, products) {
      state.productsInBag = products;
    },
    addToBag(state, product) {
      state.productsInBag.push(product);
      localStorage.setItem("productsInBag", JSON.stringify(state.productsInBag))
    },
    removeFromBag(state, idProduct) {
      var updatedBag = state.productsInBag.filter(item => idProduct != item.idProduct);
      state.productsInBag = updatedBag;
      localStorage.setItem("productsInBag", JSON.stringify(state.productsInBag))
    },
    logOut(state) {
      state.user = {idUser:0, name:"Visitante"};
    },
  },
  actions: {

    loadProducts({ commit }) {
      axios
      .get('http://localhost:4000/products')
      .then(response => {
        commit('loadProducts', response.data);
      })
    },

    loadBag({ commit }) {
      console.log(this.state.user.idUser)
      axios
      .get(`http://localhost:4000/bag/${this.state.user.idUser}`)
      .then(response => {
        commit('loadBag', response.data);
      })    
      
    },
    async addToBag({ commit }, product) {

      let msg = ""
      const body = {
                      "idProduct": product.idProduct,
                      "idUser": this.state.user.idUser,
                  }

      await axios.post(`http://localhost:4000/bag`, body)
                  .then(function (response) {
                      console.log(`OK - status: ${response.status} statusText: ${response.statusText}`)
                      commit('addToBag', product);
                      msg = {"status": response.status, "statusMessage": "Cadastro realizado com sucesso"}
                  })
                  .catch(function (error) {
                      
                      if(error.response.status){
                          msg = {"status": error.response.status, "statusMessage":error.response.data.Error}

                      }else{
                          msg = {"status": 500, "statusMessage": "Ops... Algo deu errado."}
                      }
                  })
      return msg
      
    },

    removeFromBag({ commit }, idProduct) {
      
      axios
      .delete(`http://localhost:4000/bag/${idProduct}`)
      .then(response => {
        commit('removeFromBag', idProduct);
        console.log(response)
      })
      
      
    },
    
    logOut({ commit }) {
      
      commit('logOut');     
      localStorage.clear();
      
    },

  },
  modules: {
  }
})
