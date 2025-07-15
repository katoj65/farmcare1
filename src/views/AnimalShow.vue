<template>
<app-layout title="Animal details" :back="row.back">
<div v-if="row.animal!=''" style="padding-bottom:100px;">





<ion-item lines="none" color="light">
<ion-avatar>
<img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
</ion-avatar>
<ion-label style="font-size:18px;font-weight:bold;text-transform:capitalize;margin-left:10px;">
{{ row.animal.name }}
</ion-label>
<ion-note color="medium" style="font-size:15px;">
</ion-note>
</ion-item>




<ion-item lines="none">
<ion-label>Gender</ion-label>
<ion-note color="medium" style="font-size:15px;">
{{ row.animal.gender }}
</ion-note>
</ion-item>
<ion-item lines="none">
<ion-label>Tag</ion-label>
<ion-note color="medium" style="font-size:15px;">
{{ row.animal.tag }}
</ion-note>
</ion-item>
<ion-item lines="none">
<ion-label>Color</ion-label>
<ion-note color="medium" style="font-size:17px;">
{{ row.animal.color }}
</ion-note>
</ion-item>
<ion-item lines="none">
<ion-label>Weight</ion-label>
<ion-note color="medium" style="font-size:15px;">
{{ row.animal.weight }} Kgs
</ion-note>
</ion-item>
<ion-item lines="none">
<ion-label>Origin</ion-label>
<ion-note color="medium" style="text-transform:capitalize;font-size:15px;">
{{ row.animal.origin }}
</ion-note>
</ion-item>
<ion-item lines="none">
<ion-label>Farm</ion-label>
<ion-note color="medium" style="text-transform:capitalize;font-size:15px;">
{{ row.animal.farm.name }}
</ion-note>
</ion-item>



<ion-list-header color="light">
<ion-label style="font-weight:bold;">
Animal Health Report
</ion-label>

<ion-button v-if="row.report.length>0" color="dark" @click="router.push('/share/'+row.animal.id)">
<span class="material-icons" >share</span>
</ion-button>

</ion-list-header>


<ion-item v-for="(r,key) in row.report" :key="key" color="light" style="margin-top:3px;" lines="none">
<ion-label>
<strong style="text-transform:capitalize"> {{ r.type }}</strong>
<ion-note color="medium" class="ion-text-wrap">
<p v-for="(x,key) in doctor(r.type,r.description)" :key="key" style="padding-top:10px;">
{{ x.action }}
</p>
</ion-note>
</ion-label>
<div class="metadata-end-wrapper" slot="end">
<ion-note color="medium" style="font-size:15px;">
{{ r.description }} {{ measurements(r.type) }}
</ion-note>
</div>
</ion-item>


<!--
<ion-list-header color="light" style="margin-top:5px;" v-if="row.diagnosis.length>0">
<ion-label style="font-weight:bold;">
Diagnosis
</ion-label>
</ion-list-header>
<ion-item v-for="(d,key) in row.diagnosis" :key="key" lines="full">
<ion-label>
<h4>
{{ d.disease.name }}
</h4>
<div style="padding-top:15px;">
<h4 style="font-weight:bold;">
Symptoms
</h4>
<p>
{{ d.disease.symptom.map(s => s.name).join(', ') }}
</p>
</div>
<div style="padding-top:15px;">
<h4 style="font-weight:bold;">
Treatment
</h4>
<p>
{{ d.disease.treatment.map(t => t.name).join(', ') }}
</p>
</div>
</ion-label>
</ion-item> -->


<div  v-if="row.animalHealth.length>0">
<ion-list-header color="light" style="margin-top:5px;">
<ion-label style="font-weight:bold;">
Based on additional information provided
</ion-label>
</ion-list-header>



<div v-for="(a,key) in row.animalHealth" :key="key">
<ion-item lines="none" :color="a.state=='sick' ? 'danger' : 'success'">
<ion-label>
{{ a.comment }}
</ion-label>
</ion-item>
</div>



<div v-if="row.animalHealthState =='sick' && row.sickness.length==0" >
<ion-item lines="none">
<ion-button expand="block" style="width:100%;margin-top:20px;" class="ion-button" size="default" type="submit" color="primary" @click="modal1(true)">
Provide your observation
</ion-button>
</ion-item>
</div>
<div v-else-if="row.animalHealthState !='sick'" lines="none" color="success">
<ion-item >
<ion-label style="font-size:20px;">
The animal is generally healthy
</ion-label>
</ion-item>
</div>




<div v-if="row.sickness.length>0" style="padding:10px;">
<div v-for="(s,key) in row.sickness" :key="key">

<ion-list-header color="light" style="margin-bottom:2px;">
<ion-label style="font-weight:bold;">
Signs observed
</ion-label>
</ion-list-header>




<ion-item lines="none" color="light" style="margin-bottom:2px;">
<ion-label>
Weight loss
</ion-label>
<ion-note slot="end">
{{ s.weight_loss=='true'?'Yes':'No' }}
</ion-note>
</ion-item>
<ion-item lines="none" color="light" style="margin-bottom:2px;">
<ion-label>
General weakness
</ion-label>
<ion-note slot="end">
{{ s.general_weakness=='true'?'Yes':'No' }}
</ion-note>
</ion-item>
<ion-item lines="none" color="light" style="margin-bottom:2px;">
<ion-label>
Difficult feeding
</ion-label>
<ion-note slot="end">
{{ s.difficult_feeding=='true'?'Yes':'No' }}
</ion-note>
</ion-item>
<ion-item lines="none" color="light" style="margin-bottom:2px;">
<ion-label>
Mouth discharge
</ion-label>
<ion-note slot="end">
{{ s.mouth_infection=='true'?'Yes':'No' }}
</ion-note>
</ion-item>
<ion-item lines="none" color="light" style="margin-bottom:2px;">
<ion-label>
Nose discharge
</ion-label>
<ion-note slot="end">
{{ s.nose_infection=='true'?'Yes':'No' }}
</ion-note>
</ion-item>
<ion-item lines="none" color="light" style="margin-bottom:2px;">
<ion-label>
Feet infection
</ion-label>
<ion-note slot="end">
{{ s.feet_infection=='true'?'Yes':'No' }}
</ion-note>
</ion-item>


<ion-item lines="none">
<ion-button expand="block" style="width:100%;margin-top:20px;" class="ion-button" size="default" type="submit" color="light" @click="modal2(true)">Diagnose</ion-button>
</ion-item>





</div>
</div>









</div>



</div>







<ion-fab slot="fixed" vertical="bottom" horizontal="end">
<ion-fab-button color="dark" @click="modal(true)">
<ion-icon :icon="add" ></ion-icon>
</ion-fab-button>
</ion-fab>


<ion-modal :is-open="isOpen" v-if="route.name=='animal details'|| route.name=='animal details1'">
<ion-header>
<ion-toolbar>
<ion-title>Add animal report</ion-title>
<ion-buttons slot="end">
<ion-button @click="modal(false)">Close</ion-button>
</ion-buttons>
</ion-toolbar>
</ion-header>
<ion-content>


<ion-list>
<ion-item detail="false" color="light" lines="none">
<div class="unread-indicator-wrapper" slot="start"></div>
<ion-avatar slot="start">
<img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
</ion-avatar>
<ion-label>
<strong style="font-size:25px;text-transform:capitalize">{{ row.animal.name }}</strong>
</ion-label>
<div class="metadata-end-wrapper" slot="end">
<ion-icon color="medium" :icon="pricetagSharp"></ion-icon>
<ion-note color="medium">{{  row.animal.tag }}</ion-note>
</div>
</ion-item>
</ion-list>






<form style="padding:15px;" @submit.prevent="submit">
<ion-list style="border:solid thin #e5e8e8;border-radius:10px;padding-bottom:15px; ">
<div v-if="message.error!=null" style="padding:10px;color:red;">
{{ message.error }}
</div>
<ion-item>
<ion-select label="Report" placeholder="Select option" v-model="form.report">
<ion-select-option value="animal temperature">Animal Temperature</ion-select-option>
<ion-select-option value="heartbeat">Heartbeat</ion-select-option>
<ion-select-option value="environmental temperature">Environmental temperature</ion-select-option>
</ion-select>
</ion-item>

<ion-item>
<ion-input label="Measurements" placeholder="Enter readings" type="number" v-model="form.description"></ion-input>
</ion-item>



<ion-item lines="none">
<ion-button expand="block" style="width:100%;margin-top:20px;" class="ion-button" size="default" type="submit">Save</ion-button>
</ion-item>
</ion-list>

</form>







</ion-content>
</ion-modal>

















<!--Additional Informational------->
<ion-modal :is-open="isOpen1" v-if="(route.name=='animal details' || route.name=='animal details1') && row.animalHealthState=='sick'">
<ion-header>
<ion-toolbar>
<ion-title>Additional information</ion-title>
<ion-buttons slot="end">
<ion-button @click="modal1(false)">Close</ion-button>
</ion-buttons>
</ion-toolbar>
</ion-header>
<ion-content>


<ion-list>
<ion-item detail="false" color="light" lines="none">
<div class="unread-indicator-wrapper" slot="start"></div>
<ion-avatar slot="start">
<img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
</ion-avatar>
<ion-label>
<strong style="font-size:25px;text-transform:capitalize">{{ row.animal.name }}</strong>
</ion-label>
<div class="metadata-end-wrapper" slot="end">
<ion-icon color="medium" :icon="pricetagSharp"></ion-icon>
<ion-note color="medium">{{  row.animal.tag }}</ion-note>
</div>
</ion-item>
</ion-list>






<form  @submit.prevent="submitSckness">

<ion-list>
<ion-item lines="full">
<ion-label>
Please provide additional information about the animal health
</ion-label>
</ion-item>

<ion-item lines="full">
<ion-toggle v-model="sickness.weakness">General weakness</ion-toggle>
</ion-item>

<ion-item lines="full">
<ion-toggle v-model="sickness.feeding">Defficult feeding</ion-toggle>
</ion-item>

<ion-item lines="full">
<ion-toggle v-model="sickness.mouth">Mouth discharge</ion-toggle>
</ion-item>

<ion-item lines="full">
<ion-toggle v-model="sickness.nose">Nose discharge</ion-toggle>
</ion-item>

<ion-item lines="full">
<ion-toggle v-model="sickness.feet">Feet infection</ion-toggle>
</ion-item>

<ion-item lines="full">
<ion-toggle v-model="sickness.weight">Weight loss</ion-toggle>
</ion-item>


<ion-item lines="none">
<ion-button expand="block" style="width:100%;margin-top:20px;" class="ion-button" size="default" type="submit" color="primary" >Save</ion-button>
</ion-item>

</ion-list>
</form>







</ion-content>
</ion-modal>




























<!-- Diagnosis------->
<ion-modal :is-open="isOpen2" v-if="(route.name=='animal details' || route.name=='animal details1') && row.animalHealthState=='sick'">
    <ion-header>
    <ion-toolbar>
    <ion-title>Diagnosis</ion-title>
    <ion-buttons slot="end">
    <ion-button @click="modal2(false)">Close</ion-button>
    </ion-buttons>
    </ion-toolbar>
    </ion-header>
    <ion-content>


    <ion-list>
    <ion-item detail="false" color="light" lines="none">
    <div class="unread-indicator-wrapper" slot="start"></div>
    <ion-avatar slot="start">
    <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
    </ion-avatar>
    <ion-label>
    <strong style="font-size:25px;text-transform:capitalize">{{ row.animal.name }}</strong>
    </ion-label>
    <div class="metadata-end-wrapper" slot="end">
    <ion-icon color="medium" :icon="pricetagSharp"></ion-icon>
    <ion-note color="medium">{{  row.animal.tag }}</ion-note>
    </div>
    </ion-item>
    </ion-list>






<div>
<div v-if="row.disease.length>0">

<div v-for="(r,key) in row.disease" :key="key">

<ion-item :button="true" detail="false" v-for="(s,key) in r" :key="key" lines="full">
<div class="unread-indicator-wrapper" slot="start">
<div class="unread-indicator"></div>
</div>
<ion-label>
<strong>{{ s.disease.name }}</strong>
<ion-text></ion-text><br />
<ion-note color="medium" class="ion-text-wrap">
<div style="margin-top:10px;">
<h6 style="font-weight:bold;">
Symptoms
</h6>

<div v-for="(sy,key) in s.disease.symptom" :key="key">
  {{ sy.name }}
</div>
</div>

<div style="margin-top:10px;">
<h6 style="font-weight:bold;">
Treatment
</h6>

<div v-for="(t,key) in s.disease.treatment" :key="key">
{{ t.name }}
</div>
</div>



<div>
<h6>Reffer to your veterinary doctor for treatment</h6>
</div>

</ion-note>




</ion-label>
</ion-item>
</div>
</div>










</div>
















    </ion-content>
    </ion-modal>














</app-layout>
</template>
<script setup>
import AppLayout from '@/components/AppLayout.vue';
import { useRoute,useRouter } from 'vue-router';
import { reactive, onMounted, computed,ref } from 'vue';
import {db} from '@/Database/database';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,IonItem, IonLabel, IonList, IonNote,IonListHeader, IonIcon, IonButton, IonFab, IonFabButton,
IonButtons,IonModal, IonHeader, IonToolbar, IonContent, IonTitle,IonInput, IonSelect,IonSelectOption, IonBadge, IonAvatar,IonToggle, IonText  } from '@ionic/vue';
import { ellipsisHorizontalCircleSharp, add, chevronForward,pricetagSharp } from 'ionicons/icons';


const row=reactive({
animal:'',
back:'',
report:[],
diagnosis:[],
animalHealth:[],
animalHealthState:'',
sickness:[],
disease:'',
});


const router=useRouter();
const route=useRoute();
// onMounted(()=>{
// let id=route.path.split('/');



// db.from('animal')
// .select('*,farm (name, location,tel,type,size,id)')
// .eq('id',id[2])
// .then((response)=>{
// if(response.error==null){
// // row.animal=response.data;
// response.data.forEach(element => {
// row.animal=element
// row.back='/farm/show/'+element.farm.id;
// });







// //get animal reports
// db.from('animal_report')
// .select("type,description")
// .eq('animal_id',row.animal.id)
// .limit(3)
// .then((response)=>{
// if(response.error==null){
// row.report=response.data;
// // get potential disease

// response.data.forEach(element => {
// // console.log(element);
// db.from('parameters')
// .select('*,disease(*,symptom(*),treatment(*))')
// .eq('attribute',element.type)
// .gte('minimum',element.description)
// .then((res)=>{
// if(res.error==null){
// res.data.forEach(element => {
// row.diagnosis.push(element);
// });

// console.log(row.diagnosis);


// }else{
// console.log(res.error);
// }
// }).catch((err)=>console.log(err));
// });


// }else{
// console.log(response.error);
// }
// })
// .catch((error)=>{console.log(error)});
// }else{
// console.log(response.error);
// }
// })
// .catch((error)=>{console.log(error)});

// });








//get animal details
onMounted(async ()=>{
let id=route.path.split('/');
const {data,error}=await db.from('animal')
.select('*,farm (name, location,tel,type,size,id)')
.eq('id',id[2]);
if(error==null){
data.forEach(element => {
row.animal=element
row.back='/farm/show/'+element.farm.id;
});
}else{
console.log(error);
}
});


//get animal report
onMounted(async()=>{
let id=route.path.split('/');
const {data,error}=await db.from('animal_report')
.select("type,description")
.eq('animal_id',id[2]);
if(error==null){
row.report=data;
if(data.length>0){
let animalHealth=[];
data.forEach(element => {
//animal temperature
if(element.type=='animal temperature'){
// console.log(element);
if(element.description>35 && element.description<40){
animalHealth.push({parameter:'temperature',comment:'The animal temperature is normal.',state:'healthy'});
}else if(element.description>40){
animalHealth.push({parameter:'temperature',comment:'The animal temperature is high.',state:'sick'});
}
else{
animalHealth.push({parameter:'temperature',comment:'The animal temperature is high.',state:'sick'});
}

}
//heartbeat
else if(element.type=='heartbeat'){
if(element.description>=48 && element.description<=84){
animalHealth.push({parameter:'heartbeat',comment:'The animal heartbeat is normal.',state:'healthy'});
}else if(element.description>84){
animalHealth.push({parameter:'heartbeat',comment:'The animal heartbeat is abnormal.',state:'sick'});
}else{
animalHealth.push({parameter:'heartbeat',comment:'The animal heartbeat is abnormal.',state:'sick'});
}
}
});
row.animalHealth=animalHealth;
//create animal state
row.animalHealth.forEach(element => {
if(element.state=='sick'){
row.animalHealthState='sick';
}
});

}

}else{
console.log(error);
}
});















const dateFormat=computed((date)=>{
let d=date.split('-');
return d[0]+'-'+d[1]+'-'+d[2];
});

const isOpen = ref(false);
const modal=(state)=>{
isOpen.value=state;
}

const isOpen1 = ref(false);
const modal1=(state)=>{
isOpen1.value=state;
}



const isOpen2 = ref(false);
const modal2=(state)=>{
isOpen2.value=state;
}





const form=reactive({
report:'',
description:''
});
const message=reactive({
error:null,
});

const measurements=(item)=>{
let measure='';
if(item==='animal temperature'){
measure='Degrees';
}else if(item==='heartbeat'){
measure='BPM';
}else if(item==='environmental temperature'){
measure='Degrees';
}
return measure;
};










const submit=()=>{
let id=route.path.split('/');
message.error=null;
if(form.report=='' || form.description==''){
message.error='Fill in all fields';
}else{
db.from('animal_report')
.insert([{
animal_id:id[2],
type:form.report,
description:form.description,
status:'active'
//status:['active','treatment','healed']
}
])
.select()
.then((response)=>{
if(response.error==null){
modal(false);
form.description='';
form.report='';
response.data.forEach(element => {
row.report.push(element);
});

}else{
console.log(response.error);
}
})
.catch((error)=>{console.log(error)})
}
}

//




const doctor=(option,count)=>{
//animal temperature.
//heartbeat.
//environmental temperature.
let response=[];
let animalHealth=[];
if(option=='animal temperature'){

if(count>35 && count<40){
response.push({action:'Animal temperature normal.'});

animalHealth.push({parameter:'temperature',comment:'The animal temperature is normal.',state:'healthy'});

}else if(count>40){

response.push({action:'Antibiotics.'});
response.push({action:'Isolate the animal.'});

animalHealth.push({parameter:'temperature',comment:'The animal temperature is high.',state:'sick'});

}else{
response.push({action:'Move to animal to shade.'});

animalHealth.push({parameter:'temperature',comment:'The animal temperature is high.',state:'sick'});

}

}else if(option=='heartbeat'){

if(count>=48 && count<=84){
response.push({action:'Heartbeat is normal.'});

animalHealth.push({parameter:'heartbeat',comment:'The animal heartbeat is normal.',state:'healthy'});

}else if(count>84){
response.push({action:'Refer to the veterinary doctor for heartbeat.'});

animalHealth.push({parameter:'heartbeat',comment:'The animal heartbeat is abnormal.',state:'sick'});

}else{
response.push({action:'Refer to the veterinary doctor.'});

animalHealth.push({parameter:'heartbeat',comment:'The animal heartbeat is abnormal.',state:'sick'});

}


}else if(option=='environmental temperature'){

if(count>=20 && count<=35){
response.push({action:'Environment temperature is normal.'});
}else if(count>35){
response.push({action:'Provide shade, clean water.'});
response.push({action:'Adjust dietary needs.'});
}
}

// console.log(animalHealth);
return response;
}



// Additonal information
const sickness=reactive({
weakness:false,
mouth:false,
nose:false,
feet:false,
feeding:false,
weight:false
});

const submitSckness=async ()=>{
let id=route.path.split('/');
const {data,error}=await db.from('animal_health_information')
.insert([
{
animal_id:id[2],
general_weakness: sickness.weakness,
mouth_infection: sickness.mouth,
nose_infection: sickness.nose,
feet_infection: sickness.feet,
difficult_feeding: sickness.feeding,
weight_loss: sickness.weight,
},
])
.select();
if(error==null){
modal1(false)
router.push('/animal/'+id[2]+'/sickness');

}else{
console.log(error);
}

}



//get additional informational
onMounted(async()=>{
let id=route.path.split('/');
const {data,error}=await db.from('animal_health_information')
.select('*')
.eq('animal_id',id[2]);
if(error==null){
row.sickness=data;
}else{
console.log(error);
}

});



//get parameters
const parameters=async (item,amount)=>{
const {data,error}=await db.from('parameters')
.select('*,disease(*,symptom(*),treatment(*))')
.eq('attribute',item)
.gte('minimum',amount);
return data;
}





//get potential disease
onMounted(async ()=>{
let id=route.path.split('/');
const {data,error} = await db.from('animal_report')
.select('type,description')
.eq('animal_id',id[2]);


const items=[];



if(error==null){
data.forEach(element => {
if(element.type=='animal temperature'){

db.from('parameters')
.select('*,disease(*,symptom(*),treatment(*))')
.eq('attribute','animal temperature')
.gte('minimum',element.description)
.then((res)=>{
if(res.error==null){
items.push(res.data);
}
})
.catch((error)=>{console.log(error)});

}else if(element.type=='heartbeat'){

db.from('parameters')
.select('*,disease(*,symptom(*),treatment(*))')
.eq('attribute','heartbeat')
.gte('minimum',element.description)
.then((res)=>{
if(res.error==null){
items.push(res.data);
}
})
.catch((error)=>{console.log(error)});

}

});
row.disease=items;
console.log(items);
}else{
console.log(error);
}
});

















</script>