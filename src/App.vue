<template>
<ion-app>
<login v-if="store.state.user==null"/>
<ion-router-outlet v-else/>
</ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import Login from './components/Login.vue';
import {store} from '@/store/Index';
import { onMounted, onBeforeMount } from 'vue';
import {db} from '@/Database/database';








onBeforeMount(()=>{
db.auth.getSession().then((response)=>{
if(response.data.session!=null){
store.state.user=response.data.session.user.email;
// console.log(store.state.user);
}else{
store.state.user=null;
}
}).catch((error)=>{console.log(error)});

});











</script>
<style>
.ion-button{
--padding:10px;
}
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
</style>