import Vue from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/less/font-awesome.less";

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
// import 'vue-material/dist/theme/default-dark.css'

Vue.config.productionTip = false;

Vue.use(VueMaterial)
Vue.use(VueRouter)
// Vue.use(MaterialKit)

import Home from "./components/Home";
import Create from "./components/Create";
import Save from "./components/Save";
import Play from "./components/Play";
import ViewAll from "./components/ViewAll";
import VueRouter from 'vue-router'

// 3. Create the router
const router = new VueRouter({
	mode: 'history',
	base: __dirname,
	routes: [
		{ path: '/', component: Home },
		{ path: '/create', component: Create },
		{ path: '/save', component: Save },
		{ path: '/play/:id', name: "play", component: Play },
		{ path: '/edit/:id', name: "edit", component: Create },
		{ path: '/viewall', component: ViewAll }
	]
})

new Vue({
	router,
	render: h => h(App)
}).$mount("#app");
