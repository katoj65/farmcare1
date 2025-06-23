<script setup>
import AppLayout from '@/components/AppLayout.vue';
import { db } from '@/Database/database';
import { IonAvatar, IonItem, IonLabel, IonList, IonContent, IonIcon } from '@ionic/vue';
import { clipboardOutline } from 'ionicons/icons';
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';


const row=reactive({
animal:[],
});

const router=useRouter();
const route=useRoute();
onMounted(()=>{
const id=route.path.split('/');
db.from('animal_report')
.select('*,animal(name,id)')
.then((response)=>{
if(response.error==null){
row.animal=response.data;
}else{
console.log(response.error);
}
})
.catch((error)=>{console.log(error)});
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








</script>

<template>
<app-layout title="Employees" back="/reports">
<div style="padding-bottom:100px;">
<ion-list>

<ion-item  detail="true" v-for="(a,key) in row.animal" :key="key" @click="router.push('/animal/'+a.animal.id)">
<ion-icon :icon="clipboardOutline"></ion-icon>
<ion-label style="padding-left:10px;">
<h3 style="text-transform:capitalize;font-weight:bold;font-size:14px;">{{ a.animal.name }} </h3>
<p style="text-transform:capitalize;">
{{ a.type }} : {{ a.description }} {{ measurements(a.type) }}
</p>
</ion-label>
</ion-item>
</ion-list>
</div>
</app-layout>
</template>