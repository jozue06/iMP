<template>
	<section class="contact">
		<b-modal top ref="addAddressModal" hide-footer v-bind:currentContact="currentContact">
		<h1>+ Add Address</h1>
			<form @submit.prevent="onSubmit">
				<b-form-group label="Address">
					<b-form-input
						type="text"
						v-model="currentContact.secondAddress"
						required
						placeholder="Address"
						name="street"
					></b-form-input>
				</b-form-group> 
				<b-form-group label="City">
					<b-form-input
						type="text"
						v-model="currentContact.secondCity"
						required
						placeholder="City"
						name="city"
					></b-form-input>
				</b-form-group>
				<b-form-group v-if="currentContact.secondCountry == 'Canada' || currentContact.secondCountry == 'United States'" label="State/Provence">
					<b-form-select
						:options="currentContact.secondCountry == 'Canada' ? provences : currentContact.secondCountry == 'United States' ? states : '' "
						v-model="currentContact.secondState"
						required
						placeholder="State"
						name="state"
					></b-form-select>
				</b-form-group> 
				<b-form-group label="Postal Code">
					<b-form-input
						type="text"
						v-model="currentContact.secondPostalCode"
						required
						placeholder="Postal Code"
						name="postalCode"
					></b-form-input>
				</b-form-group> 
				<b-form-group label="Country">
					<b-form-select
						:options="countries"
						v-model="currentContact.secondCountry"
						required
						placeholder="Country"
						name="country"
					></b-form-select>
				</b-form-group> 
				<b-form-group label="Email">
					<b-form-input
						type="text"
						v-model="currentContact.secondEmail"
						required
						placeholder="Email"
						name="email"
					></b-form-input>
				</b-form-group> 
				<b-form-group label="Phone" :description="currentContact.secondCountry == 'Canada' ? '000-000-0000' : currentContact.secondCountry == 'United States' ? '000-000-0000' : ''">
					<b-form-input
						type="text"
						v-model="currentContact.secondPhone"
						required
						placeholder="Phone"
						name="phone"
					></b-form-input>
				</b-form-group> 
				<b-button class="float-right" type="submit" :disabled="loading" variant="primary">
					Submit
					<b-spinner v-if="loading" small type="grow"></b-spinner>				
				</b-button>
			</form>
		</b-modal>
	</section>
</template>

<script>
	import { COUNTRIES, STATES } from "@/constants/statesAndCountries";

	export default  {
		name: 'addAddressModal',

		props: {
			currentContact: Object
		},

		mounted () {

		},

		data() {
			return {
				loading: false,
				countries: COUNTRIES.map(c => ({ value: c.name, text: c.name })),
				states: STATES.map(c => ({ value: c.name, text: c.name }))
			}
		},

		methods: {
			onSubmit() {
				this.loading = true;
				this.currentContact.save().then((res) => {
					this.$refs.addAddressModal.hide();
					this.loading = false;
					this.$emit("saveContact");
				}).catch(e => {
					this.$Notification("Error", `Error Saving contact: ${e.message}`, "warning", "", 6000);
					this.loading = false;
				});

			},
			
			formatNumber(string) {
				return Number(string);
			}

		},

		computed: {

		}
	}
</script>