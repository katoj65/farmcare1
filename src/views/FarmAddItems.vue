<template>
<farm-layout>
<ion-list>
<ion-item v-for="(m,key) in menu" :key="key" @click="router.push(m.url+segment)">
<ion-icon aria-hidden="true" :icon="m.icon" slot="start"></ion-icon>
<ion-label>
{{ m.title }}
</ion-label>
</ion-item>
</ion-list>

</farm-layout>
</template>
<script setup lang="ts">
import FarmLayout from '@/components/FarmLayout.vue';
import { IonAvatar, IonItem, IonLabel, IonList, IonIcon } from '@ionic/vue';
import { addCircleOutline } from 'ionicons/icons';
import { useRouter,useRoute } from 'vue-router';
import { computed } from 'vue';


const route=useRoute();
const router=useRouter();
const segment=computed(()=>{
let r=route.path.split('/');
return r[3];
});


const menu=[
{title:'Add animal',icon:addCircleOutline ,url:'/animal/add/'},
{title:'Add farm worker',icon:addCircleOutline  ,url:'/animal/add/'},
{title:'Add veterinary doctor',icon:addCircleOutline  ,url:'/animal/add/'},
{title:'Add record',icon:addCircleOutline  ,url:'/animal/add/'},


];





</script>