import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import Routes from './routes';
import BootstrapVue from "bootstrap-vue";
import { ValidationProvider, extend, ValidationObserver } from "vee-validate";
import { required, email, min_value, max_value } from "vee-validate/dist/rules";

extend("required", required);
extend("email", email);
extend("min_value", min_value);
extend("max_value", max_value);
extend("phone", {
	validate: (value, { country }) => {
		if (["United States", "Canada"].includes(country)) {
			return /^((d{3})|d{3})-?d{3}-?d{4}$/.test(value);
		}
		return true;
	},
	message: "Phone number is invalid.",
	params: [{ name: "country", isTarget: true }]
});

extend("postal_code", {
	validate: (value, { country }) => {
		if ("United States" == country) {
			return /^[0-9]{5}(?:-[0-9]{4})?$/.test(value);
		} else if ("Canada" == country) {
			return /^[A-Za-z]d[A-Za-z][ -]?d[A-Za-z]d$/.test(value);
		}
		return true;
	},
	message: "Phone number is invalid.",
	params: [{ name: "country", isTarget: true }]
});

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

Vue.config.productionTip = false;

Vue.prototype.$log = console.log;

const router = new VueRouter({
	routes: Routes,
});

new Vue({
	render: h => h(App), 
	router,
	mounted() {
		this.$router.push("/");
	}
}).$mount('#app');