import Vue from "vue";

import VueTsCss from "vue-css-ts";
import HelloComponent from "./components/hello/hello";

Vue.use(VueTsCss);

// TODO: to use 'vue$': 'vue/dist/vue.runtime.esm.js' need to change this
// e.g. new Vue({ el: '#app', router, render: h => h(App) }) or  new Vue(App).$mount('#app' or
// new Vue({
// render: h => h(App),
// }).$mount('#app'

new Vue({
  el: "#app",
  template: `
    <div>
        Name: <input v-model="name" type="text">
        <h1>Hello Component</h1>
        <hello-component :name="name" :initialEnthusiasm="5" />
    </div>
    `,
  data: { name: "World" },
  components: {
    HelloComponent,
  },
});
