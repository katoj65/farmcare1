<template>
<ion-page>
<ion-header>
<ion-toolbar>
<ion-title>FarmCare</ion-title>
</ion-toolbar>
</ion-header>
<ion-content :fullscreen="true">
<ion-header collapse="condense">
<ion-toolbar>
<ion-title size="large">FarmCare</ion-title>
</ion-toolbar>
</ion-header>
{{ store }}
<slot></slot>
</ion-content>
</ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import {store} from '@/store/Index';

</script>
