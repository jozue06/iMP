import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Routes from "./routes";
import {
	BootstrapVue,
	IconsPlugin
} from "bootstrap-vue";
import {
	ValidationProvider,
	extend,
	ValidationObserver
} from "vee-validate";
import {
	required,
	email,
	min_value,
	max_value
} from "vee-validate/dist/rules";
import {
	notification
} from "./mixins/notifications";
import getStatusFromCode from "./mixins/getStatusFromCode";
import getStatusColor from "./mixins/getStatusColorFromCode";
import moment from "moment";
import YearSelector from "./components/YearSelector";
import formatMoney from "./mixins/formatMoney"
import "./assets/scss/globalCustoms.scss";

extend("required", required);
extend("email", email);
extend("min_value", min_value);
extend("max_value", max_value);
extend("phone", {
	validate: (value, {
		country
	}) => {
		if (["United States", "Canada"].includes(country)) {
			return /^[0-9]{3}-[0-9]{3}-([0-9]{4})?$/.test(value);
		} else {
			return /\d{1,}/.test(value);
		}
	},
	message: "Phone number is invalid.",
	params: [{
		name: "country",
		isTarget: true
	}]
});

extend("postal_code", {
	validate: (value, {
		country
	}) => {
		if (["United States", "Canada"].includes(country)) {
			if ("United States" == country) {
				return /^[0-9]{5}(?:-[0-9]{4})?$/.test(value);
			} else if ("Canada" == country) {
				return /^[A-Za-z]d[A-Za-z][ -]?d[A-Za-z]d$/.test(value);
			}
		} else {
			return /\d{1,}/.test(value);
		}
	},
	message: "Postal Code is invalid.",
	params: [{
		name: "country",
		isTarget: true
	}]
});

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

Vue.config.productionTip = false;

Vue.prototype.$Notification = notification;
Vue.prototype.$consoleLog = console.log;
Vue.prototype.$GetStatus = getStatusFromCode;
Vue.prototype.$GetStatusColor = getStatusColor;
Vue.prototype.$Moment = moment;
Vue.component("YearSelector", YearSelector);
Vue.prototype.$formatMoney = formatMoney;

const router = new VueRouter({
	routes: Routes,
});

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (localStorage.getItem('jwt') == null) {
			next({
				path: '/login',
				params: {
					nextUrl: to.fullPath
				}
			});
		} else {
			// do auth to backend with JWT
		}
	} else {
		next()
	}
})


new Vue({
	render: h => h(App),
	router,
}).$mount("#app");