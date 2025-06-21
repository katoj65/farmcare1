
<script setup lang="ts">
import AppLayout from '@/components/AppLayout.vue';
import { IonCol, IonGrid, IonRow,IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon } from '@ionic/vue';
import { logoIonic, leaf, people,documentText,briefcase,fitness,bug } from 'ionicons/icons';





const menu=[
{title:'Farm',icon:leaf,url:'/farm'},
{title:'Employees',icon:people,url:'/'},
{title:'Reports',icon:documentText,url:'/'},
{title:'Inventory',icon:briefcase,url:'/'},
{title:'Veterinary',icon:fitness,url:'/'},
{title:'Diseases',icon:bug,url:'/'},

];
















</script>
<template>
<app-layout>

<ion-grid>
<ion-row>

<ion-col size="4" v-for="(m,key) in menu" :key="key" style="padding:0;">

<router-link :to="m.url" style="text-decoration:none;">
<ion-card color="light" style="margin:5px;height:100px;box-shadow:none;">
<ion-card-header>
<ion-card-title> </ion-card-title>
<ion-card-subtitle style="text-align:center;">
<ion-icon :icon="m.icon" size="large" color="dark"></ion-icon>
</ion-card-subtitle>
</ion-card-header>
<ion-card-content style="font-size:13px;text-align:center;font-weight:bold;"> {{ m.title }} </ion-card-content>
</ion-card>
</router-link>

</ion-col>





</ion-row>
</ion-grid>
















</app-layout>
</template>