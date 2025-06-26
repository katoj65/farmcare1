<template>
<ion-app>
<login v-if="store.state.user==null"/>
<ion-router-outlet v-else/>
</ion-app>
</template>

<script setup>
import { db } from '@/Database/database';
import { store } from '@/store/Index';
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { onBeforeMount, onMounted } from 'vue';
import Login from './components/Login.vue';








onBeforeMount(()=>{
db.auth.getSession().then((response)=>{
if(response.data.session!=null){
store.state.user=response.data.session.user.email;
// console.log(store.state.user);
}else{
store.state.user=null;
}
}).catch((error)=>{console.log(error)});

});






// let deferredPrompt = null;
// onMounted(()=>{
// window.addEventListener('beforeinstallprompt', (e) => {
// e.preventDefault();
// deferredPrompt = e;
// console.log('PWA install prompt is ready')
// });


// triggerInstall();
// });

// function triggerInstall() {
//   if (deferredPrompt) {
//     deferredPrompt.prompt()
//     deferredPrompt.userChoice.then((result) => {
//       if (result.outcome === 'accepted') {
//         console.log('App installed!')
//       } else {
//         console.log('App install dismissed')
//       }
//       deferredPrompt = null
//     })
//   } else {
//     alert('Install not available yet. Try refreshing.')
//   }
// }






</script>
<style>
.ion-button{
--padding:10px;
}

</style>