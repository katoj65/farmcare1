<template>
<app-layout title="Settings">
<ion-list>
<ion-item button lines="full" @click="router.push('/add/diagnosis')">
<ion-label>
Set Diagnosis
</ion-label>
</ion-item>
<ion-item button lines="full" @click="router.push('/diagnosis')">
<ion-label>
View Diagnosis
</ion-label>
</ion-item>
</ion-list>
</app-layout>
</template>

<script setup >
import AppLayout from '@/components/AppLayout.vue';
import { db } from '@/Database/database';
import { store } from '@/store/Index';
import { IonItem, IonLabel,IonList } from '@ionic/vue';
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';










const router=useRouter();




</script>