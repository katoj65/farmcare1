<template>
<ion-page>
<ion-content :fullscreen="true" class="ion-padding" style="text-align:center">



<h1>
<ion-icon :icon="logoIonic" size="large"  color="secondary"></ion-icon>
</h1>
<h3 style="font-weight:bolder;">Farm Care</h3>
<p>Sign Up</p>


<form @submit.prevent="submit" style="margin-top:30px;">
<div style="color:red;" v-if="message.error!=''">
{{ message.error }}
</div>
<ion-list style="border:solid thin #e5e8e8;padding:10px;border-radius:20px;">




<ion-item>
<ion-input label="Email" placeholder="Enter email" v-model="form.email"></ion-input>
</ion-item>

<ion-item>
<ion-input label="Password" placeholder="Password" v-model="form.password" type="password"></ion-input>
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
import { IonPage, IonContent, IonButton, IonIcon, IonInput, IonItem, IonList  } from '@ionic/vue';
import { logoIonic } from 'ionicons/icons';
import { reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { db } from '@/Database/database';
import { store } from '@/store/Index';





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
const data=db.auth.signUp({
email:form.email,
password:form.password,
}).then((response)=>{
if(response.error==null){
store.state.user=response.data.user.email;
router.push('/profile/create');
console.log(response);
}else{
message.error='Invalid email or password';
}
}).catch(error=>console.log(error));
}
}


</script>
