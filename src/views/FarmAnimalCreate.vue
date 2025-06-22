<template>
<farm-layout>
<div style="padding-bottom:100px;">
<form @submit.prevent="submit">
<ion-list style="border:solid thin #e5e8e8;padding:10px;" :inset="true">
<ion-item lines="none">
<ion-label>
<h4 style="font-weight:bolder;font-size:18px;">
Add farm animal
</h4>
<div v-if="message.error!=null" style="color:red;">
{{ message.error }}
</div>


</ion-label>
</ion-item>

<ion-item>
<ion-input label="Name" placeholder="Enter animal name" v-model="form.name"></ion-input>
</ion-item>

<ion-item>
<ion-input label="Tag" placeholder="Enter tag ID" v-model="form.tag"></ion-input>
</ion-item>

<ion-item>
<ion-select label="Breed" placeholder="Select breed" v-model="form.breed">
<ion-select-option value="local">Local breed</ion-select-option>
<ion-select-option value="exotic">Exotic breed</ion-select-option>
<ion-select-option value="cross">Cross breed</ion-select-option>
</ion-select>
</ion-item>


<ion-item>
<ion-select label="Gender" placeholder="Select gender" v-model="form.gender">
<ion-select-option value="male">Male</ion-select-option>
<ion-select-option value="female">Female</ion-select-option>
</ion-select>
</ion-item>

<ion-item>
<ion-input label="Weight (Kg)" placeholder="Enter weight in Kg" type="number" v-model="form.weight"></ion-input>
</ion-item>

<ion-item>
<ion-input label="Color" placeholder="Enter color of the animal" v-model="form.color"></ion-input>
</ion-item>

<ion-item>
<ion-input label="Origin" placeholder="Enter origin of the animal" v-model="form.origin"></ion-input>
</ion-item>


<ion-item lines="none" style="padding-bottom:10px;">
<ion-button expand="block" style="width:100%;margin-top:20px;" class="ion-button" size="default" type="submit">Save</ion-button>
</ion-item>





</ion-list>
</form>
</div>
</farm-layout>
</template>
<script setup lang="ts">
import FarmLayout from '@/components/FarmLayout.vue';
import { IonIcon, IonItem, IonLabel, IonList, IonInput,IonButton, IonSelect, IonSelectOption} from '@ionic/vue';
import { reactive } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import {db} from '@/Database/database';







const form=reactive({
name:'',
tag:'',
breed:'',
gender:'',
weight:'',
origin:'',
id:'',
color:''

});

const message=reactive({
error:null,
success:null
});



const row=reactive({
animal:''
});


const route=useRoute();
const router=useRouter();

const submit=()=>{
let id=route.path.split('/');
form.id=id[3];
if(form.name=='' || form.tag=='' || form.breed=='' || form.gender=='' || form.weight=='' || form.origin=='' || form.id=='' || form.color==''){
message.error='Fill in all fields.';
}else{
message.error=null;

db.from('animal')
.insert([
{
farm_id:form.id,
name:form.name,
tag:form.tag,
breed:form.breed,
gender:form.gender,
color:form.color,
weight:form.weight,
origin:form.origin,
},
])
.select()
.then((response)=>{
if(response.error==null){
response.data.forEach(element => {
router.push('/animal/'+element.id);
});

}else{
console.log(response.error);
}
})
.catch((error)=>{console.log(error)});



}









}







</script>