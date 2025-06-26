<template>
<IonContent class="ion-padding" style="text-align:center">
<h1>
    <ion-icon :icon="logoIonic" size="large"  color="secondary"></ion-icon>
</h1>
<h2 style="font-weight:bold;">Farm Care</h2>


<form @submit.prevent="submit" style="margin-top:30px;" v-if="screen=='login'">
<p>You are welcome</p>
<div style="color:red;padding:10px;" v-if="message.error!=''">
{{ message.error }}
</div>



<ion-list style="border:solid thin #e5e8e8;padding:10px;border-radius:20px;">
<ion-item>
<ion-input placeholder="Enter email" v-model="form.email"></ion-input>
</ion-item>

<ion-item>
<ion-input  placeholder="Enter password" v-model="form.password"></ion-input>
</ion-item>

<ion-item lines="none">
<ion-button expand="block" style="width:100%;margin-top:20px;" class="ion-button" size="default" type="submit">Login</ion-button>
</ion-item>
</ion-list>
</form>
<signup v-else/>
<ion-item lines="none">
<ion-button expand="block" style="width:100%;margin-top:20px;" class="ion-button" size="default" type="submit" color="light" @click="screenSwitch" v-if="screen=='login'">Register</ion-button>
<ion-button expand="block" style="width:100%;margin-top:20px;" class="ion-button" size="default" type="submit" color="light" @click="screenSwitch" v-else>LogIn</ion-button>
</ion-item>
</IonContent>
</template>
<script setup>
import { db } from '@/Database/database';
import { store } from '@/store/Index';
import { IonButton, IonContent, IonIcon, IonInput, IonItem, IonList } from '@ionic/vue';
import { logoIonic } from 'ionicons/icons';
import { reactive,ref } from 'vue';
import { useRouter } from 'vue-router';
import Signup from '@/components/Signup.vue'





const form=reactive({
email:'',
password:''
});

const message=reactive({
error:'',
success:'',
});




const screen=ref('login');

const screenSwitch=()=>{
if(screen.value=='login'){
screen.value='register';
}else{
screen.value='login';
}
}






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
if(response.error==null){
store.state.user=response.data.user.email;
router.push('/');
}else{
message.error='Invalid email or password';
}
}).catch(error=>console.log(error));
}
}




</script>