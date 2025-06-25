import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';
import { store } from '@/store/Index';
import { db } from '@/Database/database';
import { ref,Ref,onMounted } from 'vue';


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
},
{
path:'/worker/add/:id',
component:()=>import('@/views/FarmAddWorker.vue'),
name:'farm add worker'
},
{
path:'/worker/show/:id',
component:()=>import('@/views/WorkerShow.vue'),
name:'farm worker'
},
{
path:'/farm/workers/:id',
component:()=>import('@/views/FarmWorkers.vue'),
name:'farm workers'
},
{
path:'/employees',
component:()=>import('@/views/Employees.vue'),
name:'employees'
},
{
path:'/reports',
component:()=>import('@/views/Reports.vue'),
name:'reports'
},
{
path:'/register',
component:()=>import('@/views/Register.vue'),
name:'register',
},
{
path:'/message',
component:()=>import('@/views/Message.vue'),
name:'message'
},
{
path:'/share/:id',
component:()=>import('@/views/ShareAnimalReport.vue'),
name:'share'
},
{
path:'/farm/reports/:id',
component:()=>import('@/views/FarmReports.vue'),
name:'farm reports'
},
{
path:'/inventory/add/:id',
component:()=>import('@/views/FarmInventoryAdd.vue'),
name:'add inventory'
},
{
path:'/farm/inventory/:id',
component:()=>import('@/views/FarmInventory.vue'),
name:'inventory'
}




]

const router = createRouter({
history: createWebHistory(import.meta.env.BASE_URL),
routes
});



router.beforeEach(async (to,from,next)=>{
let session= await db.auth.getSession();
// .then((response)=>{
// if(response.error==null){
// if(response.data.session==null){
// return response;
// }else{
// let email=response.data.session.user.email;
// return response;
// }
// }else{
// console.log(response.error);
// }
// }).catch((error)=>{console.log(error)});
if(session.error==null){
if(session.data.session==null){
return next();
}else{
next();
}
}else{
next({ name: 'register' })
}

// console.log(session.data.session);


});










export default router
