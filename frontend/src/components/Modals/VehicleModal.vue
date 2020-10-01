<template>
	<section>
		<b-modal size="lg" top ref="vehicleModal" title="Vehicle Info" hide-footer v-bind:currentVehicle="currentVehicle">
			<b-row class="mx-4 justify-content-between">
				<b-col cols="6">
					<b-form-group label="Vehicle Name">
						<b-form-input
							type="text"
							v-model="currentVehicle.name"
							placeholder="Name"
							name="name"
						></b-form-input>
					</b-form-group> 
				</b-col>
				<b-col cols="4">
					<b-form-group label="Active">
						<b-form-checkbox
							size="lg"
							id="checkbox"
							v-model="currentVehicle.active"
							name="checkbox"
							value=true
							unchecked-value=false
						>
						</b-form-checkbox>
					</b-form-group> 
				</b-col>
			</b-row>
			<b-row class="mx-4 justify-content-around">
				<b-col cols="6">
					<b-form-group label="Type">
						<b-form-select v-model="currentVehicle.type" :options="vehicleTypesToSelect">
							<b-form-select-option :value="undefined">Please select a Vehicle</b-form-select-option>
						</b-form-select>
					</b-form-group>	
				</b-col>
				<b-col cols="6">
					<b-form-group label="Owner">
						<b-form-input
							type="text"
							v-model="currentVehicle.owner"
							placeholder="Owner"
							name="owner"
						></b-form-input>
					</b-form-group> 
				</b-col>
			</b-row>
			<b-row class="mx-4 justify-content-around">
				<b-col cols="4">
					<b-form-group label="Year">
						<YearSelector v-bind:value="currentVehicle.year" v-model="currentVehicle.year" placeHolder="Please Select A Year"/>
					</b-form-group>
				</b-col>
		
				<b-col cols="4">
					<b-form-group label="Make">
						<b-form-input
							type="text"
							v-model="currentVehicle.make"
							placeholder="Make"
							name="make"
						></b-form-input>
					</b-form-group> 
				</b-col>
				<b-col cols="4">
					<b-form-group label="Model">
						<b-form-input
							type="text"
							v-model="currentVehicle.model"
							placeholder="Model"
							name="model"
						></b-form-input>
					</b-form-group> 
				</b-col>
			</b-row>
		</b-modal>
	</section>
</template>

<script>
	import vehicleTypes from "../../constants/vehicleTypes";
	export default  {

		name: 'vehicleModal',

		components: {
			
		},

		props: {
			currentVehicle: Object,
		},

		mounted() {

		},

		data() {
			return {
				selectedVehicleType: null,
			}
		},

		methods: {

		},

		computed: {
			vehicleTypesToSelect() {
				return vehicleTypes;
			}
		}
	}

</script>