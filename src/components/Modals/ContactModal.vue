<template>
	<section class="contact">
		<b-modal ref="contactModal" hide-footer v-bind:contact="contact">
		<h1>Add Contacts</h1>
		<ValidationObserver ref="form" v-slot="{ }">
			<form  @submit.prevent="onSubmit">
				<b-form-group label="First Name">
					<ValidationProvider name="firstName" rules="required" v-slot="{ errors }">
					<b-form-input
						type="text"
						:state="errors.length == 0"
						v-model="contact.firstName"
						required
						placeholder="First Name"
						name="firstName"
					></b-form-input>
					<b-form-invalid-feedback :state="errors.length == 0">First name is required.</b-form-invalid-feedback>
					</ValidationProvider>
				</b-form-group> 
				<b-form-group label="Last Name">
					<ValidationProvider name="lastName" rules="required" v-slot="{ errors }">
						<b-form-input
							type="text"
							:state="errors.length == 0"
							v-model="contact.lastName"
							required
							placeholder="Last Name"
							name="lastName"
						></b-form-input>
						<b-form-invalid-feedback :state="errors.length == 0">Last name is required.</b-form-invalid-feedback>
					</ValidationProvider>
				</b-form-group> 
				<b-form-group label="Address">
					<ValidationProvider name="street" rules="required" v-slot="{ errors }">
						<b-form-input
							type="text"
							:state="errors.length == 0"
							v-model="contact.address"
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
							v-model="contact.city"
							required
							placeholder="City"
							name="city"
						></b-form-input>
						<b-form-invalid-feedback :state="errors.length == 0">City is required.</b-form-invalid-feedback>
					</ValidationProvider>
				</b-form-group>
				<b-form-group v-if="contact.country == 'Canada' || contact.country == 'United States'" label="State/Provence">
					<ValidationProvider name="state" :rules="contact.country == 'Canada' ? 'required' : contact.country == 'United States' ? 'required' : ''" v-slot="{ errors }">
						<b-form-select
							:options="contact.country == 'Canada' ? provences : contact.country == 'United States' ? states : '' "
							:state="errors.length == 0"
							v-model="contact.state"
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
							v-model="contact.postalCode"
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
							v-model="contact.country"
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
						v-model="contact.email"
						required
						placeholder="Email"
						name="email"
					></b-form-input>
					<b-form-invalid-feedback :state="errors.length == 0">{{errors.join('. ')}}</b-form-invalid-feedback>
					</ValidationProvider>
				</b-form-group> 

				
				<!-- REMOVE THIS NOTE STUFF JUST FOR TEST -->
				<b-form-group label="note">
					<b-form-input
						type="text"
						v-model="note"
						required
						placeholder="note"
						name="note"
					></b-form-input>					
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
	
	// import { insertContact } from '@/data/data'
	import { Contact, ContactNotes } from '../../data/models/contactModel'
	
	export default {
		components: {
			ValidationProvider,
			ValidationObserver
		},

		props: {
			contact: Object,
		},

		name: "contactModal",

		methods: {
			onSubmit() {
				this.loading = true;

				/*** REMOVE THIS NOTE STUFF JUST FOR TEST  */
				if (this.note != null) {
					console.log('note?? ', this.note);
					
					let newNote = ContactNotes.create();
					newNote.text = this.note;
					this.contact.notes = newNote;
				}


				this.contact.save().then((res) => {
					this.$refs.contactModal.hide();
					this.$Notification("Success!", "Successfully Added the Contact");
					this.loading = false;
					this.$emit("refresh");
				}).catch(e => {
					this.$Notification("Error", `Error Saving contact: ${e}`, "warning", "", 3000);
					this.loading = false;
				});
			},

			formatNumber(string) {
				return Number(string);
			}
		},

		data() {
			return {
				/*** REMOVE THIS NOTE STUFF JUST FOR TEST  */
				note: null,
				
				loading: false,
				countries: COUNTRIES.map(c => ({ value: c.name, text: c.name })),
				states: STATES.map(c => ({ value: c.name, text: c.name }))
			};
		},
	};
</script>

<style scoped>
	section {
		display: inline-block;
	}
</style>