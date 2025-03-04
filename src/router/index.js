import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import NotasView from '../views/NotasView.vue';
import FinancasView from '../views/FinancasView.vue';
import SobreView from '../views/SobreView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/notas', component: NotasView },
  { path: '/financas', component: FinancasView },
  { path: '/sobre', component: SobreView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
