<script setup >
import AppLayout from '@/components/AppLayout.vue';
import { db } from '@/Database/database';
import { IonBadge, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonFab, IonFabButton, IonFabList, IonIcon,IonItem,
    IonLabel,
    IonList,
    IonNote,
    IonText, } from '@ionic/vue';
import {
add,
briefcase,
bug,
chevronUpCircle,
people,chevronForward,
call
} from 'ionicons/icons';
import { computed, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';



const data=reactive({
farm:[]
});
const route=useRoute();
onMounted(()=>{
let id=route.path.split('/');
console.log(id[3]);
db.from('farm')
.select("*")
.eq('id',id[3])
.then((response)=>{
if(response.error==null){
data.farm=response.data;
}else{
console.log(response.error);
}

})
.catch((error)=>{console.log(error);})

});

const router=useRouter();



const farmDetails=computed(()=>{
const farm=data.farm;
let items='';
farm.forEach(element => {
items=element;
});
return items;
});



// onMounted(()=>{





// });



</script>
<template>
<app-layout back="/farm" title="Farm details">

<div  v-for="(f,key) in data.farm" :key="key">


<!-- <ion-card color="light" style="box-shadow:none;border:solid thin #e5e8e8;">
<ion-card-header style="margin-bottom:0;padding-bottom:0;">
<ion-card-subtitle style="font-size:15px;">{{ f.name }}</ion-card-subtitle>
</ion-card-header>
<ion-card-content>
<p>Located at {{ f.location }}</p>
<p>
Size: {{ f.size}} | {{ f.type }}
</p>
<p style="margin-top:5px;">
<ion-badge slot="start" color="dark"> 0{{ f.tel }}</ion-badge>
</p>
</ion-card-content>
</ion-card> -->


<ion-item  detail="false" lines="none" color="light">
<div class="unread-indicator-wrapper" slot="start"></div>
<ion-label>
<strong style="font-size:25px;">{{ f.name }}</strong><br /><br />
<ion-text>Located at {{ f.location }}</ion-text><br /><br />
<ion-note color="medium" class="ion-text-wrap">Size: {{ f.size}} | {{ f.type }}</ion-note>
</ion-label>
<div class="metadata-end-wrapper" slot="end">
<ion-icon color="medium" :icon="call"></ion-icon>
<ion-note color="medium" style="padding-left:5px;">0{{ f.tel }}</ion-note>
</div>
</ion-item>









<slot/>




</div>
<ion-fab slot="fixed" vertical="bottom" horizontal="end">
<ion-fab-button color="dark">
<ion-icon :icon="chevronUpCircle"></ion-icon>
</ion-fab-button>
<ion-fab-list side="top">

<ion-fab-button>
<ion-icon :icon="bug"></ion-icon>
</ion-fab-button>
<ion-fab-button @click="router.push('/farm/reports/'+farmDetails.id)">
<span class="material-icons">assignment</span>
</ion-fab-button>
<ion-fab-button @click="router.push('/farm/inventory/'+farmDetails.id)">
<ion-icon :icon="briefcase"></ion-icon>
</ion-fab-button>

<ion-fab-button @click="router.push('/farm/workers/'+farmDetails.id)">
<ion-icon :icon="people"></ion-icon>
</ion-fab-button>

<ion-fab-button @click="router.push('/farm/add/'+farmDetails.id)">
<ion-icon :icon="add"></ion-icon>
</ion-fab-button>
</ion-fab-list>


</ion-fab>

</app-layout>
</template>