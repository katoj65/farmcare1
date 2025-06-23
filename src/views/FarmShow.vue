<template>
<farm-layout>

<ion-list>
<ion-list-header color="light">
<ion-label style="font-weight:bold;">Farm animals </ion-label>
</ion-list-header>
<ion-item detail="true" v-for="(a,key) in row.animal" :key="key" @click="router.push('/animal/'+a.id)">
<ion-avatar slot="start">
<img src="https://ionicframework.com/docs/img/demos/avatar.svg" alt="avatar" />
</ion-avatar>
<ion-label>
<h3 style="text-transform:capitalize;font-weight:bold;font-size:17px;">{{ a.name }} </h3>
<p style="text-transform:capitalize">

{{ a.gender }} . {{ a.color }} . {{ a.weight }}Kgs . Tag: {{ a.tag }}
</p>
</ion-label>
</ion-item>
</ion-list>

</farm-layout>
</template>
<script setup>
import FarmLayout from '@/components/FarmLayout.vue';
import {IonItem, IonLabel,IonFab, IonFabButton, IonFabList,IonIcon ,IonAvatar,IonList, IonListHeader} from '@ionic/vue';
import { ellipsisHorizontalCircleSharp,add } from 'ionicons/icons';
import { reactive, onMounted } from 'vue';
import {db} from '@/Database/database';
import { useRoute, useRouter } from 'vue-router';

const row=reactive({
animal:[],
});




const router=useRouter();
const route=useRoute();
onMounted(()=>{
const id=route.path.split('/');
db.from('animal')
.select('*')
.eq('farm_id',id[3])
.then((response)=>{
if(response.error==null){
row.animal=response.data;
}else{
console.log(response.error);
}
})
.catch((error)=>{console.log(error)});



});







</script>