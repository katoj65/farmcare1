<template>
<IonContent class="ion-padding" style="text-align:center">
<h1>
    <ion-icon :icon="logoIonic" size="large"  color="secondary"></ion-icon>
</h1>
<h4>Farm Care</h4>
<p>You are welcome</p>

<form @submit.prevent="submit" style="margin-top:30px;">
<div style="color:red;" v-if="message.error!=''">
{{ message.error }}

</div>
<ion-list>
<ion-item>
<ion-input label="Email" placeholder="Enter email" v-model="form.email"></ion-input>
</ion-item>

<ion-item>
<ion-input label="Password" placeholder="Password" v-model="form.password"></ion-input>
</ion-item>

<ion-item lines="none">
<ion-button expand="block" style="width:100%;margin-top:20px;" class="ion-button" size="default" type="submit">Login</ion-button>
</ion-item>
</ion-list>
</form>
</IonContent>
</template>
<script setup>
import { db } from '@/Database/database';
import { store } from '@/store/Index';
import { IonButton, IonContent, IonIcon, IonInput, IonItem, IonList } from '@ionic/vue';
import { logoIonic } from 'ionicons/icons';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';


const form=reactive({
email:'katoj65@gmail.com',
password:'09/u/2252'
});

const message=reactive({
error:'',
success:'',
});








const router = useRouter();
const submit =()=>{
if(form.email=='' || form.password==''){
message.error='Fill the email address and password';
}else{
message.error='';
const data=db.auth.signInWithPassword({
email:form.email,
password:form.password,
}).then((response)=>{
//console.log(response.error);
if(response.error==null){
store.state.user=response.data.user.email;
router.push('/profile/create');


}else{
message.error='Invalid email or password';
}
}).catch(error=>console.log(error));
}
}




</script>