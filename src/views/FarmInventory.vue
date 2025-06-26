<template>
<farm-layout>
<div style="padding-bottom:100px;">
<ion-list>

<ion-list-header color="light">
<ion-label>Farm inventory </ion-label>
</ion-list-header>

<ion-item v-for="(i,key) in row.inventory" :key="key" lines="full">
<ion-icon color="secondary" slot="start" :icon="listCircle" size="large"></ion-icon>
<ion-label>
{{ i.item }}
</ion-label>
<ion-note slot="end">
{{ i.quantity }}
</ion-note>
</ion-item>




</ion-list>
</div>
</farm-layout>
</template>
<script setup >
import FarmLayout from '@/components/FarmLayout.vue';
import { db } from '@/Database/database';
import { IonButton, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonIcon, IonNote } from '@ionic/vue';
import { reactive,onMounted, } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { chevronForward, listCircle } from 'ionicons/icons';



const row=reactive({
inventory:[]
});
const router=useRoute();
const id=router.path.split('/');
onMounted(async ()=>{
const res= await db.
from('inventory')
.select("*")
.eq('farm_id',id[3])
if(res.error==null){
row.inventory=res.data;
}else{
console.log(res.error);
}
});




</script>