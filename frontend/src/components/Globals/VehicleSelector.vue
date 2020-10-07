<template>
	<div>
		<b-form-select v-model="model.vehicle" :options="vehicleOptions">
			<template v-if="!model.vehicle" v-slot:first>
				<b-form-select-option value="" disabled>
					Please select a Vehicle
				</b-form-select-option>
			</template>	
		</b-form-select>
	</div>	
</template>

<script>
	import { Vehicles } from "../../data/vehicles";
	export default  {

		name: 'vehicle-selector',

		components: {
		
		},

		props: {
			model: Object,
		},

		mounted() {
			this.getVehicles();
		},

		data() {
			return {
				vehicleOptions: [],
			}
		},

		methods: {
			getVehicles() {
				Vehicles.getVehicles().then(res => {
					this.vehicleOptions = res.map(v => ({ value: v._id, text: v.name }));
				})
			}
		},

		computed: {
		}
}

</script>