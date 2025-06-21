<template>
<ion-page>
<ion-header>
<ion-toolbar>
<ion-title>Create profile</ion-title>
</ion-toolbar>
</ion-header>
<ion-content :fullscreen="true">
<ion-header collapse="condense">
<ion-toolbar>
<ion-title size="large">Create Profile</ion-title>
</ion-toolbar>
</ion-header>

<form class="ion-padding" @submit.prevent="submit">
<div v-if="message.error!=null" style="color:red;padding:10px;">
{{ message.error }}
</div>
<ion-list>
<ion-item>
<ion-input label="First name" v-model="form.fname"></ion-input>
</ion-item>
<ion-item>
<ion-input label="Last name" v-model="form.lname"></ion-input>
</ion-item>
<!-- <ion-item>
<ion-input label="Email" v-model="form.email"></ion-input>
</ion-item> -->
<ion-item>
<ion-input label="Telephone" v-model="form.tel"></ion-input>
</ion-item>

<ion-item  lines="none">
<ion-button expand="block" style="width:100%;margin-top:20px;" class="ion-button" size="default" type="submit">Save</ion-button>
</ion-item>

</ion-list>




</form>



</ion-content>
</ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent,IonInput, IonItem, IonList,IonButton } from '@ionic/vue';
import {store} from '@/store/Index';
import {db} from '@/Database/database';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';




const form=reactive({
fname:'',
lname:'',
email:'',
tel:''
});

const message=reactive({
error:null,
success:null
});







const router = useRouter();
const submit=()=>{
const email='';
if(form.fname!='' || form.lname!='' || form.email!='' || form.tel!=''){
message.error='';

form.email=store.state.user;
db.from('profile')
.insert([{
firstname:form.fname,
lastname: form.lname,
email:form.email,
tel:form.tel
},
])
.select()
.then((response)=>{
console.log(response);
if(response.error==null){
router.push('/profile');
}else{
message.error=response.error;
}

})
.catch((error)=>{
console.log(error)});


}else{
message.error='Fill in all fields';
}






}





</script>
