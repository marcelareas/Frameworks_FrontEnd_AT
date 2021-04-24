<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <h2>AT VueJS</h2>
    </div>
    <div class="row justify-content-start space-top">
        <router-link
          tag="button" 
          :to="{ name: 'cadastroProduto' }"
          class="btn btn-outline-light btn-sm"
          type="button">
          Cadastrar Produto
        </router-link>        
    </div>
    <div class="row justify-content-md-center space-top">
      <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">Unidade de Medida</th>
          <th scope="col">Quantidade</th>
          <th scope="col">Perecível</th>
          <th scope="col">Criação / Edição</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody v-if="todosProdutos.length">        
        <tr class="space-top-big" v-for="produto in todosProdutos" :key="produto.id">
          <td>{{ produto.nome }}</td>
          <td>{{ produto.unidade }}</td>
          <td>{{ produto.quantidade }}</td>
          <td v-if="produto.perecivel == true">SIM</td>
          <td v-else>NÃO</td>
          <td>{{ produto.data_vencimento }}</td>
          <button type="button" @click="irTelaEditar(produto.id)" class="btn btn-outline-warning btn-sm space-sides">Editar</button>
          <button type="button" @click="enviarProdutoExcluir(produto.id)" class="btn btn-outline-danger btn-sm space-sides">Excluir</button>
        </tr>
      </tbody>
      <div v-else> NÃO EXISTEM PRODUTOS CADASTRADOS </div>
      </table>
    </div>
    <div>
      <b-modal ref="my-modal" hide-footer title="Registro Excluído Com Sucesso">
        <button class="btn btn-outline-success space-sides space-top" @click="hideModal">Voltar</button>
      </b-modal>
    </div>
  </div>  
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    name: "Produtos",
    data() {
        return {
        }
    },  
    methods: {
        ...mapActions(["buscarTodosProdutos", "excluirProduto"]),

        irTelaCadastro() {
            this.$router.push({ name: "cadastroProduto" });
        },
        irTelaEditar(id) {
            this.$router.push({name: "editarProduto", params: { id }})
        },

        enviarProdutoExcluir(id) {
            this.excluirProduto(id)
            this.buscarTodosProdutos();
            this.showModal()
        },

        showModal() {
          this.$refs['my-modal'].show()
        },

        hideModal() {
          this.$refs['my-modal'].hide()
      },   
    },
    created() {
        this.buscarTodosProdutos();
    },
    computed: mapGetters(["todosProdutos"])
}
</script>


<style scoped>
h2, th {
  color: white;
}
.space-top {
  margin-top: 4% !important;
}
.space-sides {
  margin-left: 2% !important;
  margin-right: 2% !important;
}
.space-top-big {
  margin-top: 3em;
}

</style>
