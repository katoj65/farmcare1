<template>
<IonContent class="ion-padding" style="text-align:center">
<h4>Farm Care</h4>
<p>You are welcome</p>

<form>

<ion-list>
<ion-item>
<ion-input label="Email" placeholder="Enter email"></ion-input>
</ion-item>

<ion-item>
<ion-input label="Password" placeholder="Password"></ion-input>
</ion-item>

<ion-item lines="none">
<ion-button expand="block" style="width:100%;margin-top:20px;" class="ion-button" size="default" type="submit">Login</ion-button>
</ion-item>
</ion-list>
</form>
</IonContent>
</template>
<script setup lang="ts">
import { IonContent, IonInput, IonItem, IonList,IonButton  } from '@ionic/vue';
import { ref } from 'vue';







</script>