<template>
<farm-layout>

<div>
<form>
<ion-list style="border:solid thin #e5e8e8;padding:10px;" :inset="true">
<ion-item lines="none">
<ion-label>
<h4 style="font-weight:bolder;font-size:18px;">
Add farm animal
</h4>
</ion-label>
</ion-item>

<ion-item>
<ion-input label="Name" placeholder="Enter animal name"></ion-input>
</ion-item>

<ion-item>
<ion-input label="Tag" placeholder="Enter tag ID"></ion-input>
</ion-item>

<ion-item>
<ion-select label="Breed" placeholder="Select breed">
<ion-select-option value="local">Local breed</ion-select-option>
<ion-select-option value="exotic">Exotic breed</ion-select-option>
<ion-select-option value="cross">Cross breed</ion-select-option>
</ion-select>
</ion-item>


<ion-item>
<ion-select label="Gender" placeholder="Select gender">
<ion-select-option value="male">Male</ion-select-option>
<ion-select-option value="female">Female</ion-select-option>
</ion-select>
</ion-item>




<ion-item>
<ion-input label="Weight (Kg)" placeholder="Enter weight in Kg" type="number"></ion-input>
</ion-item>










<ion-item lines="none" style="padding-bottom:10px;">
<ion-button expand="block" style="width:100%;margin-top:20px;" class="ion-button" size="default" type="submit">Save</ion-button>
</ion-item>





</ion-list>
</form>
</div>
</farm-layout>
</template>
<script setup lang="ts">
import FarmLayout from '@/components/FarmLayout.vue';
import { IonIcon, IonItem, IonLabel, IonList, IonInput,IonButton, IonSelect, IonSelectOption} from '@ionic/vue';
import { addCircleOutline } from 'ionicons/icons';








</script>