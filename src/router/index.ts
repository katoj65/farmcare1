import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
{
path: '/',
redirect: '/tabs/tab1'
},
{
path: '/tabs/',
component: TabsPage,
children: [
{
path: '',
redirect: '/tabs/tab1'
},
{
path: 'tab1',
component: () => import('@/views/Tab1Page.vue')
},
{
path: 'tab2',
component: () => import('@/views/Tab2Page.vue')
},
{
path: 'tab3',
component: () => import('@/views/Tab3Page.vue')
}
]
},
{
path:'/profile/create',
component:()=>import('@/views/CreateProfile.vue'),
name:'create profile'
},
{
path:'/profile',
component:()=>import('@/views/Profile.vue'),
name:'profile'
},
{
path:'/farm',
component:()=>import('@/views/Farm.vue'),
name:'farm'

},
{
path:'/search',
component:()=>import('@/views/Search.vue'),
name:'search'
},
{
path:'/farm/create',
component:()=>import('@/views/CreateFarm.vue'),
name:'create farm'
},
{
path:'/farm/show/:id',
component:()=>import('@/views/FarmShow.vue'),
name:'show farm'

},
{
path:'/farm/add/:id',
component:()=>import('@/views/FarmAddItems.vue'),
name:'farm add items'
},
{
path:'/animal/add/:id',
component:()=>import('@/views/FarmAnimalCreate.vue'),
name:'add farm animal'
},
{
path:'/animal/:id',
component:()=>import('@/views/AnimalShow.vue'),
name:'animal details'
}







]

const router = createRouter({
history: createWebHistory(import.meta.env.BASE_URL),
routes
})

export default router
