<script  setup>
import AppLayout from '@/components/AppLayout.vue';
import { IonHeader, IonSearchbar,IonIcon,
IonItem,
IonLabel,
IonList,
IonNote,
IonText,
IonAvatar  } from '@ionic/vue';
import { chevronForward, listCircle,pricetag } from 'ionicons/icons';
import { reactive, onMounted} from 'vue';
import { db } from '@/Database/database';




const form=reactive({
search:''
});

const row=reactive({
search:[],
status:null,
});





const submit = async ()=>{
row.status=null;
if(form.search.length>1){
const res=await db.from('animal')
.select("*,farm(name)")
.ilike('name', '%'+form.search+'%');
if(res.error==null){
row.search=res.data;
row.status=res.data.length;
}else{
console.log(res.error);
}

}
};









</script>
<template>
<app-layout title="Search" back="/">
<ion-searchbar v-model="form.search" @keydown="submit"></ion-searchbar>



<ion-list v-if="row.status>0">

<ion-item :button="true" detail="false" v-for="(i,key) in row.search" :key="key">
<ion-avatar slot="start">
<img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
</ion-avatar>
<div class="unread-indicator-wrapper" slot="start"></div>
<ion-label>
<strong>{{ i.name }} </strong><br />
<ion-note color="medium" class="ion-text-wrap">
{{ i.color }} . {{ i.farm.name }}
</ion-note>
</ion-label>
<div class="metadata-end-wrapper" slot="end">
<ion-icon color="medium" :icon="pricetag "></ion-icon>
<ion-note color="medium" style="padding-left:5px;"> {{ i.tag }} </ion-note>
</div>
</ion-item>




</ion-list>
<ion-list v-else-if="form.search!='' && row.status==0">
<ion-item>
<ion-label>
No results found
</ion-label>
</ion-item>
</ion-list>

</app-layout>
</template>
