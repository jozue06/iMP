<template>
	<section class="contact">
		<b-modal ref="addAddressModal" hide-footer v-bind:currentContact="currentContact">
		<h1>Add Contacts</h1>
		<ValidationObserver ref="form" v-slot="{ }">
			<form @submit.prevent="onSubmit">
				<b-form-group label="Address">
					<ValidationProvider name="street" rules="required" v-slot="{ errors }">
						<b-form-input
							type="text"
							:state="errors.length == 0"
							v-model="currentContact.secondAddress"
							required
							placeholder="Address"
							name="street"
						></b-form-input>
						<b-form-invalid-feedback :state="errors.length == 0">Address is required.</b-form-invalid-feedback>
					</ValidationProvider>
				</b-form-group> 
				<b-form-group label="City">
					<ValidationProvider name="city" rules="required" v-slot="{ errors }">
						<b-form-input
							type="text"
							:state="errors.length == 0"
							v-model="currentContact.secondCity"
							required
							placeholder="City"
							name="city"
						></b-form-input>
						<b-form-invalid-feedback :state="errors.length == 0">City is required.</b-form-invalid-feedback>
					</ValidationProvider>
				</b-form-group>
				<b-form-group v-if="currentContact.secondCountry == 'Canada' || currentContact.secondCountry == 'United States'" label="State/Provence">
					<ValidationProvider name="state" :rules="currentContact.secondCountry == 'Canada' ? 'required' : currentContact.secondCountry == 'United States' ? 'required' : ''" v-slot="{ errors }">
						<b-form-select
							:options="currentContact.secondCountry == 'Canada' ? provences : currentContact.secondCountry == 'United States' ? states : '' "
							:state="errors.length == 0"
							v-model="currentContact.secondState"
							required
							placeholder="State"
							name="state"
						></b-form-select>
						<b-form-invalid-feedback :state="errors.length == 0">Country is required.</b-form-invalid-feedback>
					</ValidationProvider>
				</b-form-group> 
				<b-form-group label="Postal Code">
					<ValidationProvider
					name="postalCode"
					rules="required|postal_code:country"
					v-slot="{ errors }"
					>
						<b-form-input
							type="text"
							:state="errors.length == 0"
							v-model="currentContact.secondPostalCode"
							required
							placeholder="Postal Code"
							name="postalCode"
							lazy-formatter
							:formatter="formatNumber"
						></b-form-input>
						<b-form-invalid-feedback :state="errors.length == 0">Postal code is required.</b-form-invalid-feedback>
					</ValidationProvider>
				</b-form-group> 
				<b-form-group label="Country">
					<ValidationProvider name="country" rules="required" v-slot="{ errors }">
						<b-form-select
							:options="countries"
							:state="errors.length == 0"
							v-model="currentContact.secondCountry"
							required
							placeholder="Country"
							name="country"
						></b-form-select>
						<b-form-invalid-feedback :state="errors.length == 0">Country is required.</b-form-invalid-feedback>
					</ValidationProvider>
				</b-form-group> 
				<b-form-group label="Email">
					<ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
					<b-form-input
						type="text"
						:state="errors.length == 0"
						v-model="currentContact.secondEmail"
						required
						placeholder="Email"
						name="email"
					></b-form-input>
					<b-form-invalid-feedback :state="errors.length == 0">{{errors.join('. ')}}</b-form-invalid-feedback>
					</ValidationProvider>
				</b-form-group> 
				
				<b-form-group label="Phone" :description="currentContact.secondCountry == 'Canada' ? '000-000-0000' : currentContact.secondCountry == 'United States' ? '000-000-0000' : ''">
					<ValidationProvider name="phone" rules="required|phone:country" v-slot="{ errors }">
					<b-form-input
						type="text"
						:state="errors.length == 0"
						v-model="currentContact.secondPhone"
						required
						placeholder="Phone"
						name="phone"
						
					></b-form-input>
					<b-form-invalid-feedback :state="errors.length == 0">{{errors.join('. ')}}</b-form-invalid-feedback>
					</ValidationProvider>
				</b-form-group> 
				<b-button class="float-right" type="submit" :disabled="loading" variant="primary">
					Submit
					<b-spinner v-if="loading" small type="grow"></b-spinner>				
				</b-button>
			</form>
		</ValidationObserver>
		</b-modal>
	</section>
</template>

<script>
	import { COUNTRIES, STATES } from "@/constants/statesAndCountries";
	import { ValidationProvider, ValidationObserver } from 'vee-validate';

	export default  {
		name: 'addAddressModal',

		props: {
			currentContact: Object
		},

		mounted () {

		},

		data () {
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
					this.$Notification("Error", `Error Saving contact: ${e}`, "warning", "", 3000);
					this.loading = false;
					throw e;
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