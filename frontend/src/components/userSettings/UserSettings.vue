<template>
	<section class="mt-3">
		<div class="main-card">
			<!-- <router-link to="/contacts">
				<h1>{{ currentContact.firstName }}</h1>
			</router-link>	 -->
			<b-tabs small card>
				<b-tab title="Personal Info" active>
					<PersonalInfo v-bind:currentSettings="currentSettings" @refresh="refresh"/>
				</b-tab>
					<b-tab title="Vehicles">
						<VehiclesTab v-bind:currentSettings="currentSettings" v-bind:vehicles="vehicles" @refresh="refresh"/>
					</b-tab>
			</b-tabs>
		</div>
	</section>
</template>

<script>
	import PersonalInfo from "./PersonalInfo"
	import VehiclesTab from "./VehiclesTab"
	import { Settings } from "../../data/userSettings"
	export default  {

		name: 'userSettings',

		components: {
			PersonalInfo,
			VehiclesTab
		},

		props: {

		},

		mounted() {
			Settings.getSettings().then(settings => {
				this.currentSettings = settings ? settings : {};
				if (settings) {
					this.vehicles = settings.vehicles;
				}
			});
		},

		data() {
			return {
				currentSettings: {},
				vehicles: [],
			}
		},

		methods: {
			refresh() {
				Settings.getSettings().then(settings => {
					this.currentSettings = settings ? settings : {};
					if (settings) {
						this.vehicles = settings.vehicles;
					}
				});
			}
		},

		computed: {

		}
}

</script>