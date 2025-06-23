<script setup>
import AppLayout from '@/components/AppLayout.vue';
import { reactive,onMounted } from 'vue';
import { useRoute } from 'vue-router';
import {db} from '@/Database/database';
import { ellipsisHorizontalCircleSharp, } from 'ionicons/icons';

import { IonButton, IonItem, IonLabel, IonList, IonListHeader, IonNote, IonIcon } from '@ionic/vue';

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
console.log(response);
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

<ion-list style="margin:10px;border:solid thin #e5e8e8;border-radius:10px;">
<ion-list-header color="light">
<ion-label>{{ w.firstname }} {{ w.lastname }} </ion-label>
<ion-button color="dark"><ion-icon :icon="ellipsisHorizontalCircleSharp" ></ion-icon></ion-button>
</ion-list-header>
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
<ion-item lines="none">
<ion-label>Farm Size </ion-label>
<ion-note color="medium" style="text-transform:capitalize;font-size:15px;">
{{ w.farm.size }}
</ion-note>
</ion-item>


</ion-list>




</div>
</app-layout>
</template>