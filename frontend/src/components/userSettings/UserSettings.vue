<template>
	<section class="mt-3">
		<div class="main-card">
			<b-tabs small card>
				<b-tab title="Personal Info" active>
					<PersonalInfo v-bind:currentSettings="currentSettings" @refresh="refresh"/>
				</b-tab>
				<b-tab title="Vehicles">
					<VehiclesTab v-bind:currentSettings="currentSettings" v-bind:vehicles="vehicles" @refresh="refresh"/>
				</b-tab>
				<b-tab title="Itineration Settings">
					<ItinerationSettingsTab v-bind:currentSettings="currentSettings" @refresh="refresh"/>
				</b-tab>
				<b-button class="text-center my-2" type="submit" @click="saveSettings" :disabled="loading" variant="primary">
					Save
					<b-spinner v-if="loading" small type="grow"></b-spinner>				
				</b-button>
			</b-tabs>
		</div>
	</section>
</template>

<script>
	import PersonalInfo from "./PersonalInfo";
	import VehiclesTab from "./VehiclesTab";
	import ItinerationSettingsTab from "./ItinerationSettingsTab";
	import { Settings } from "../../data/userSettings";

	export default  {

		name: 'userSettings',

		components: {
			PersonalInfo,
			VehiclesTab,
			ItinerationSettingsTab
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
				loading: false,
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
			},

			saveSettings() {
				Settings.save(this.currentSettings).then(res => {
					this.$Notification("Success!", "Successfully Saved the Settings", "primary");
				}).catch(e => {
					console.error('eek', e);
					this.$Notification("Error", `Error Saving Settings: ${e}`, "warning", "", 5000);
					throw e;
				});
			}
		},

		computed: {

		}
}

</script>