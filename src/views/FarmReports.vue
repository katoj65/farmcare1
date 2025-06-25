<template>
<farm-layout>

<ion-list>
<ion-list-header color="light">
<ion-label>
Farm reports
</ion-label>
</ion-list-header>





<ion-item :button="true" detail="false" lines="full" v-for="(r,key) in row.report" :key="key">
<ion-label>
<strong style="text-transform:capitalize;">
{{ r.animal.name }}
</strong><br/>
<ion-note color="medium" class="ion-text-wrap">
<table style="width:100%;margin-top:5px;">
<tr>
<td style="text-transform:capitalize;">
{{ r.type }}
</td>
<td style="width:20%;">
{{ r.description }} {{ measurements(r.type) }}
</td>
</tr>
<tr>
<td colspan="2">
Date: {{ dateFormat(r.created_at) }}
</td>
</tr>
</table>
</ion-note>
</ion-label>
<div class="metadata-end-wrapper" slot="end">
<ion-icon color="medium" :icon="pricetagOutline"></ion-icon>
<ion-note color="medium" style="padding-left:5px;">
    {{ r.animal.tag }}
</ion-note>
</div>
</ion-item>

</ion-list>













</farm-layout>
</template>
<script setup>
import FarmLayout from '@/components/FarmLayout.vue';
import {IonItem, IonLabel,IonFab, IonFabButton, IonFabList,IonIcon ,IonAvatar,IonList, IonListHeader, IonNote,} from '@ionic/vue';
import { ellipsisHorizontalCircleSharp,add,pricetagOutline } from 'ionicons/icons';
import { reactive, onMounted,computed } from 'vue';
import {db} from '@/Database/database';
import { useRoute, useRouter } from 'vue-router';

const row=reactive({
report:[],
});




const router=useRouter();
const route=useRoute();
const id=route.path.split('/');
onMounted(async ()=>{
const response=await db.
from('animal_report')
.select('*,animal(*)')
.eq('animal.farm_id',id[3]);
if(response.error==null){
row.report=response.data;
}else{
console.log(response.error);
}
});




const dateFormat=(date)=>{
let dates=new Date(date);
return dates.toLocaleDateString();
};

const measurements=(item)=>{
let measure='';
if(item==='animal temperature'){
measure='Degrees';
}else if(item==='heartbeat'){
measure='BPM';
}else if(item==='environmental temperature'){
measure='Degrees';
}
return measure;
};




</script>
<style scoped>
table tr td{
font-size:14px;
}
</style>