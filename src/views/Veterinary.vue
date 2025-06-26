<script setup>
import AppLayout from '@/components/AppLayout.vue';
import { db } from '@/Database/database';
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {store} from '@/store/Index';
import {
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonNote,
    IonText,
    IonAvatar
  } from '@ionic/vue';
  import { chevronForward, listCircle,call } from 'ionicons/icons';

const row=reactive({
vet:[]
});



const router=useRouter();
onMounted(async ()=>{
const res=await db.
from('worker')
.select("*,farm(name)")
.eq('farm.user_email',store.state.user)
.eq('role','veterinary');
if(res.error==null){
row.vet=res.data;
}else{
console.log(res.error);
}
});


</script>
<template>
<app-layout title="Veterinary" back="/">



<ion-list>

<ion-item :button="true" detail="true" lines="none" v-for="(v,key) in row.vet" :key="key" style="border:solid thin #e5e8e8;margin:5px;border-radius:5px;" @click="router.push('/worker/show/'+v.id)">
  <ion-avatar slot="start">
    <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
  </ion-avatar>
<ion-label>
<strong> {{ v.firstname }} {{ v.lastname }} </strong><br/>
<ion-text>{{ v.role }} </ion-text><br />
<ion-note color="medium" class="ion-text-wrap">
Works at {{ v.farm.name }}
</ion-note>
</ion-label>
<div class="metadata-end-wrapper" slot="end">
  <ion-icon color="medium" :icon="call" style="margin-right:5px;"></ion-icon>
<ion-note color="medium">0{{ v.tel }} </ion-note>

</div>
</ion-item>



</ion-list>


</app-layout>
</template>
