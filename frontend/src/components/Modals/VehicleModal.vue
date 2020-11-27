<template>
	<section>
		<b-modal size="lg" top ref="vehicleModal" title="Vehicle Info" hide-footer v-bind:currentVehicle="currentVehicle">
			<b-tabs content-class="mt-3">
				<b-tab title="Vehicle Info" active>
					<VehicleModalInfoTab v-bind:currentVehicle="currentVehicle"/>
				</b-tab>
				<b-tab title="Vehicle Address">
					<VehicleModalAddressTab v-bind:currentVehicle="currentVehicle"/>
				</b-tab>
			</b-tabs>
			<b-button class="float-right" @click="saveVehicle" :disabled="loading" variant="primary">
				Save
				<b-spinner v-if="loading" small type="grow"></b-spinner>				
			</b-button>
		</b-modal>
	</section>
</template>

<script>
	import VehicleModalInfoTab from "./VehicleModalInfoTab";
	import VehicleModalAddressTab from "./VehicleModalAddressTab";
	import { Vehicles } from "../../data/vehicles";

	export default  {

		name: 'vehicleModal',

		components: {
			VehicleModalInfoTab,
			VehicleModalAddressTab
		},

		props: {
			currentVehicle: Object,
		},

		mounted() {

		},

		data() {
			return {
				loading: false,
			}
		},

		methods: {
			saveVehicle() {
				Vehicles.save(this.currentVehicle).then(res => {
					this.$refs.vehicleModal.hide();
					this.$Notification("Success!", "Successfully Saved the Vehicle", "primary");
					this.$emit("refresh");
				}).catch(e => {
					console.error('eek', e);
					this.$Notification("Error", `Error Saving Vehicle: ${e.message}`, "warning", "", 6000);
					throw e;
				});
			}
		},

		computed: {
		}
	}

</script>