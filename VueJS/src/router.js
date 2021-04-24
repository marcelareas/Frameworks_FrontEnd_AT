import Vue from 'vue';
import VueRouter from 'vue-router';
import Produtos from './components/Produtos'
import EditarProduto from './components/EditarProduto'
import CadastroProduto from './components/CadastroProduto'


Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'produtos',
            component: Produtos
        },
        {
            path: '/editar/:id',
            name: 'editarProduto',
            component: EditarProduto
        },{
            path: '/cadastro',
            name: 'cadastroProduto',
            component: CadastroProduto
        }   
    ]
});