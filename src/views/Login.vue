<template>
<ion-page>
<ion-content :fullscreen="true" class="ion-padding" style="text-align:center">

{{ route.name }}

<h1>
<ion-icon :icon="logoIonic" size="large"  color="secondary"></ion-icon>
</h1>
<h4>Farm Care</h4>
<p>Sign Up</p>



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
<ion-button expand="block" style="width:100%;margin-top:20px;" class="ion-button" size="default" type="submit">Register</ion-button>
</ion-item>
</ion-list>
</form>

<ion-item lines="none">
    <ion-button expand="block" style="width:100%;margin-top:20px;" class="ion-button" size="default" type="submit" color="light" @click="router.push('/')">Login</ion-button>
    </ion-item>
</ion-content>
</ion-page>
</template>

<script setup >
import { db } from '@/Database/database';
import { store } from '@/store/Index';
import { IonButton, IonContent, IonIcon, IonInput, IonItem, IonList, IonPage } from '@ionic/vue';
import { logoIonic } from 'ionicons/icons';
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';





const route=useRoute();

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
