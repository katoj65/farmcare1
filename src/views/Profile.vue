<template>
<app-layout title="My Profile">

<div  v-for="(r,key) in data.profile" :key="key">
<ion-item>
<ion-label>
<h3>Names</h3>
<p>
{{ r.firstname }} {{ r.lastname }}
</p>
</ion-label>
</ion-item>



<ion-item>
<ion-label>
<h3>Email</h3>
<p>
{{ r.email }}
</p>
</ion-label>
</ion-item>


<ion-item>
<ion-label>
<h3>Telephone</h3>
<p>
{{ r.tel }}
</p>
</ion-label>
</ion-item>


</div>
</app-layout>
</template>

<script setup lang="ts">
import AppLayout from '@/components/AppLayout.vue';
import {db} from '@/Database/database';
import { computed, onMounted,reactive } from 'vue';
import {store} from '@/store/Index';
import { IonItem, IonLabel } from '@ionic/vue';

const data=reactive({
profile:null,
});





onMounted(async ()=>{
db.from('profile')
.select("*")
.eq('email',store.state.user)
.then((response)=>{
if(response.error==null){
data.profile=response.data;
}
})
.catch((error)=>{
console.log(error)});
});








</script>