<template>
<ion-page>





<ion-header>
<ion-toolbar>

<ion-buttons slot="start" v-if="back!=null">
<ion-back-button @click="router.push(back)"></ion-back-button>
</ion-buttons>



<ion-title>{{ title!=null?title:'FarmCare' }} </ion-title>
<ion-buttons slot="end">
<ion-button @click="router.push('/search')"> <ion-icon slot="end" :icon="search" color="dark"></ion-icon> </ion-button>
<ion-button @click="router.push('/profile')"><ion-icon slot="end" :icon="personCircle" color="dark"></ion-icon> </ion-button>
</ion-buttons>
</ion-toolbar>
</ion-header>

<ion-content :fullscreen="true">
<ion-header collapse="condense">
<ion-toolbar>
<ion-title>{{ title!=null?title:'FarmCare' }} </ion-title>
</ion-toolbar>
</ion-header>
<slot></slot>
</ion-content>
</ion-page>
</template>

<script setup>
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { personCircle, search } from 'ionicons/icons';
import { useRouter } from 'vue-router';


const props=defineProps({
title:String,
back:String

});

const router=useRouter();







</script>
