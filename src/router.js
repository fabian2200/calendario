import { createRouter, createWebHistory } from 'vue-router'
import AvanceContable from './components/avanceContable.vue';
import InicioAdmin from './components/InicioAdmin.vue';
import ObligacionesImpuestos from './components/obligacionesImpuestos.vue';


const routes = [
  {
    path: '/avance-contable',
    name: 'AvanceContable',
    component: AvanceContable
  },
  {
    path: '/obligaciones-impuestos',
    name: 'ObligacionesImpuestos',
    component: ObligacionesImpuestos
  },
  {
    path: '/',
    name: 'InicioAdmin',
    component: InicioAdmin
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router