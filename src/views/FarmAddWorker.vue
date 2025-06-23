<template>
<farm-layout>
<div style="padding-bottom:100px;">
<form @submit.prevent="submit">
<ion-list style="border:solid thin #e5e8e8;padding:10px;" :inset="true">
<ion-item lines="none">
<ion-label>
<h4 style="font-weight:bolder;font-size:18px;">
Add farm worker
</h4>
<div v-if="message.error!=null" style="color:red;">
{{ message.error }}
</div>
</ion-label>
</ion-item>

<ion-item>
<ion-input label="First name" placeholder="Enter first name" v-model="form.fname"></ion-input>
</ion-item>

<ion-item>
<ion-input label="Last name" placeholder="Enter last name" v-model="form.lname"></ion-input>
</ion-item>

<ion-item>
<ion-select label="Gender" placeholder="Select gender" v-model="form.gender">
<ion-select-option value="male">Male</ion-select-option>
<ion-select-option value="female">Female</ion-select-option>
</ion-select>
</ion-item>

<ion-item>
<ion-input label="Age" placeholder="Enter age" v-model="form.age" type="number"></ion-input>
</ion-item>

<ion-item>
<ion-input label="Telephone" placeholder="Enter telephone number" type="number" v-model="form.tel"></ion-input>
</ion-item>


<ion-item>
<ion-select label="Designation" placeholder="Select designation" v-model="form.role">
<ion-select-option value="manager">Farm Manager</ion-select-option>
<ion-select-option value="extension">Extension Worker</ion-select-option>
<ion-select-option value="veterinary">Veterinary Officer</ion-select-option>
</ion-select>
</ion-item>


<ion-item lines="none" style="padding-bottom:10px;">
<ion-button expand="block" style="width:100%;margin-top:20px;" class="ion-button" size="default" type="submit">Save</ion-button>
</ion-item>

</ion-list>
</form>
</div>
</farm-layout>
</template>
<script setup >
import FarmLayout from '@/components/FarmLayout.vue';
import { db } from '@/Database/database';
import { IonButton, IonInput, IonItem, IonLabel, IonList, IonSelect, IonSelectOption } from '@ionic/vue';
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';







const form=reactive({
fname:'',
lname:'',
gender:'',
age:'',
tel:'',
id:'',
role:''

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
message.error=null;
let id=route.path.split('/');
form.id=id[3];
if(form.fname=='' || form.lname=='' || form.age=='' || form.gender=='' || form.tel==''){
message.error='Fill in all fields.';
}else{
db.from('worker')
.insert([
{
farm_id:form.id,
firstname:form.fname,
lastname:form.lname,
gender:form.gender,
age:form.age,
tel:form.tel,
role:form.role
},
])
.select()
.then((response)=>{
if(response.error==null){
response.data.forEach(element => {
router.push('/worker/show/'+element.id);
});

}else{
console.log(response.error);
}
})
.catch((error)=>{console.log(error)});



}









}







</script>