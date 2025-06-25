<template>
<app-layout title="Share Report" :back="row.back">
<div v-if="row.animal!=''" style="padding-bottom:100px;">
<ion-list>

<ion-item lines="none" color="light">
<ion-avatar slot="start">
<img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
</ion-avatar>
<ion-label>
<strong style="font-size:20px;font-weight:bold;text-transform:capitalize;">{{ row.animal.name }}</strong><br/>
<ion-note color="medium" class="ion-text-wrap">
{{ row.animal.gender}} . {{ row.animal.color }} . {{ row.animal.weight }} Kgs
</ion-note>
</ion-label>
<div class="metadata-end-wrapper" slot="end">
<ion-note color="medium" style="font-size:15px;">
<ion-icon :icon="pricetagSharp"></ion-icon> {{ row.animal.tag }}
</ion-note>
</div>
</ion-item>






<ion-item :button="true" detail="false" v-for="(p,key) in row.workers" :key="key" lines="none" style="border:solid thin #e5e8e8 ;margin-top:5px;margin:5px;" @click="submit(p)">
<ion-avatar slot="start">
<img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
</ion-avatar>
<ion-label>
<strong>
{{ p.firstname }} {{ p.lastname }}<br/>
</strong>
<ion-note color="medium" class="ion-text-wrap">
{{ p.role }} . 0{{ p.tel }}
</ion-note>
</ion-label>
<div class="metadata-end-wrapper" slot="end">
<ion-icon color="medium" :icon="shareSocialOutline"></ion-icon>
<ion-note color="medium"> Share</ion-note>
</div>
</ion-item>








</ion-list>
</div>












</app-layout>
</template>
<script setup>
import AppLayout from '@/components/AppLayout.vue';
import { useRoute,useRouter } from 'vue-router';
import { reactive, onMounted, computed,ref } from 'vue';
import {db} from '@/Database/database';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,IonItem, IonLabel, IonList, IonNote,IonListHeader, IonIcon, IonButton, IonFab, IonFabButton,
IonButtons,IonModal, IonHeader, IonToolbar, IonContent, IonTitle,IonInput, IonSelect,IonSelectOption, IonBadge, IonAvatar   } from '@ionic/vue';
import { ellipsisHorizontalCircleSharp, add, chevronForward,pricetagSharp,shareSocialOutline } from 'ionicons/icons';


const row=reactive({
animal:'',
back:'',
workers:[]
});


const router=useRouter();
const route=useRoute();

onMounted(()=>{
let id=route.path.split('/');
db.from('animal')
.select('*,farm(name, location,tel,type,size,id)')
.eq('id',id[2])
.then((response)=>{
if(response.error==null){
// row.animal=response.data;
response.data.forEach(element => {
row.animal=element
row.back='/farm/show/'+element.farm.id;
db.from('worker')
.select("*")
.eq('farm_id',element.farm.id)
.then((res)=>{
if(res.error==null){
row.workers=res.data;
}else{
console.log(res.error);
}
})
.catch((error)=>{console.log(error)});

});

}else{
console.log(response.error);
}

})
.catch((error)=>{console.log(error)});
});








const form=reactive({
report:'',
description:''
});

const message=reactive({
error:null,
});




const submit= async (user)=>{
const animalID=row.animal.id;
const report=await db.from('animal_report')
.select("*")
.eq('animal_id',animalID);
const obj={ ...report.data};
if(report.error==null){

const insert= await db.from('message')
.insert([{
animal_id: animalID,
worker_id: user.id,
message:obj

},
])
.select();
router.push('/animal/'+animalID);

}else{
console.log(report.error);
}



}









</script>