<template>

<form @submit.prevent="submit" style="margin-top:30px;">
<div style="color:red;padding:10px;" v-if="message.error!=''">
{{ message.error }}
</div>

<p>Register</p>
<ion-list style="border:solid thin #e5e8e8;padding:10px;border-radius:20px;">
<ion-item>
<ion-input placeholder="Enter your first name" v-model="form.fname"></ion-input>
</ion-item>
<ion-item>
<ion-input placeholder="Enter your lastname" v-model="form.lname"></ion-input>
</ion-item>
<ion-item>
<ion-input placeholder="Enter telephone number" v-model="form.tel" type="number"></ion-input>
</ion-item>
<ion-item>
<ion-input placeholder="Enter email" v-model="form.email" type="email"></ion-input>
</ion-item>
<ion-item>
<ion-input  placeholder="Enter password" v-model="form.password" type="password"></ion-input>
</ion-item>
<ion-item lines="none">
<ion-button expand="block" style="width:100%;margin-top:20px;" class="ion-button" size="default" type="submit">Register</ion-button>
</ion-item>
</ion-list>
</form>

</template>

<script setup >
import { IonPage, IonContent, IonButton, IonIcon, IonInput, IonItem, IonList  } from '@ionic/vue';
import { logoIonic } from 'ionicons/icons';
import { reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { db } from '@/Database/database';
import { store } from '@/store/Index';

const route=useRoute();
const form=reactive({
email:'',
password:'',
fname:'',
lname:'',
tel:'',
});

const message=reactive({
error:'',
success:'',
});

const router = useRouter();
const submit = async ()=>{
if(form.email=='' || form.password=='' || form.fname=='' || form.lname=='' || form.tel==''){
message.error='Fill the email address and password';
return;
}else{
message.error='';
const reg= await db.auth.signUp({
email:form.email,
password:form.password,
options:{
data:{
first_name:form.fname,
last_name:form.lname,
tel:form.tel
}}});
if(reg.error==null){
const login=await db.auth.signInWithPassword({email:form.email,password:form.password});
if(login.error==null){
store.state.user=login.data.user.email;
router.push('/');
}else{
console.log(login.error);
}
}else{
message.error='Invalid email or password';
}
}
}


</script>
