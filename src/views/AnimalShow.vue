<template>
<app-layout title="Animal details" :back="row.back">
<div v-if="row.animal!=''">
<ion-list>

<ion-list-header color="light">
<ion-label>
<h4 style="font-size:18px;font-weight:bold;text-transform:capitalize"> {{ row.animal.name }}</h4>
</ion-label>
<ion-button color="dark">
<ion-icon aria-hidden="true" :icon="ellipsisHorizontalCircleSharp" /></ion-button>
</ion-list-header>



<ion-item lines="none">
<ion-label>Gender</ion-label>
<ion-note color="medium" style="font-size:15px;">
{{ row.animal.gender }}
</ion-note>
</ion-item>
<ion-item lines="none">
<ion-label>Tag</ion-label>
<ion-note color="medium" style="font-size:15px;">
{{ row.animal.tag }}
</ion-note>
</ion-item>
<ion-item lines="none">
<ion-label>Color</ion-label>
<ion-note color="medium" style="font-size:17px;">
{{ row.animal.color }}
</ion-note>
</ion-item>
<ion-item lines="none">
<ion-label>Weight</ion-label>
<ion-note color="medium" style="font-size:15px;">
{{ row.animal.weight }} Kgs
</ion-note>
</ion-item>
<ion-item lines="none">
<ion-label>Origin</ion-label>
<ion-note color="medium" style="text-transform:capitalize;font-size:15px;">
{{ row.animal.origin }}
</ion-note>
</ion-item>
<ion-item lines="none">
<ion-label>Farm</ion-label>
<ion-note color="medium" style="text-transform:capitalize;font-size:15px;">
{{ row.animal.farm.name }}
</ion-note>
</ion-item>

<ion-list-header color="light">
<ion-label>Animal Health Report</ion-label>
</ion-list-header>



<ion-item lines="none">
<ion-label>Immunisation</ion-label>
<ion-note color="medium" style="font-size:15px;">
None
</ion-note>
</ion-item>


<ion-item lines="none">
<ion-label>Disease</ion-label>
<ion-note color="medium" style="font-size:15px;">
None
</ion-note>
</ion-item>


<ion-item lines="none">
<ion-label>Gestation</ion-label>
<ion-note color="medium" style="font-size:15px;">
None
</ion-note>
</ion-item>










</ion-list>









</div>
</app-layout>
</template>
<script setup>
import AppLayout from '@/components/AppLayout.vue';
import { useRoute } from 'vue-router';
import { reactive, onMounted } from 'vue';
import {db} from '@/Database/database';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,IonItem, IonLabel, IonList, IonNote,IonListHeader, IonIcon   } from '@ionic/vue';
import { ellipsisHorizontalCircleSharp } from 'ionicons/icons';

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