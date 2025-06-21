<script setup lang="ts">
import AppLayout from '@/components/AppLayout.vue';
import { reactive } from 'vue';
import {store} from '@/store/Index';
import {db} from '@/Database/database';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';


const router=useRouter();

onMounted(()=>{
db.from('farm')
.select("*")
.eq('id', 'Equal to')
});



onMounted(()=>{
console.log(router);
});



</script>
<template>
<app-layout back="/farm" title="Farm name">


some information



</app-layout>
</template>