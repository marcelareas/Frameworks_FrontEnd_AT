import Vuex from "vuex";
import Vue from "vue";
import produto from "./modules/produto";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    produto
  }
});