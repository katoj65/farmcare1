<template>
<ion-page>
<login/>
</ion-page>
</template>

<script setup >
import { db } from '@/Database/database';
import { store } from '@/store/Index';
import { IonButton, IonContent, IonIcon, IonInput, IonItem, IonList, IonPage } from '@ionic/vue';
import { logoIonic } from 'ionicons/icons';
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Login from '@/components/Login.vue';




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
