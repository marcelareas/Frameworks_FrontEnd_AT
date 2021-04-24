<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <h2>AT VueJS</h2>
    </div>
    <div class="row justify-content-start space-top">
      <button type="button" @click="irTelaProdutos()" class="btn btn-outline-light btn-sm">Listagem de Produtos</button>
    </div>
    <div class="row justify-content-center space-top">
      <form class="formulario"> 
        <div>
          <label>Nome do Produto</label>  
          <input type="text" v-model="produto.nome" class="form-control">  
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
            <b-form-group>
              <b-form-radio-group
              id="radio-group"
              v-model="produto.perecivel"
              :options="options"
              name="radio-options">
              </b-form-radio-group>
            </b-form-group> 
        </div>
        <button type="button" @click="atualizarCadastroProduto(produto)" class="btn btn-outline-light btn-sm">Cadastrar</button>           
      </form>
      <div>
        <b-modal ref="my-modal" hide-footer title="Registro Atualizado com Sucesso">
          <button type="button" class="btn btn-outline-success space-sides" @click="irTelaProdutos()">Ir para Listagem</button>
        </b-modal>
      </div>
      <div>
        <b-modal ref="my-modal2" hide-footer title="Todos os Campos Devem ser Preenchidos">          
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
        id : this.$route.params.id,
        produto:{          
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
    methods: {
        ...mapActions(["atualizarProduto"]),

        irTelaProdutos() {
          this.hideModal()
          this.$router.push({ name: "produtos" });
        },
        atualizarCadastroProduto(produto) {
          if (this.validaCampos()) {
            produto.data_vencimento = this.getDate()
            this.atualizarProduto(produto)
            this.showModal()
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
        showModalAlert(){
          this.$refs['my-modal2'].show()
        },
        validaCampos(){
          if(this.produto.nome == "" || this.produto.unidade == "" || this.produto.quantidade == ""){
            return false
          } else {
            return true
          }
        },
        showModal() {
          this.$refs['my-modal'].show()
        },
        hideModal() {
          this.$refs['my-modal'].hide()
          this.$refs['my-modal2'].hide()
        },   
    },
    created() {
        this.produto = this.produtoPorId(this.$route.params.id);
    },
    computed: mapGetters(["produtoPorId"])    
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
.formulario {
  width: 80%;
}
</style>
