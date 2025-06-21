<script setup lang="ts">
import AppLayout from '@/components/AppLayout.vue';
import {db} from '@/Database/database';
import { IonItem, IonLabel,  IonFab, IonFabButton, IonIcon } from '@ionic/vue';
import { caretForwardOutline, add } from 'ionicons/icons';
import { useRouter } from 'vue-router';







</script>
<template>
<app-layout title="Farm">

<ion-item detail="true" v-for="(e,key) in 30" :key="key">
<ion-label>
<h3>Name of farm</h3>
<p>
Kampala - Uganda
</p>
</ion-label>
</ion-item>









<ion-fab slot="fixed" vertical="bottom" horizontal="end">
    <ion-fab-button color="dark">
      <ion-icon :icon="add"></ion-icon>
    </ion-fab-button>
  </ion-fab>
</app-layout>
</template>