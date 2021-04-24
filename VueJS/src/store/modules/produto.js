import axios from "axios";

const state = {
    produtos: []
};

const getters = {
  todosProdutos: state => state.produtos,
  produtoPorId: (state) => (id) => (state.produtos.filter(t => t.id == id))[0],
  produtoPorNome: (state) => (nome) => (state.produtos.filter(t => t.nome == nome))[0],
};

const actions = {
    buscarTodosProdutos({ commit }) {
        axios.get(
          "http://localhost:3030/produto"          
        ).then((response) => {
          commit('setProdutos', response.data);
      });
    },

    excluirProduto({ commit }, id) {
      axios({
        method: 'delete',
        url: "http://localhost:3030/produto/" + id
      }).then((response) => {
        console.log(response)
        commit('excluirProduto', id);
        });
    },

    cadastrarProduto({ commit }, produto) {
      axios.post(
        "http://localhost:3030/produto/", {
          nome: produto.nome,
          unidade: produto.unidade,
          quantidade: produto.quantidade,
          perecivel: produto.perecivel,
          data_vencimento: produto.data_vencimento
        }          
      ).then((response) => {
        commit('inserirProdutoAtualizado', response.data);
    });
  },

  atualizarProduto({ commit }, produto) {
    axios.put(
      "http://localhost:3030/produto/"+ produto.id, {
        nome: produto.nome,
        unidade: produto.unidade,
        quantidade: produto.quantidade,
        perecivel: produto.perecivel,
        data_vencimento: produto.data_vencimento
      }          
    ).then((response) => {
      commit('inserirProdutoAtualizado', response.data);
  });
},
};

const mutations = {
    setProdutos: (state, produtos) => state.produtos = produtos,
    excluirProduto: (state, id) => state.produtos.splice(state.produtos.findIndex(t => t.id === id), 1),
    inserirProduto: (state, produto) => state.produtos.push(produto),
    inserirProdutoAtualizado: (state, produto) => state.produtos.splice(state.produtos.findIndex(t => t.id === produto.id), 1, produto)
};

export default {
  state,
  actions,
  getters,
  mutations
};