<template>
<app-layout title="Animal details" :back="row.back">
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
</ion-note>
</ion-item>




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
<ion-label style="font-weight:bold;">

    Animal Health Report</ion-label>
    <ion-button v-if="row.report.length>0" color="dark">
        <span class="material-icons" >share</span>
    </ion-button>
</ion-list-header>




<ion-item v-for="(r,key) in row.report" :key="key" color="light" style="margin-top:3px;" lines="none">
<ion-label style="text-transform:capitalize">
{{ r.type }}
</ion-label>
<ion-note color="medium" style="font-size:15px;">
{{ r.description }} {{ measurements(r.type) }}
</ion-note>
</ion-item>




<div v-if="row.report.length>0" style="margin-top:5px;border:solid thin #e5e8e8;margin:10px;border-radius:5px;">
<ion-item lines="none">
<h6 style="font-weight:bold;">Recommendations</h6>
</ion-item>
<ion-list v-for="(r,key) in row.report" :key="key">
<ion-item v-for="(x,key) in doctor(r.type,r.description)" :key="key" lines="none">
<ion-icon :icon="chevronForward" ></ion-icon>
<ion-label>{{ x.action }}</ion-label>
</ion-item>
</ion-list>


</div>









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
<h4 style="font-size:18px;font-weight:bold;text-transform:capitalize"> {{ row.animal.name }}
</h4>
</ion-label>
<span style="font-size:14px;">Tag: {{  row.animal.tag }}</span>
</ion-list-header>
</ion-list>


<form style="padding:15px;" @submit.prevent="submit">
<ion-list style="border:solid thin #e5e8e8;border-radius:10px;padding-bottom:15px; ">
<div v-if="message.error!=null" style="padding:10px;color:red;">
{{ message.error }}
</div>
<ion-item>
<ion-select label="Report" placeholder="Select option" v-model="form.report">
<ion-select-option value="animal temperature">Animal Temperature</ion-select-option>
<ion-select-option value="heartbeat">Heartbeat</ion-select-option>
<ion-select-option value="environmental temperature">Environmental temperature</ion-select-option>
</ion-select>
</ion-item>

<ion-item>
<ion-input label="Measurements" placeholder="Enter readings" type="number" v-model="form.description"></ion-input>
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
IonButtons,IonModal, IonHeader, IonToolbar, IonContent, IonTitle,IonInput, IonSelect,IonSelectOption, IonBadge, IonAvatar   } from '@ionic/vue';
import { ellipsisHorizontalCircleSharp, add, chevronForward } from 'ionicons/icons';


const row=reactive({
animal:'',
back:'',
report:[]
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
row.back='/farm/show/'+element.farm.id;
});

//get animal reports
db.from('animal_report')
.select("type,description")
.eq('animal_id',row.animal.id)
.limit(3)
.then((response)=>{
if(response.error==null){
row.report=response.data;
}else{
console.log(response.error);
}
})
.catch((error)=>{console.log(error)});
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
report:'',
description:''
});

const message=reactive({
error:null,
});


const measurements=(item)=>{
let measure='';
if(item==='animal temperature'){
measure='Degrees';
}else if(item==='heartbeat'){
measure='Hbps';
}else if(item==='environmental temperature'){
measure='Degrees';
}
return measure;
};










const submit=()=>{
let id=route.path.split('/');
message.error=null;
if(form.report=='' || form.description==''){
message.error='Fill in all fields';
}else{
db.from('animal_report')
.insert([{
animal_id:id[2],
type:form.report,
description:form.description,
status:'active'
//status:['active','treatment','healed']
}
])
.select()
.then((response)=>{
if(response.error==null){
modal(false);
form.description='';
form.report='';
response.data.forEach(element => {
row.report.push(element);
});

}else{
console.log(response.error);
}
})
.catch((error)=>{console.log(error)})
}
}

//




const doctor=(option,count)=>{
//animal temperature.
//heartbeat.
//environmental temperature.
let response=[];
if(option=='animal temperature'){

if(count>35 && count<40){
response.push({action:'Animal temperature normal.'});
}else if(count>40){
response.push({action:'Antibiotics.'});
response.push({action:'Isolate the animal.'});
}else{
response.push({action:'Move to animal to shade.'});
}

}else if(option=='heartbeat'){

if(count>=48 && count<=84){
response.push({action:'Heartbeat is normal.'});
}else if(count>84){
response.push({action:'Refer to the veterinary doctor for heartbeat.'});
}else{
response.push({action:'Refer to the veterinary doctor.'});
}


}else if(option=='environmental temperature'){

if(count>=20 && count<=35){
response.push({action:'Environment temperature is normal.'});
}else if(count>35){
response.push({action:'Provide shade, clean water.'});
response.push({action:'Adjust dietary needs.'});
}

}

return response;
}






</script>