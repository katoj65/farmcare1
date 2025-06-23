<script setup>
import AppLayout from '@/components/AppLayout.vue';
import { reactive,onMounted } from 'vue';
import { useRoute } from 'vue-router';
import {db} from '@/Database/database';
import { ellipsisHorizontalCircleSharp, } from 'ionicons/icons';
import { IonButton, IonItem, IonLabel, IonList, IonListHeader, IonNote, IonIcon, IonAvatar, } from '@ionic/vue';

const row=reactive({
worker:''
});






const route=useRoute();
onMounted(()=>{
const id=route.path.split('/');
db.from('worker')
.select('*,farm(*)')
.eq('id',id[3])
.then((response)=>{
if(response.error==null){
row.worker=response.data;
}else{
console.log(response.error);
}
})
.catch((error)=>{console.log(error)});
});


</script>
<template>
<app-layout title="Farm worker">
<div v-for="(w,key) in row.worker" :key="key">

<ion-list>
<ion-item lines="none" color="light" inset="none">
<ion-avatar aria-hidden="true" slot="start">
<img alt="" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
</ion-avatar>
<ion-label style="font-weight:bolder;">{{ w.firstname }} {{ w.lastname }} </ion-label>
<ion-note color="medium" style="text-transform:capitalize;font-size:15px;">
<ion-button color="light"><ion-icon :icon="ellipsisHorizontalCircleSharp" ></ion-icon></ion-button>
</ion-note>
</ion-item>


<ion-item lines="none">
<ion-label>Gender</ion-label>
<ion-note color="medium" style="text-transform:capitalize;font-size:15px;">
{{ w.gender }}
</ion-note>
</ion-item>
<ion-item lines="none">
<ion-label>Age </ion-label>
<ion-note color="medium" style="text-transform:capitalize;font-size:15px;">
{{ w.age }}
</ion-note>
</ion-item>
<ion-item lines="none">
<ion-label>Designation</ion-label>
<ion-note color="medium" style="text-transform:capitalize;font-size:15px;">
{{ w.role }}
</ion-note>
</ion-item>


<ion-item lines="none">
<ion-label>Telephone </ion-label>
<ion-note color="medium" style="text-transform:capitalize;font-size:15px;">
0{{ w.tel }}
</ion-note>
</ion-item>

<ion-item lines="none">
<ion-label>Farm </ion-label>
<ion-note color="medium" style="text-transform:capitalize;font-size:15px;">
{{ w.farm.name }}
</ion-note>
</ion-item>
<ion-item>
<ion-label>Farm Size </ion-label>
<ion-note color="medium" style="text-transform:capitalize;font-size:15px;">
{{ w.farm.size }}
</ion-note>
</ion-item>


</ion-list>




</div>
</app-layout>
</template>