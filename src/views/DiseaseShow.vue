<script setup>
import AppLayout from '@/components/AppLayout.vue';
import { db } from '@/Database/database';
import { onMounted, reactive,ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {store} from '@/store/Index';
import {
IonIcon,
IonItem,
IonLabel,
IonList,
IonNote,
IonText,
IonAvatar,
IonButtons, IonButton, IonModal, IonHeader, IonToolbar, IonContent, IonTitle, IonFab, IonFabButton,IonListHeader,IonInput,IonTextarea,
} from '@ionic/vue';
import { chevronForward, listCircle, add, informationCircle,heartCircleOutline } from 'ionicons/icons';

const row=reactive({
disease:null,
symptom:[],
treatment:[]
});

const open=ref(false);
const open2=ref(false);





const route=useRoute();
const router=useRouter();
const id=route.path.split('/');

onMounted(async ()=>{
const res=await db.
from('disease')
.select("*")
.eq('id',id[3]);
if(res.error==null){
res.data.forEach(element => {
row.disease=element;
});

//symptoms
const symp=await db.
from('symptom')
.select("*")
.eq('disease_id', row.disease.id)
if(symp.error==null){
row.symptom=symp.data;
form.name='';
form.description='';
}else{
console.log(symp.error);
}

//treatment
const treatment=await db.
from('treatment')
.select("*")
.eq('disease_id',id[3]);
if(treatment.error==null){
row.treatment=treatment.data;
form2.name='';
form2.description='';
}else{
console.log(treatment.error);
}
}else{
console.log(res.error);
}
});












const message=reactive({
error:null,
error2:null,
});

const form=reactive({
name:'',
description:''
});

const submit= async ()=>{
if(form.name=='' || form.description==''){
message.error='Fill in all fields';
}else{

const res=await db.
from('symptom')
.insert([{ name:form.name,description:form.description,disease_id:row.disease.id}]).select();
if(res.error==null){
res.data.forEach(element=>{
row.symptom.push(element);
open.value=false;
});


}else{
console.log(res.error);
}

}
}



const form2=reactive({
name:'',
description:''
});


const submit2= async ()=>{
if(form2.name=='' || form2.description==''){
message.error2='Fill in all fields';
}else{

const res=await db.
from('treatment')
.insert([{ name:form2.name,description:form2.description,disease_id:row.disease.id}]).select();
if(res.error==null){
res.data.forEach(element=>{
row.treatment.push(element);
open2.value=false;
});


}else{
console.log(res.error);
}

}
}



</script>
<template>
<app-layout title="Diseases Details" back="/disease">




<div v-if="row.disease!=null">
<ion-list>
<ion-item color="light" lines="none">
<ion-label>
<strong style="text-transform:capitalize">{{ row.disease.name }} </strong><br/>
<ion-note color="medium" class="ion-text-wrap">
<div style="padding-top:10px;">
{{ row.disease.description }}
</div>
</ion-note>
</ion-label>
<div class="metadata-end-wrapper" slot="end" @click="open2=true">
<ion-icon color="medium" :icon="add"></ion-icon>
<ion-note color="medium"> Prescription</ion-note>
</div>
</ion-item>
<ion-list-header color="light">
<ion-label>
Symptoms
</ion-label>
</ion-list-header>





<ion-item :button="true" detail="false" lines="full" v-for="(s,key) in row.symptom" :key="key">
<ion-icon :icon="informationCircle" slot="start"></ion-icon>
<ion-label>
<strong style="text-transform:capitalize;">
{{ s.name }}
</strong><br/>
<ion-note color="medium" class="ion-text-wrap">
{{ s.description }}
</ion-note>
</ion-label>
</ion-item>
<ion-list-header color="light">
<ion-label>
Treatment
</ion-label>
</ion-list-header>




<ion-item  detail="false" v-for="(t,key) in row.treatment" :key="key" lines="full">
<ion-icon :icon="heartCircleOutline" slot="start"></ion-icon>
<ion-label>
<strong style="text-transform:capitalize;">
{{ t.name }}
</strong>
<br/>
<ion-note color="medium" class="ion-text-wrap">
  {{ t.description }}
</ion-note>
</ion-label>
<div class="metadata-end-wrapper" slot="end">
<!-- <ion-icon color="medium" :icon="heartCircleOutline"></ion-icon> -->
<!-- <ion-note color="medium">Yesterday</ion-note> -->
</div>
</ion-item>





</ion-list>












<ion-modal :is-open="open" v-if="route.name=='disease show'">
<ion-header>
<ion-toolbar>
<ion-title>Add symptoms</ion-title>
<ion-buttons slot="end">
<ion-button @click="open=false">Close</ion-button>
</ion-buttons>
</ion-toolbar>
</ion-header>
<ion-content class="ion-padding">
<form @submit.prevent="submit">
<div style="color:red;padding:10px;" v-if="message.error!=null">
{{ message.error }}
</div>
<ion-list style="border:solid thin #e5e8e8;border-radius:10px;padding:10px;">
<ion-item>
<ion-input  placeholder="Enter symptom" v-model="form.name"></ion-input>
</ion-item>

<ion-item>
<ion-textarea  placeholder="Enter symptom description" v-model="form.description"></ion-textarea>
</ion-item>
<ion-item lines="none">
<ion-button expand="block" style="width:100%;margin-top:20px;" class="ion-button" size="default" type="submit" >Save</ion-button>
</ion-item>
</ion-list>



</form>
</ion-content>
</ion-modal>


















<ion-modal :is-open="open2" v-if="route.name=='disease show'">
<ion-header>
<ion-toolbar>
<ion-title>Add treatment</ion-title>
<ion-buttons slot="end">
<ion-button @click="open2=false">Close</ion-button>
</ion-buttons>
</ion-toolbar>
</ion-header>
<ion-content class="ion-padding">
<form @submit.prevent="submit2">
<div style="color:red;padding:10px;" v-if="message.error2!=null">
{{ message.error2 }}
</div>
<ion-list style="border:solid thin #e5e8e8;border-radius:10px;padding:10px;">
<ion-item>
<ion-input  placeholder="Enter treatment" v-model="form2.name"></ion-input>
</ion-item>

<ion-item>
<ion-textarea  placeholder="Enter treatment description" v-model="form2.description"></ion-textarea>
</ion-item>
<ion-item lines="none">
<ion-button expand="block" style="width:100%;margin-top:20px;" class="ion-button" size="default" type="submit" >Save</ion-button>
</ion-item>
</ion-list>
</form>
</ion-content>
</ion-modal>





</div>

<ion-fab slot="fixed" vertical="bottom" horizontal="end" >
    <ion-fab-button color="dark" @click="open=true">
    <ion-icon :icon="add"></ion-icon>
    </ion-fab-button>
    </ion-fab>

</app-layout>
</template>
