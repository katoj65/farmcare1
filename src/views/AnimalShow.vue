<template>
<app-layout title="Animal details" :back="row.back">
<div v-if="row.animal!=''" style="padding-bottom:100px;">
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

<ion-item lines="none">
<ion-label>Date added</ion-label>
<ion-note color="medium" style="text-transform:capitalize;font-size:10px;">
{{ row.animal.created_at }}
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


<ion-item lines="none">
<ion-label>Feeding</ion-label>
<ion-note color="medium" style="font-size:15px;">
None
</ion-note>
</ion-item>







</ion-list>









</div>







<ion-fab slot="fixed" vertical="bottom" horizontal="end">
<ion-fab-button color="dark" @click="modal(true)">
<ion-icon :icon="add" ></ion-icon>
</ion-fab-button>
</ion-fab>












<ion-modal :is-open="isOpen" v-if="route.name=='animal details'">
<ion-header>
<ion-toolbar>
<ion-title>Add animal report</ion-title>
<ion-buttons slot="end">
<ion-button @click="modal(false)">Close</ion-button>
</ion-buttons>
</ion-toolbar>
</ion-header>
<ion-content>
<ion-list>
<ion-list-header color="light">
<ion-label>
<h4 style="font-size:18px;font-weight:bold;text-transform:capitalize"> {{ row.animal.name }}</h4>
</ion-label>
</ion-list-header>
</ion-list>



<form style="padding:15px;" @submit.prevent="submit">
<ion-list style="border:solid thin #e5e8e8;border-radius:10px;padding-bottom:15px; ">
<ion-item>
<ion-select label="Report" placeholder="Select option">
<ion-select-option value="animal temperature">Animal Temperature</ion-select-option>
<ion-select-option value="heartbeat">Heartbeat</ion-select-option>
<ion-select-option value="environmental temperature">Environmental temperature</ion-select-option>
</ion-select>
</ion-item>

<ion-item>
<ion-input label="Measurements" placeholder="Enter readings" type="number"></ion-input>
</ion-item>



<ion-item lines="none">
<ion-button expand="block" style="width:100%;margin-top:20px;" class="ion-button" size="default" type="submit">Save</ion-button>
</ion-item>
</ion-list>

</form>







</ion-content>
</ion-modal>
</app-layout>
</template>
<script setup>
import AppLayout from '@/components/AppLayout.vue';
import { useRoute } from 'vue-router';
import { reactive, onMounted, computed,ref } from 'vue';
import {db} from '@/Database/database';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,IonItem, IonLabel, IonList, IonNote,IonListHeader, IonIcon, IonButton, IonFab, IonFabButton,
IonButtons,IonModal, IonHeader, IonToolbar, IonContent, IonTitle,IonInput, IonSelect,IonSelectOption   } from '@ionic/vue';
import { ellipsisHorizontalCircleSharp,add } from 'ionicons/icons';

const row=reactive({
animal:'',
back:'',
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

});


const dateFormat=computed((date)=>{
let d=date.split('-');
return d[0]+'-'+d[1]+'-'+d[2];
});

const isOpen = ref(false);
const modal=(state)=>{
isOpen.value=state;
}



const form=reactive({
type:'',
qtty:''
});

const message=reactive({
error:null,
});




const submit=()=>{
alert();
}



</script>