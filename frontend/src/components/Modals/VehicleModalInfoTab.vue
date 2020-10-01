<template>
	<div>
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
			<b-col cols="3">
				<b-form-group label="Active">
					<b-form-checkbox v-model="currentVehicle.active" switch>
					</b-form-checkbox>
				</b-form-group>  
			</b-col>
			<b-col cols="3">
				<b-form-group v-if="currentVehicle.active" label="Default">
					<b-form-checkbox v-model="currentVehicle.default" switch>
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
					<YearSelector v-model="currentVehicle.year" @selected="formatYearForSave" placeHolder="Please Select A Year"/>
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
		<b-row class="mx-4 justify-content-around">
			<b-col cols="6">
				<b-form-group label="Chassis Number">
					<b-form-input
						type="text"
						v-model="currentVehicle.chassisNumber"
						placeholder="Chassis Number"
						name="chassisNumber"
					></b-form-input>
				</b-form-group> 
			</b-col>
			<b-col cols="6">
				<b-form-group label="Motor Number">
					<b-form-input
						type="text"
						v-model="currentVehicle.motorNumber"
						placeholder="Motor Number"
						name="motorNumber"
					></b-form-input>
				</b-form-group> 
			</b-col>
		</b-row>
		<b-row class="mx-4 justify-content-start">
			<b-col cols="6">
				<b-form-group label="STL Agreement Number">
					<b-form-input
						type="text"
						v-model="currentVehicle.stlAgreementNumber"
						placeholder="STL Agreement Number"
						name="stlAgreementNumber"
					></b-form-input>
				</b-form-group> 
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import vehicleTypes from "../../constants/vehicleTypes";
	export default  {

		name: 'vehicleModalInfoTab',

		components: {

		},

		props: {
			currentVehicle: Object
		},

		mounted() {

		},

		data() {
			return {
				selectedVehicleType: null,
			}
		},

		methods: {
			formatYearForSave(value) {
				if (value) {
					this.currentVehicle.year = value.format('YYYY');
				}
			},
		},

		computed: {
			vehicleTypesToSelect() {
				return vehicleTypes;
			}
		}
	}

</script>