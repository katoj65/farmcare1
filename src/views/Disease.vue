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
IonButtons, IonButton, IonModal, IonHeader, IonToolbar, IonContent, IonTitle, IonFab, IonFabButton,IonInput,IonTextarea
} from '@ionic/vue';
import { chevronForward, listCircle,add } from 'ionicons/icons';

const row=reactive({
disease:[]
});


const open=ref(false);






const route=useRoute();
const router=useRouter();
onMounted(async ()=>{
const res=await db.
from('disease')
.select("*")
if(res.error==null){
row.disease=res.data;
}else{
console.log(res.error);
}
});


const message=reactive({
error:null
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
from('disease')
.insert([
{ name:form.name,description:form.description},
]).select();
if(res.error==null){
res.data.forEach(element => {
open.value=false;
router.push('/disease/show/'+element.id);
});

}else{
console.log(error);
}



}
}






</script>
<template>
<app-layout title="Diseases" back="/">

<ion-list>
<ion-item v-for="(d,key) in row.disease" :key="key" lines="full" details="true" button @click="router.push('/disease/show/'+d.id)">
<ion-label>
<h3 style="font-weight:bolder;text-transform:capitalize;">{{ d.name }} </h3>
<p>
{{ d.description }}
</p>
</ion-label>
</ion-item>
</ion-list>









<ion-fab slot="fixed" vertical="bottom" horizontal="end" >
<ion-fab-button color="dark" @click="open=true">
<ion-icon :icon="add"></ion-icon>
</ion-fab-button>
</ion-fab>










<ion-modal :is-open="open" v-if="route.name=='disease'">
<ion-header>
<ion-toolbar>
<ion-title>Add disease details</ion-title>
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
<ion-input  placeholder="Enter disease" v-model="form.name"></ion-input>
</ion-item>

<ion-item>
<ion-textarea  placeholder="Enter disease description" v-model="form.description"></ion-textarea>
</ion-item>
<ion-item lines="none">
<ion-button expand="block" style="width:100%;margin-top:20px;" class="ion-button" size="default" type="submit" >Save</ion-button>
</ion-item>
</ion-list>



</form>
</ion-content>
</ion-modal>

</app-layout>
</template>
