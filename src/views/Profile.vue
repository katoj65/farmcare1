<template>
<app-layout title="My Profile">

<div v-if="data.profile!=null" style="padding-bottom:100px;">
<ion-item>
<ion-label>
<h3>Names</h3>
<p>
{{ data.profile.first_name}} {{ data.profile.last_name }}
</p>
</ion-label>
</ion-item>



<ion-item>
<ion-label>
<h3>Email</h3>
<p>
{{ data.profile.email }}
</p>
</ion-label>
</ion-item>


<ion-item>
<ion-label>
<h3>Telephone</h3>
<p>
{{ data.profile.tel }}
</p>
</ion-label>
</ion-item>

<ion-item button @click="router.push('/settings')">
<ion-label>Settings</ion-label>
</ion-item>

<ion-item button @click="logout">
<ion-label>Logout</ion-label>
</ion-item>






</div>
</app-layout>
</template>

<script setup >
import AppLayout from '@/components/AppLayout.vue';
import { db } from '@/Database/database';
import { store } from '@/store/Index';
import { IonItem, IonLabel } from '@ionic/vue';
import { onMounted, reactive} from 'vue';
import { useRoute, useRouter } from 'vue-router';

const data=reactive({
profile:null,
});





onMounted(async ()=>{
const user=await db.
auth.getSession();
console.log(user);
if(user.error==null){
const session=user.data.session.user.user_metadata;
data.profile=session;
}else{
console.log(user.error);
}
});




const router=useRouter();
const logout =async ()=>{
const { data, error } = await db.auth.signOut();
store.state.user=null;
router.push('/login');

}




</script>