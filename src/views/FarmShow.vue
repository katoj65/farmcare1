<template>
<farm-layout>

<ion-item detail="true" v-for="(s,key) in 20" :key="key">
<ion-avatar slot="start">
<img src="https://ionicframework.com/docs/img/demos/avatar.svg" alt="avatar" />
</ion-avatar>
<ion-label>
<h3>Cow Name</h3>
<p>Detail set to true - detail arrow </p>
</ion-label>
</ion-item>

</farm-layout>
</template>
<script setup lang="ts">
import FarmLayout from '@/components/FarmLayout.vue';
import {IonItem, IonLabel,IonFab, IonFabButton, IonFabList,IonIcon ,IonAvatar,IonActionSheet} from '@ionic/vue';
</script>