<template>
	<section class="mt-3">
		<b-tabs small card>
			<b-tab title="Personal Info" active>
				<PersonalInfo v-bind:currentSettings="currentSettings"/>
			</b-tab>
				<b-tab title="Vehicles">
					<VehiclesTab v-bind:currentSettings="currentSettings"/>
				</b-tab>
		</b-tabs>
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
			});
		},

		data() {
			return {
				currentSettings: {},
			}
		},

		methods: {

		},

		computed: {

		}
}

</script>