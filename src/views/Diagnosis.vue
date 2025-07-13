<template>
<app-layout title="Settings">
<ion-list>
<ion-item v-for="(l,key) in diagnosis" :key="key">
<ion-label>
<h3>
{{ l.attribute }}
</h3>
<p>
{{ l.minimum }} - {{ l.maximum }}
</p>
<p style="padding-top:10px;">
<strong>Disease:</strong> {{ l.disease.name }}
</p>
<p style="padding-top:10px;">
<strong>Symptom:</strong> {{ l.disease.symptom.map(s => s.name).join(', ') }}
</p>

<p style="padding-top:10px;">
<strong>Treatment:</strong> {{ l.disease.treatment.map(t => t.name).join(', ') }}
</p>
</ion-label>
</ion-item>
</ion-list>

</app-layout>
</template>

<script setup>
import AppLayout from '@/components/AppLayout.vue';
import { IonItem, IonLabel, IonList } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { onMounted,ref} from 'vue';
import { db } from '@/Database/database';










const router=useRouter();
const diagnosis=ref([]);
onMounted(async ()=>{
const {data,error}=await db.from('parameters').select('*,disease(*,symptom(*),treatment(*))');
if(error==null){
diagnosis.value=data;
}else{
console.log(error);
}



});



</script>