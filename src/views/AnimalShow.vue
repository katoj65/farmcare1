<template>
<app-layout title="Animal details">
<div v-for="(a,key) in row.animal" :key="key">
{{ a }}
</div>
</app-layout>
</template>
<script setup lang="ts">
import AppLayout from '@/components/AppLayout.vue';
import { useRoute } from 'vue-router';
import { reactive, onMounted } from 'vue';
import {db} from '@/Database/database';

const row=reactive({
animal:[]
});


const route=useRoute();

onMounted(()=>{
let id=route.path.split('/');
db.from('animal')
.select("*")
.eq('id',id[2])
.then((response)=>{
console.log(response);
if(response.error==null){
row.animal=response.data;
}else{
console.log(response.error);
}
})
.catch((error)=>{console.log(error)});

})













</script>