<template>
<ion-app>
<login v-if="state==null"/>
<ion-router-outlet v-else/>
</ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import Login from './components/Login.vue';
import {store} from '@/store/Index';
import { computed } from 'vue';


const state=computed(async()=>{
return store.state.user;
});




</script>
<style>
.ion-button{
--padding:10px;
}
</style>