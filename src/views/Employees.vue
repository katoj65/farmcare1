<script setup>
import AppLayout from '@/components/AppLayout.vue';
import {IonItem, IonLabel,IonFab, IonFabButton, IonFabList,IonIcon ,IonAvatar,IonList, IonListHeader} from '@ionic/vue';
import { reactive, onMounted } from 'vue';
import {db} from '@/Database/database';
import { useRoute, useRouter } from 'vue-router';


const row=reactive({
animal:[],
});

const router=useRouter();
const route=useRoute();
onMounted(()=>{
const id=route.path.split('/');
db.from('worker')
.select('*,farm(name)')
.then((response)=>{
if(response.error==null){
row.animal=response.data;
}else{
console.log(response.error);
}
})
.catch((error)=>{console.log(error)});



});
</script>

<template>
<app-layout title="Employees" back="/">
<div style="padding-bottom:100px;">
<ion-list>
<ion-item lines="none" detail="true" v-for="(a,key) in row.animal" :key="key" @click="router.push('/worker/show/'+a.id)" style="border:solid thin #e5e8e8;margin:5px;border-radius:10px;">
<ion-avatar slot="start">
<img src="https://ionicframework.com/docs/img/demos/avatar.svg" alt="avatar" />
</ion-avatar>
<ion-label>
<h3 style="text-transform:capitalize;font-weight:bold;font-size:17px;">
{{ a.firstname }} {{ a.lastname }} </h3>
<p style="text-transform:capitalize">
{{ a.gender }} . {{ a.farm.name }} . {{ a.role }}
</p>
</ion-label>
</ion-item>
</ion-list>
</div>
</app-layout>
</template>