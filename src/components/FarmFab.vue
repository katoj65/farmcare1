<template>
<ion-fab slot="fixed" vertical="bottom" horizontal="end">
<ion-fab-button color="dark">
<ion-icon :icon="chevronUpCircle"></ion-icon>
</ion-fab-button>
<ion-fab-list side="top">

<ion-fab-button>
<ion-icon :icon="bug"></ion-icon>
</ion-fab-button>
<ion-fab-button>
<span class="material-icons">assignment</span>
</ion-fab-button>
<ion-fab-button>
<ion-icon :icon="briefcase"></ion-icon>
</ion-fab-button>

<ion-fab-button id="open-action-sheet">
<ion-icon :icon="add"></ion-icon>
</ion-fab-button>
</ion-fab-list>

<ion-action-sheet trigger="open-action-sheet" header="Add Items" :buttons="actionSheetButtons">




</ion-action-sheet>

</ion-fab>
</template>
<script setup lang="ts">
import {IonFab, IonFabButton, IonFabList,IonIcon,IonActionSheet,
} from '@ionic/vue';
import {
chevronDownCircle,
chevronForwardCircle,
chevronUpCircle,
colorPalette,
document,
briefcase,
bug,
addCircleOutline,
add
} from 'ionicons/icons';




const actionSheetButtons = [
{
text: 'Add animal',
//   role: 'destructive',
data: {
action: 'animal',
},
},

{
text: 'Add farm worker',
data: {
action: 'share',
},
},

{
text: 'Add veterinary doctor',
data: {
action: 'share',
},
},






{
text: 'Cancel',
role: 'cancel',
data: {
action: 'cancel',
},
},
];


</script>