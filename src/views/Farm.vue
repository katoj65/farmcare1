<script setup>
import AppLayout from '@/components/AppLayout.vue';
import {db} from '@/Database/database';
import { IonItem, IonLabel,  IonFab, IonFabButton, IonIcon } from '@ionic/vue';
import { caretForwardOutline, add } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import { reactive,onMounted } from 'vue';
import {store} from '@/store/Index';






const router=useRouter();
const data=reactive({
farm:'',
});


onMounted(()=>{
db.from('farm')
.select("*")
.eq('user_email',store.state.user)
.then((response)=>{
if(response.error==null){
// console.log(response.data);
data.farm=response.data;
}
})
.catch((error)=>{console.log(error)})

});








</script>
<template>
<app-layout title="Farm" back="/">

<ion-item detail="true" v-for="(f,key) in data.farm" :key="key" @click="router.push('/farm/show/'+f.id)">
<ion-label>
<h3>
{{ f.name }}
</h3>
<p>
{{ f.location }} - 0{{ f.tel }}
</p>
</ion-label>
</ion-item>




<ion-fab slot="fixed" vertical="bottom" horizontal="end">
    <ion-fab-button color="dark" @click="router.push('/farm/create')">
      <ion-icon :icon="add"></ion-icon>
    </ion-fab-button>
  </ion-fab>
</app-layout>
</template>