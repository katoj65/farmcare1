<script setup>
import AppLayout from '@/components/AppLayout.vue';
import {db} from '@/Database/database';
import { IonItem, IonLabel,  IonFab, IonFabButton, IonIcon, IonAvatar } from '@ionic/vue';
import { caretForwardOutline, add,leaf } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import { reactive,onMounted } from 'vue';
import {store} from '@/store/Index';



const router=useRouter();
const data=reactive({
farm:'',
worker:[]

});


onMounted(async ()=>{
const farm=await db.from('farm')
.select("*")
.eq('user_email',store.state.user);
if(farm.error==null){
data.farm=farm.data;
}else{
console.log(farm.error);
}

//get session
const user=await db.auth.getSession();
if(user.error==null){
const userdata=user.data.session.user.user_metadata;
const tel=userdata.tel;
const worker=await db.from('worker')
.select("*,farm(*)")
.eq('tel',tel);
if(worker.error==null){
data.worker=worker.data;
}else{
console.Console.log(worker.error);
}

}else{
console.log(user.error);
}


















});













</script>
<template>
<app-layout title="Farm" back="/">
<div v-if="data.farm.length>0">
<ion-item detail="true" v-for="(f,key) in data.farm" :key="key" @click="router.push('/farm/show/'+f.id)" lines="full" button>
<ion-avatar slot="start">
<img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
</ion-avatar>
<ion-label>
<h3 style="font-weight:bold;">
{{ f.name }}
</h3>
<p>
{{ f.location }} - 0{{ f.tel }}
</p>
</ion-label>
</ion-item>
</div>


<div v-if="data.worker.length>0" style="margin-top:20px;">
<ion-item detail="true" v-for="(w,key) in data.worker" :key="key" @click="router.push('/farm/show/'+w.farm.id)" lines="full" button>
<ion-avatar slot="start">
<img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
</ion-avatar>
<ion-label>
<h3 style="font-weight:bold;">
  You are a 
  {{ w.role }}
</h3>
<p>
{{ w.farm.name }}
</p>
<p>
{{ w.farm.location }} - 0{{ w.farm.tel }}
</p>
</ion-label>
</ion-item>
</div>



<ion-fab slot="fixed" vertical="bottom" horizontal="end">
    <ion-fab-button color="dark" @click="router.push('/farm/create')">
      <ion-icon :icon="add"></ion-icon>
    </ion-fab-button>
  </ion-fab>
</app-layout>
</template>