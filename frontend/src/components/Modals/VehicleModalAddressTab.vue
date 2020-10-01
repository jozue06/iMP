<template>
	<div>
		<b-row class="ml-4 mr-4 justify-content-between">
			<b-col cols="4">
				<b-form-group label="Address">
					<b-form-input
						type="text"
						v-model="currentVehicle.address"
						name="address"
					></b-form-input>
				</b-form-group> 
			</b-col>
			<b-col cols="2">
				<b-form-group label="City">
					<b-form-input
						type="text"
						v-model="currentVehicle.city"
						name="city"
					></b-form-input>
				</b-form-group> 
			</b-col>
			<b-col cols="2">
				<b-form-group label="Country">
					
					<b-form-select
						:options="countries"
						v-model="currentVehicle.country"
						name="country"
					></b-form-select>
				</b-form-group> 
			</b-col>
			<b-col cols="2">
				<b-form-group label="State/Province">
					<b-form-select
						:options="currentVehicle.country == 'Canada' ? provinces : currentVehicle.country == 'United States' ? states : [] "
						v-model="currentVehicle.state"
						name="state"
					></b-form-select>
				</b-form-group> 
			</b-col>
			<b-col cols="2">
				<b-form-group label="Postal Code">
					<b-form-input
						type="text"
						v-model="currentVehicle.postalCode"
						name="postalCode"
					></b-form-input>
				</b-form-group>
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import { COUNTRIES, STATES, PROVINCES } from "@/constants/statesAndCountries";
	export default  {

		name: 'VehicleModalAddressTab',

		components: {

		},

		props: {
			currentVehicle: Object
		},

		mounted() {

		},

		data() {
			return {
				countries: COUNTRIES.map(c => ({ value: c.name, text: c.name })),
				states: STATES.map(c => ({ value: c.name, text: c.name })),
				provinces: PROVINCES.map(c => ({ value: c.name, text: c.name }))
			}
		},

		methods: {

		},

		computed: {

		}
}

</script>