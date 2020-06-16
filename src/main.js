import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import Routes from './routes';
import BootstrapVue from "bootstrap-vue";
import { ValidationProvider, extend, ValidationObserver } from "vee-validate";
import { required, email, min_value, max_value } from "vee-validate/dist/rules";
import { notification } from "./mixins/notifications"
import YearSelector from './components/YearSelector'
import "./assets/scss/globalCustoms.scss";

extend("required", required);
extend("email", email);
extend("min_value", min_value);
extend("max_value", max_value);
extend("phone", {
	validate: (value, { country }) => {
		if (["United States", "Canada"].includes(country)) {
			return /^[0-9]{3}-[0-9]{3}-([0-9]{4})?$/.test(value);
		} else {
			return /\d{1,}/.test(value);
		}
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
	message: "Postal Code is invalid.",
	params: [{ name: "country", isTarget: true }]
});

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
Vue.component('YearSelector', YearSelector);

Vue.config.productionTip = false;

Vue.prototype.$Notification = notification;
Vue.prototype.$consoleLog = console.log;

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