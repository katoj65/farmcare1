<template>
<app-layout title="Diagnosis">
<form @submit.prevent="submit">

<div style="padding:10px;">
Add Diagnosis Information
</div>
<div v-if="error!=false" style="color:red;padding:10px;">
{{ error }}
</div>
<ion-list>
<ion-item>
<ion-select label="Select disease" label-placement="Disease" v-model="form.disease_id">
<ion-select-option :value="d.id" v-for="(d,key) in diseases" :key="key">
{{ d.name }}
</ion-select-option>
</ion-select>
</ion-item>

<ion-item>
<ion-select label="Select parameter" label-placement="Parameter" v-model="form.parameter">
<ion-select-option :value="d.id" v-for="(d,key) in parameters" :key="key">
{{ d.name }}
</ion-select-option>
</ion-select>
</ion-item>

<ion-item>
<ion-input label="Minimum" type="number" placeholder="Enter minimum" v-model="form.minimum"></ion-input>
</ion-item>
<ion-item>
<ion-input label="Maxmum" type="number" placeholder="Enter maximum" v-model="form.maximum"></ion-input>
</ion-item>


<ion-item lines="none">
<ion-button expand="block" style="width:100%;margin-top:20px;" class="ion-button" size="default" type="submit">Save</ion-button>
</ion-item>

</ion-list>
</form>
</app-layout>
</template>

<script setup >
import AppLayout from '@/components/AppLayout.vue';
import { IonItem, IonLabel,IonList, IonInput, IonSelect, IonSelectOption, IonButton} from '@ionic/vue';
import { onMounted, ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { db } from '@/Database/database';



const diseases=ref([]);
const router=useRouter();
onMounted(async ()=>{
const {data,error}=await db.from('disease').select('*');
if(error==null){
diseases.value=data;
}else{
console.log(error)
}
});

const parameters=ref([
{ name: 'Animal temperature'},
{ name: 'Heartbeat'},
{ name: 'Environment temperature'},

]);


const form=reactive({
disease_id: '',
parameter: '',
minimum: '',
maximum: ''
});

const error=ref(false);
const submit= async ()=>{
if(form.disease_id=='' || form.parameter=='' || form.minimum=='' || form.maximum==''){
error.value='Fill all fields';
}
else{

const { data, error } = await db.from('parameters').insert([{
attribute: form.parameter,
disease_id: form.disease_id,
minimum: form.minimum,
maximum: form.maximum}]).select();
if(error==null){
console.log(data);
}else{
console.log(error);
}
router.push('/diagnosis');




}

}








</script>