<script  setup>
import AppLayout from '@/components/AppLayout.vue';
import { IonHeader, IonSearchbar, } from '@ionic/vue';
import { reactive} from 'vue';




const form=reactive({
search:''
});





</script>
<template>
<app-layout title="Search" back="/">
<ion-header>
<ion-toolbar>
<ion-searchbar v-model="form.search"></ion-searchbar>
</ion-toolbar>
</ion-header>





</app-layout>
</template>
