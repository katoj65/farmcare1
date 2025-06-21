<script setup lang="ts">
import AppLayout from '@/components/AppLayout.vue';
import { reactive } from 'vue';
import {store} from '@/store/Index';
import {db} from '@/Database/database';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import {IonBadge, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle,IonItem, IonLabel,IonFab, IonFabButton, IonFabList,IonIcon } from '@ionic/vue';
import {
chevronDownCircle,
chevronForwardCircle,
chevronUpCircle,
colorPalette,
document,
globe,
} from 'ionicons/icons';




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



// onMounted(()=>{





// });



</script>
<template>
<app-layout back="/farm" title="Farm details">

<ion-card color="light" style="box-shadow:none;" v-for="(f,key) in data.farm" :key="key">
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




<ion-item detail="true" v-for="(s,key) in 20" :key="key">
<ion-label>
<h3>Cow Name</h3>
<p>Detail set to true - detail arrow </p>
</ion-label>
</ion-item>










<ion-fab slot="fixed" vertical="bottom" horizontal="end">
    <ion-fab-button>
      <ion-icon :icon="chevronUpCircle"></ion-icon>
    </ion-fab-button>
    <ion-fab-list side="top">
      <ion-fab-button>
        <ion-icon :icon="document"></ion-icon>
      </ion-fab-button>
      <ion-fab-button>
        <ion-icon :icon="colorPalette"></ion-icon>
      </ion-fab-button>
      <ion-fab-button>
        <ion-icon :icon="globe"></ion-icon>
      </ion-fab-button>
    </ion-fab-list>
  </ion-fab>
</app-layout>
</template>