import Vue from "vue";
import App from "./App.vue";
import "font-awesome/less/font-awesome.less";

import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

Vue.config.productionTip = false;

Vue.use(VueMaterial);
Vue.use(VueRouter);

import Home from "./components/Home";
import Create from "./components/Create";
import Play from "./components/Play";
import ViewAll from "./components/ViewAll";
import ViewPublic from "./components/ViewPublic";
import VueRouter from "vue-router";

const router = new VueRouter({
	mode: "history",
	base: __dirname,
	routes: [
		{ path: "/", component: Home },
		{ path: "/create", component: Create },
		{ path: "/play/:id", name: "play", component: Play },
		{ path: "/edit/:id", name: "edit", component: Create },
		{ path: "/viewall", component: ViewAll },
		{ path: "/viewpublic", component: ViewPublic }
	]
});

new Vue({
	router,
	render: h => h(App)
}).$mount("#app");
