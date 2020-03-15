<template>
	<section class="add-contact">
        <b-modal ref="addContactModal" hide-footer>
		<h1>Add Contacts</h1>
		<ValidationObserver ref="form" v-slot="{ }">
			<form  @submit.prevent="onSubmit">
				<b-form-group label="First Name">
					<ValidationProvider name="firstName" rules="required" v-slot="{ errors }">
					<b-form-input
						type="text"
						:state="errors.length == 0"
						v-model="form.firstName"
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
							v-model="form.lastName"
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
							v-model="form.street"
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
							v-model="form.city"
							required
							placeholder="City"
							name="city"
						></b-form-input>
						<b-form-invalid-feedback :state="errors.length == 0">City is required.</b-form-invalid-feedback>
					</ValidationProvider>
				</b-form-group>
				<b-form-group v-if="form.country == 'Canada' || form.country == 'United States'" label="State/Provence">
					<ValidationProvider name="state" :rules="form.country == 'Canada' ? 'required' : form.country == 'United States' ? 'required' : ''" v-slot="{ errors }">
						<b-form-select
							:options="form.country == 'Canada' ? provences : form.country == 'United States' ? states : '' "
							:state="errors.length == 0"
							v-model="form.state"
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
							v-model="form.postalCode"
							required
							placeholder="Postal Code"
							name="postalCode"
						></b-form-input>
						<b-form-invalid-feedback :state="errors.length == 0">Postal code is required.</b-form-invalid-feedback>
					</ValidationProvider>
				</b-form-group> 
				<b-form-group label="Country">
					<ValidationProvider name="country" rules="required" v-slot="{ errors }">
						<b-form-select
							:options="countries"
							:state="errors.length == 0"
							v-model="form.country"
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
						v-model="form.email"
						required
						placeholder="Email"
						name="email"
					></b-form-input>
					<b-form-invalid-feedback :state="errors.length == 0">{{errors.join('. ')}}</b-form-invalid-feedback>
					</ValidationProvider>
				</b-form-group> 
				<b-form-group label="Phone" :description="form.country == 'Canada' ? '000-000-0000' : form.country == 'United States' ? '000-000-0000' : ''">
					<ValidationProvider name="phone" rules="required|phone:country" v-slot="{ errors }">
					<b-form-input
						type="text"
						:state="errors.length == 0"
						v-model="form.phone"
						required
						placeholder="Phone"
						name="phone"
						
					></b-form-input>
					<b-form-invalid-feedback :state="errors.length == 0">{{errors.join('. ')}}</b-form-invalid-feedback>
					</ValidationProvider>
				</b-form-group> 
				<b-button class="float-right" type="submit" variant="primary">Submit</b-button>
			</form>
		</ValidationObserver>
        </b-modal>
	</section>
</template>

<script>
	import { COUNTRIES, STATES } from "@/constants/statesAndCountries";
	import { ValidationProvider, ValidationObserver } from 'vee-validate';
	import "bootstrap/dist/css/bootstrap.css";
	import "bootstrap-vue/dist/bootstrap-vue.css";
	import { insertContact } from '@/data/data'
	
	export default {
		components: {
			ValidationProvider,
			ValidationObserver
		},

		name: "AddContact",
		props: {
			edit: Boolean,
			contact: Object
		},

		methods: {
			onSubmit() {
				insertContact(this.form);
				this.form = {};
				this.$nextTick(() => {
					this.$refs.form.reset();
                });
                this.$refs.addContactModal.hide();
                this.$emit("submit");
			},
		},

		data() {
			return {
				form: {},
				countries: COUNTRIES.map(c => ({ value: c.name, text: c.name })),
				states: STATES.map(c => ({ value: c.name, text: c.name }))
			};
		},

		watch: {
			contact: {
				handler(c) {
					this.form = c || {};
				},
				deep: true,
				immediate: true
			}
		}
	};
</script>

<style scoped>
	section {
		display: inline-block;
	}
</style>