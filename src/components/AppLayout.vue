<template>
<ion-page>
<ion-header>
<ion-toolbar>
<ion-title>{{ title!=null?title:'FarmCare' }} </ion-title>
</ion-toolbar>
</ion-header>
<ion-content :fullscreen="true">
<ion-header collapse="condense">
<ion-toolbar>
<ion-title size="large">{{ title!=null?title:'FarmCare' }} </ion-title>
</ion-toolbar>
</ion-header>
<slot></slot>
</ion-content>
</ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import {store} from '@/store/Index';
const props=defineProps({
title:String,

});

</script>
