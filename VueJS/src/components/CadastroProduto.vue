<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <h2>AT VueJS</h2>
    </div>
    <div class="row justify-content-start space-top">
          <router-link
          tag="button" 
          :to="{ name: 'produtos' }"
          class="btn btn-outline-light btn-sm"
          type="button">
          Listagem de Produtos
        </router-link>
    </div>
    <div class="row justify-content-center space-top">
      <form class="formulario"> 
        <div>
          <label>Nome do Produto</label>
              <b-form-textarea v-model="produto.nome" class="form-control" placeholder="Descrição do Produto..."
                rows="3" max-rows="4" ></b-form-textarea>            
        </div>
        <div class="space-top">
          <label>Unidade de Medida</label>  
          <input type="text" v-model="produto.unidade" class="form-control">  
        </div>
        <div class="space-top">
          <label>Quantidade</label>  
          <input type="number" v-model="produto.quantidade" class="form-control">  
        </div>
        <div class="space-top">
          <label>Produto Perecível?</label>
          <b-form-select v-model="produto.perecivel" :options="options" size="sm" class="mt-3"></b-form-select>  
        </div>
        <div class="space-top">
          <button type="button" @click="enviarCadastroProduto(produto)" class="btn btn-outline-light btn-sm">Cadastrar</button>           
        </div>
       
      </form>
      <div >
        <b-modal ref="my-modal" hide-footer title="Registro Cadastrado com Sucesso">
          <button type="button" class="btn btn-outline-primary space-sides" @click="irTelaProdutos()">Ir para Listagem</button>
          <button type="button" class="btn btn-outline-success space-sides" @click="limparCampos()">Cadastrar Novo Produto</button>
        </b-modal>
      </div>
      <div>
        <b-modal ref="my-modal2" hide-footer title="Todos os Campos Devem ser Preenchidos">          
          <b-button class="mt-3" v-b-modal.modal-footer-lg  @click="hideModal()">Fechar</b-button>
        </b-modal>
      </div>
      <div>
        <b-modal ref="my-modal3" hide-footer title="Esse produto já esta cadastrado">          
          <b-button class="mt-3" v-b-modal.modal-footer-lg  @click="hideModal()">Fechar</b-button>
        </b-modal>
      </div>
    </div>
  </div> 
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    name: "Cadastro",
    data() {
      return {
        produto: {          
          nome: "",
          unidade: "",
          quantidade: "",
          perecivel: false,
          data_vencimento: ""
        },
        options: [
          { text: 'Sim', value: 'true' },
          { text: 'Não', value: 'false' }
        ]
      }
    },  
    computed: mapGetters(["produtoPorNome"]),
    methods: {
        ...mapActions(["cadastrarProduto"]),

        irTelaProdutos() {
          this.hideModal()
          this.$router.push({ name: "produtos" });
        },
        enviarCadastroProduto(produto) {
          if (this.validaCampos()) {
            if(this.produto.nome !== null && this.validaUnicidade(this.produto.nome)) {
              produto.data_vencimento = this.getDate()
              this.cadastrarProduto(produto)
              this.showModal()
            }else {
              this.showModalUnicidade()
            }
          }else {
            this.showModalAlert()
          }
        },
        getDate() {
          var now = new Date
          var mes = now.getMonth()
          let mesCorreto = mes + 1
          var data = now.getDate() + "/" + mesCorreto + "/" + now.getFullYear()
          let dataCompleta = data.toString()
          return dataCompleta
        },
        limparCampos(){
          this.produto.nome = ""
          this.produto.unidade = ""
          this.produto.quantidade = ""
          this.produto.perecivel = false
          this.hideModal()
        },
        showModalAlert(){
          this.$refs['my-modal2'].show()
        },
        showModalUnicidade(){
          this.$refs['my-modal3'].show()
        },
        validaCampos(){
          if(this.produto.nome == "" || this.produto.unidade == "" || this.produto.quantidade == ""){
            return false
          } else {
            return true
          }
        },
        validaUnicidade(nomeProduto){
          var produto = this.produtoPorNome(nomeProduto)
          if(produto){
            return false
          }else {
            return true
          }          
        },

        showModal() {
          this.$refs['my-modal'].show()
        },

        hideModal() {
          this.$refs['my-modal'].hide()
          this.$refs['my-modal2'].hide()
          this.$refs['my-modal3'].hide()
        },   
    }    
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
  margin-top: 2em;
}
.formulario {
  width: 80%;
}
</style>
