<template>
	<div>
		<div v-if="currentSettings.vehicles && currentSettings.vehicles.length == 0">			
			<b-button size="sm" variant="primary" @click="showVehicleModal(null)"> + Add A Vehicle </b-button>
		</div>
		<div v-else>
			table
		</div>
		
		<VehicleModal ref="vehicleModal" v-bind:currentVehicle="currentVehicle"/>
	</div>
</template>

<script>
	import VehicleModal from "../Modals/VehicleModal";
	export default  {

		name: 'vehicles-tab',

		components: {
			VehicleModal
		},

		props: {
			currentSettings: Object,
		},

		mounted() {

		},

		data() {
			return {
				currentVehicle: {},
			}
		},

		methods: {
			showVehicleModal(selectedVehicle) {
				if (selectedVehicle) {
					this.currentVehicle = selectedVehicle
				}

				this.$refs.vehicleModal.$refs.vehicleModal.show()
			}
		},

		computed: {

		}
}

</script>