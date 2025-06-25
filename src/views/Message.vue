<script setup>
import AppLayout from '@/components/AppLayout.vue';
import { reactive, onMounted, computed,ref } from 'vue';
import {db} from '@/Database/database';
import { store } from '@/store/Index';
import { chevronForward, listCircle } from 'ionicons/icons';
import {

    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonNote,
    IonText,

  } from '@ionic/vue';


const row=reactive({
message:[],

});

onMounted(async ()=>{
const res=await db.from('message')
.select('*, animal(name,tag, farm(name)), worker(firstname,lastname)')
.eq('animal.farm.user_email',store.state.user);
if(res.error==null){
row.message=res.data;
}else{
console.log(res.error);
}

});



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


const receiver=(id)=>{
const row=[];
db.from('worker')
.select("*")
.eq('id', 1)
.then((res)=>{
console.log(res);

})
.catch((error)=>console.log(error));

return 'dmkdmkd';
};






</script>
<template>
<app-layout title="Messages" back="/">

<ion-list>
<ion-item detail="false" v-for="(m,key) in row.message" :key="key" lines="none" style="border:solid thin #e5e8e8">
<ion-label>
<strong style="text-transform:capitalize;">
 Animal health report
</strong><br/>
<ion-note color="medium" class="ion-text-wrap">

<table style="width:100%; margin-top:10px;" >
<tr>
<th colspan="2" style="text-align:left;text-transform:capitalize">
{{ m.animal.name }} - {{ m.animal.tag }}
</th>
</tr>
<tr v-for="(s,key) in m.message" :key="key">
<td style="text-align:left; text-transform:capitalize;">{{ s.type }} </td>
<td style="text-align:left;font-size:14px;width:30%;">
{{ s.description }} {{ measurements(s.type) }}
</td>
</tr>
<tr>
<td colspan="2">
From:  {{ m.animal.farm.name }}
</td>
</tr>
</table>
<div style="padding-top:5px;">Sent to: {{ m.worker.firstname+' '+m.worker.lastname  }}</div>
</ion-note>
</ion-label>
</ion-item>

</ion-list>

<!-- {{ row.message }} -->



</app-layout>
</template>