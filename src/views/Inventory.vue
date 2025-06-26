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
  } from '@ionic/vue';
  import { chevronForward, listCircle } from 'ionicons/icons';

const row=reactive({
inventory:[]
});




onMounted(async ()=>{
const res=await db.
from('inventory')
.select("*,farm(*)")
.eq('farm.user_email',store.state.user)
if(res.error==null){
row.inventory=res.data;
}else{
console.log(res.error);
}
});


</script>
<template>
<app-layout title="Inventory" back="/">
<ion-list>

<ion-item detail="false" lines="full" v-for="(m,key) in row.inventory" :key="key">
<ion-label>
<strong>{{ m.farm.name }} Inventory</strong><br/>
<ion-note color="medium" class="ion-text-wrap" style="text-transform:capitalize">
{{ m.item }}
</ion-note>
</ion-label>
<div class="metadata-end-wrapper" slot="end">
<ion-note color="medium">
{{ m.quantity }}
</ion-note>
<!-- <ion-icon color="medium" :icon="chevronForward"></ion-icon> -->
</div>
</ion-item>



</ion-list>
</app-layout>
</template>
