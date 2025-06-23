<script setup>
import AppLayout from '@/components/AppLayout.vue';
import { db } from '@/Database/database';
import { store } from '@/store/Index';
import { IonButton, IonInput, IonItem, IonList, IonSelect, IonSelectOption } from '@ionic/vue';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';


const farmType=[
{name:'Animals only'},
{name:'Mixed'}
];


const form = reactive({
name:'',
location:'',
tel:'',
size:'',
type:'',
contact:'',
});

const message=reactive({
error:null,
success:null
});

const router=useRouter();

const submit=()=>{
if(form.name!='' || form.location!='' || form.tel!='' || form.size!='' || form.type!='' || form.contact!=''){
message.error='';
db.from('farm')
.insert([{
user_email:store.state.user,
name:form.name,
location:form.location,
tel:form.tel,
type:form.type,
tel:form.contact,
size:form.size

}])
.select()
.then((response)=>{
if(response.error==null){
router.push('/farm');
}
})
.catch((error)=>{console.log(error)});
}else{
message.error='Fill in all fields';
}

}


</script>
<template>
<app-layout title="New farm" back="/farm">
<form @submit.prevent="submit">
<div style="color:red;padding:10px;" v-if="message.error!=null">
{{ message.error }}
</div>
<ion-list>
<ion-item>
<ion-input label="Farm name" placeholder="Enter name of farm" v-model="form.name"></ion-input>
</ion-item>
<ion-item>
<ion-input label="Location" placeholder="Enter farm location" v-model="form.location"></ion-input>
</ion-item>
<ion-item>
<ion-input label="Farm size" placeholder="Enter farm size" v-model="form.size"></ion-input>
</ion-item>
<ion-item>
<ion-select label="Type of farm" label-placement="floating" v-model="form.type">
<ion-select-option :value="f.name" v-for="(f,key) in farmType" :key="key">
{{ f.name }}
</ion-select-option>
</ion-select>
</ion-item>

<ion-item>
<ion-input label="Contact" placeholder="Enter telephone number" v-model="form.contact" type="number"></ion-input>
</ion-item>
<ion-item lines="none">
<ion-button expand="block" style="width:100%;margin-top:20px;" class="ion-button" size="default" type="submit">Save</ion-button>
</ion-item>

</ion-list>

</form>
</app-layout>
</template>