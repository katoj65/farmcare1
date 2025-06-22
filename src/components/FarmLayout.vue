<script setup lang="ts">
import AppLayout from '@/components/AppLayout.vue';
import { reactive } from 'vue';
import {store} from '@/store/Index';
import {db} from '@/Database/database';
import { onMounted,computed } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import {IonBadge, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle,IonItem, IonLabel,IonFab, IonFabButton, IonFabList,IonIcon ,IonAvatar,} from '@ionic/vue';
import {
chevronDownCircle,
chevronForwardCircle,
chevronUpCircle,
colorPalette,
document,
briefcase,
bug,
addCircleOutline,
add
} from 'ionicons/icons';
import FarmFab from '@/components/FarmFab.vue'



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

<ion-card color="light" style="box-shadow:none;border:solid thin #e5e8e8;">
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
</ion-card>





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
    <ion-fab-button>
    <span class="material-icons">assignment</span>
    </ion-fab-button>
    <ion-fab-button>
    <ion-icon :icon="briefcase"></ion-icon>
    </ion-fab-button>

    <ion-fab-button @click="router.push('/farm/add/'+farmDetails.id)">
    <ion-icon :icon="add"></ion-icon>
    </ion-fab-button>
    </ion-fab-list>


    </ion-fab>

</app-layout>
</template>