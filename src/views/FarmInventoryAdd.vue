<template>
<farm-layout>
<div style="padding-bottom:100px;">
<form @submit.prevent="submit">
<ion-list style="border:solid thin #e5e8e8;padding:10px;" :inset="true">
<ion-item lines="none">
<ion-label>
<h4 style="font-weight:bolder;font-size:18px;">
Add farm inventory
</h4>
<div v-if="message.error!=null" style="color:red;">
{{ message.error }}
</div>


</ion-label>
</ion-item>

<ion-item>
<ion-input label="Item" placeholder="Enter item" v-model="form.item"></ion-input>
</ion-item>

<ion-item>
<ion-input label="Quantity" placeholder="Enter quantity" v-model="form.quantity" type="number"></ion-input>
</ion-item>


<ion-item lines="none" style="padding-bottom:10px;">
<ion-button expand="block" style="width:100%;margin-top:20px;" class="ion-button" size="default" type="submit">Save</ion-button>
</ion-item>

</ion-list>
</form>
</div>
</farm-layout>
</template>
<script setup >
import FarmLayout from '@/components/FarmLayout.vue';
import { IonIcon, IonItem, IonLabel, IonList, IonInput,IonButton, IonSelect, IonSelectOption} from '@ionic/vue';
import { reactive } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import {db} from '@/Database/database';







const form=reactive({
item:'',
quantity:'',
id:''
});

const message=reactive({
error:null,
success:null,
});



const row=reactive({
animal:''
});


const route=useRoute();
const router=useRouter();

const submit= async ()=>{
let id=route.path.split('/');
form.id=id[3];
message.error=='';
if(form.item=='' || form.quantity==''){
message.error='Fill in all fields';
}else{

const res= await db.
from('inventory')
.insert([{ farm_id:form.id, item:form.item, quantity:form.quantity}])
.select()
form.id='';
form.item='';
form.quantity='';

console.log(res);

}
}







</script>