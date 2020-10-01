<template>
	<div>
		<b-row class="ml-4 mr-4 justify-content-around">
			<b-col cols="3">
				<b-form-group label="First Name">
					<b-form-input
						type="text"
						v-model="currentSettings.firstName"
						placeholder="First Name"
						name="firstName"
					></b-form-input>
				</b-form-group> 
			</b-col>
			<b-col cols="3">
				<b-form-group label="Last Name">
					<b-form-input
						type="text"
						v-model="currentSettings.lastName"
						placeholder="Last Name"
						name="lastName"
					></b-form-input>
				</b-form-group> 
			</b-col>
			<b-col cols="3">
				<b-form-group label="Spouse Name">
					<b-form-input
						type="text"
						v-model="currentSettings.spouseName"
						placeholder="Spouse Name"
						name="spouseName"
					></b-form-input>
				</b-form-group> 
			</b-col>
		</b-row>	

		<b-row class="ml-4 mr-4 justify-content-around">
			<b-col cols="2">
				<b-form-group label="Email">
					<b-form-input
						type="text"
						v-model="currentSettings.email"
						required
						placeholder="Email"
						name="email"
					></b-form-input>
				</b-form-group> 
			</b-col>
			<b-col cols="2">
				<b-form-group label="Home Phone" :description="currentSettings.country == 'Canada' ? '000-000-0000' : currentSettings.country == 'United States' ? '000-000-0000' : ''">
					<b-form-input
						type="text"
						v-model="currentSettings.phone"
						required
						placeholder="Home Phone"
						name="phone"
					></b-form-input>
				</b-form-group> 
			</b-col>
			<b-col cols="2">
				<b-form-group label="Mobile Phone">
					<b-form-input
						type="text"
						v-model="currentSettings.mobilePhone"
						required
						placeholder="Mobile Phone"
						name="mobilePhone"
					></b-form-input>
				</b-form-group>
			</b-col>
			<b-col cols="2">
				<DistrictSelector v-bind:currentContact="currentSettings"/>
			</b-col>	
		</b-row>

		<!--  ***** -->
		
		<b-row class="ml-4 mr-4 justify-content-between">
			<b-col cols="4">
				<b-form-group label="Address">
					<b-form-input
						type="text"
						v-model="currentSettings.address"
						placeholder="Address"
						name="address"
					></b-form-input>
				</b-form-group> 
			</b-col>
			<b-col cols="2">
				<b-form-group label="City">
					<b-form-input
						type="text"
						v-model="currentSettings.city"
						placeholder="City"
						name="city"
					></b-form-input>
				</b-form-group> 
			</b-col>
			<b-col cols="2">
				<b-form-group label="Country">
					
					<b-form-select
						:options="countries"
						v-model="currentSettings.country"
						placeholder="Country"
						name="country"
					></b-form-select>
				</b-form-group> 
			</b-col>
			<b-col cols="2">
				<b-form-group label="State/Province">
					<b-form-select
						:options="currentSettings.country == 'Canada' ? provinces : currentSettings.country == 'United States' ? states : {} "
						v-model="currentSettings.state"
						placeholder="State"
						name="state"
					></b-form-select>
				</b-form-group> 
			</b-col>
			<b-col cols="2">
				<b-form-group label="Postal Code">
					<b-form-input
						type="text"
						v-model="currentSettings.postalCode"
						placeholder="Postal Code"
						name="postalCode"
					></b-form-input>
				</b-form-group>
			</b-col>
		</b-row>
		<b-button class="text-center" type="submit" @click="saveSettings" :disabled="loading" variant="primary">
			Submit
			<b-spinner v-if="loading" small type="grow"></b-spinner>				
		</b-button>
	</div>
</template>

<script>
	import { COUNTRIES, STATES, PROVINCES } from "@/constants/statesAndCountries";
	import DistrictSelector from '../Globals/DistrictSelector'
	import { Settings } from "../../data/userSettings";
	export default  {

		name: 'personalInfo',

		components: {
			DistrictSelector,
		},

		props: {
			currentSettings: Object,
		},

		mounted() {

		},

		data() {
			return {
				loading: false,
				countries: COUNTRIES.map(c => ({ value: c.name, text: c.name })),
				states: STATES.map(c => ({ value: c.name, text: c.name })),
				provinces: PROVINCES.map(c => ({ value: c.name, text: c.name }))
			}
		},

		methods: {
			saveSettings() {
				Settings.save(this.currentSettings);
			}
		},

		computed: {

		}
}

</script>