import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Routes from "./routes";
import {
	BootstrapVue,
	IconsPlugin
} from "bootstrap-vue";

import {
	notification
} from "./mixins/notifications";
import getStatusFromCode from "./mixins/getStatusFromCode";
import getStatusColor from "./mixins/getStatusColorFromCode";
import getMonthFromCode from "./mixins/getMonthFromCode";
import moment from "moment";
import YearSelector from "./components/Globals/YearSelector";
import formatMoney from "./mixins/formatMoney"
import addMoney from "./mixins/addMoney"
import getTotalOfferingLineAmt from "./mixins/getTotalOfferingLineAmt"
import "./assets/scss/globalCustoms.scss";
import { getSession } from "./utils/session";

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.config.productionTip = false;

Vue.prototype.$Notification = notification;
Vue.prototype.$consoleLog = console.log;
Vue.prototype.$GetStatus = getStatusFromCode;
Vue.prototype.$GetStatusColor = getStatusColor;
Vue.prototype.$GetMonth = getMonthFromCode;
Vue.prototype.$Moment = moment;
Vue.prototype.$GetOfferingLineTotal = getTotalOfferingLineAmt;
Vue.component("YearSelector", YearSelector);
Vue.prototype.$formatMoney = formatMoney;
Vue.prototype.$addMoney = addMoney;
Vue.prototype.$getSession = getSession;

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
			next();
		}
	} else {
		next();
	}
})

new Vue({
	render: h => h(App),
	router,
}).$mount("#app");