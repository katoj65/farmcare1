<template>
<app-layout title="Share Animal Report" :back="row.back">
<div v-if="row.animal!=''" style="padding-bottom:100px;">
<ion-list>






<ion-item lines="none" color="light">
<ion-avatar>
<img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
</ion-avatar>
<ion-label style="font-size:18px;font-weight:bold;text-transform:capitalize;margin-left:10px;">
{{ row.animal.name }}
</ion-label>
<ion-note color="medium" style="font-size:15px;">
  <ion-icon :icon="pricetagSharp"></ion-icon> {{ row.animal.tag }}
</ion-note>
</ion-item>

</ion-list>
</div>






</app-layout>
</template>
<script setup>
import AppLayout from '@/components/AppLayout.vue';
import { useRoute,useRouter } from 'vue-router';
import { reactive, onMounted, computed,ref } from 'vue';
import {db} from '@/Database/database';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,IonItem, IonLabel, IonList, IonNote,IonListHeader, IonIcon, IonButton, IonFab, IonFabButton,
IonButtons,IonModal, IonHeader, IonToolbar, IonContent, IonTitle,IonInput, IonSelect,IonSelectOption, IonBadge, IonAvatar   } from '@ionic/vue';
import { ellipsisHorizontalCircleSharp, add, chevronForward,pricetagSharp } from 'ionicons/icons';


const row=reactive({
animal:'',
back:'',
report:[]
});


const router=useRouter();
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
row.back='/farm/show/'+element.farm.id;
});




}else{
console.log(response.error);
}

})
.catch((error)=>{console.log(error)});



});










const form=reactive({
report:'',
description:''
});

const message=reactive({
error:null,
});














</script>