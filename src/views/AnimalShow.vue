<template>
<app-layout title="Animal details" :back="row.back">
<div v-if="row.animal!=''">
<ion-card style="box-shadow:none;border:solid thin #e5e8e8" color="light">
<ion-card-header>
<ion-card-title style="text-transform:capitalize">{{ row.animal.name }} </ion-card-title>
<ion-card-subtitle style="">
<!-- {{ row.animal.farm.name }} farm -->
</ion-card-subtitle>
</ion-card-header>
<ion-card-content>


<ion-list color="light">
<ion-item color="light">
<ion-label>Gender</ion-label>
<ion-note color="medium">
{{ row.animal.gender }}
</ion-note>
</ion-item>
<ion-item color="light">
<ion-label>Tag</ion-label>
<ion-note color="medium">
{{ row.animal.tag }}
</ion-note>
</ion-item>
<ion-item color="light">
<ion-label>Color</ion-label>
<ion-note color="medium">
{{ row.animal.color }}
</ion-note>
</ion-item>
<ion-item color="light">
<ion-label>Weight</ion-label>
<ion-note color="medium">
{{ row.animal.weight }} Kgs
</ion-note>
</ion-item>
<ion-item color="light">
<ion-label>Origin</ion-label>
<ion-note color="medium" style="text-transform:capitalize">
{{ row.animal.origin }}
</ion-note>
</ion-item>
</ion-list>
</ion-card-content>
</ion-card>











</div>
</app-layout>
</template>
<script setup>
import AppLayout from '@/components/AppLayout.vue';
import { useRoute } from 'vue-router';
import { reactive, onMounted } from 'vue';
import {db} from '@/Database/database';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,IonItem, IonLabel, IonList, IonNote  } from '@ionic/vue';

const row=reactive({
animal:'',
back:''
});



const route=useRoute();
onMounted(()=>{
let id=route.path.split('/');
db.from('animal')
.select('*,farm (name, location,tel,type,size,id)')
.eq('id',id[2])
.then((response)=>{
if(response.error==null){
// row.animal=response.data;
response.data.forEach(element => {
row.animal=element
row.back='/farm/show/'+element.farm.id
});
}else{
console.log(response.error);
}
})
.catch((error)=>{console.log(error)});

})













</script>