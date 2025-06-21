import { createStore } from 'vuex';

export const store = createStore({
state () {
return {
count: 0,
user:null,










}

},
mutations: {
increment (state) {
state.count++
}
}
});

