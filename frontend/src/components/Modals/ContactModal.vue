<template>
	<section class="contact">
		<b-modal ref="contactModal" hide-footer v-bind:contact="contact">			
			<h1>{{ title }}</h1>
				<form @submit.prevent="onSubmit">
					<b-form-group label="First Name">
						<b-form-input
							type="text"
							v-model="contact.firstName"
							required
							placeholder="First Name"
							name="firstName"
						></b-form-input>
					</b-form-group> 
					<b-form-group label="Last Name">
						<b-form-input
							type="text"
							v-model="contact.lastName"
							required
							placeholder="Last Name"
							name="lastName"
						></b-form-input>
					</b-form-group> 
					<b-form-group label="Address">
						<b-form-input
							type="text"
							v-model="contact.address"
							required
							placeholder="Address"
							name="street"
						></b-form-input>
					</b-form-group> 
					<b-form-group label="City">
						<b-form-input
							type="text"
							v-model="contact.city"
							required
							placeholder="City"
							name="city"
						></b-form-input>
					</b-form-group>
					<b-form-group v-if="contact.country == 'Canada' || contact.country == 'United States'" label="State/Provence">
						<b-form-select
							:options="contact.country == 'Canada' ? provences : contact.country == 'United States' ? states : '' "
							v-model="contact.state"
							required
							placeholder="State"
							name="state"
						></b-form-select>
					</b-form-group> 
					<b-form-group label="Country">
						<b-form-select
							:options="countries"
							v-model="contact.country"
							required
							placeholder="Country"
							name="country"
						></b-form-select>
					</b-form-group> 
					<b-form-group label="Postal Code">
						<b-form-input
							type="text"
							v-model="contact.postalCode"
							required
							placeholder="Postal Code"
							name="postalCode"
						></b-form-input>
					</b-form-group> 
			
					<b-form-group label="Email">
						<b-form-input
							type="text"
							v-model="contact.email"
							required
							placeholder="Email"
							name="email"
						></b-form-input>
					</b-form-group> 
					
					<b-form-group label="Phone" :description="contact.country == 'Canada' ? '000-000-0000' : contact.country == 'United States' ? '000-000-0000' : ''">
						<b-form-input
							type="text"
							v-model="contact.phone"
							required
							placeholder="Phone"
							name="phone"
						></b-form-input>
					</b-form-group> 
				</form>
			<DistrictSelector v-bind:currentContact="contact"/>
			<b-button class="float-right mt-2" @click="onSubmit" :disabled="loading" variant="primary">
				Submit
				<b-spinner v-if="loading" small type="grow"></b-spinner>				
			</b-button>
		</b-modal>
	</section>
</template>

<script>
	import { COUNTRIES, STATES } from "@/constants/statesAndCountries";
	import { Contacts } from '../../data/contacts'
	import DistrictSelector from '../Globals/DistrictSelector';
	
	export default {
		components: {
			DistrictSelector
		},

		props: {
			contact: Object,
		},

		name: "contactModal",

		methods: {
			onSubmit() {
				this.loading = true;								
				Contacts.save(this.contact).then((res) => {					
					this.$refs.contactModal.hide();
					this.$Notification("Success!", "Successfully Added the Contact", "primary");
					this.loading = false;
					this.$emit("refresh");
				})
				.catch(e => {
					this.$Notification("Error", `Error Saving contact: ${e.message}`, "warning", "", 3000);
					this.loading = false;
					throw e;
				});
			},
			
			formatNumber(string) {
				return Number(string);
			}
		},

		data() {
			return {
				loading: false,
				countries: COUNTRIES.map(c => ({ value: c.name, text: c.name })),
				states: STATES.map(c => ({ value: c.name, text: c.name }))
			};
		},
		computed: {
			title() {
				return this.contact.firstName ? "Update Contact" : "Add Contact";
			}
		}
	};
</script>

<style scoped>
	section {
		display: inline-block;
	}
</style>