<template>
	<section class="add-contact">
		<h1>add-contact</h1>
		{{ $log("stufss " , contacts)}}
		<!-- {{ $log("counts " , countries)}} -->
		<ValidationObserver ref="observer" v-slot="{ }">
				<b-form-select
					:options="contacts"
					placeholder="Contact?"
					name="concant"
				></b-form-select>
			<form v-on:submit.prevent="onSubmit">
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
				<b-form-invalid-feedback :state="errors.length == 0">First name is requied.</b-form-invalid-feedback>
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
					<b-form-invalid-feedback :state="errors.length == 0">Last name is requied.</b-form-invalid-feedback>
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
					<b-form-invalid-feedback :state="errors.length == 0">Postal code is requied.</b-form-invalid-feedback>
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
					<b-form-invalid-feedback :state="errors.length == 0">Country is requied.</b-form-invalid-feedback>
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
			<b-form-group label="Phone">
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
			<b-form-group label="Age">
				<ValidationProvider
				name="age"
				rules="required|min_value:0|max_value:200"
				v-slot="{ errors }"
				>
				<b-form-input
					type="text"
					:state="errors.length == 0"
					v-model="form.age"
					required
					placeholder="Age"
					name="age"
				></b-form-input>
				<b-form-invalid-feedback :state="errors.length == 0">{{errors.join('. ')}}</b-form-invalid-feedback>
				</ValidationProvider>
			</b-form-group>
				<!-- <b-button type="submit" v-on:submit.prevent variant="primary">Submit??</b-button> -->
				<button type="submit">submit?</button>
			</form>
		</ValidationObserver>
	</section>
</template>


<script>
	import { COUNTRIES } from "@/helpers/exports";
	import { requestsMixin } from "@/mixins/requestsMixin";
	import { ValidationProvider, ValidationObserver } from 'vee-validate';
	import "bootstrap/dist/css/bootstrap.css";
	import "bootstrap-vue/dist/bootstrap-vue.css";
	import { insertContact, findAllContacts } from '../data/data'
	
	let contacts = []; 

	findAllContacts( (data) => {	
		data.forEach(c => contacts.push({ value: c.record.firstName, text: c.record.lastName }));
	});

	export default {
		components: {
			ValidationProvider,
			ValidationObserver
		},

		name: "AddContactMainPage",
		mixins: [requestsMixin],
		props: {
			edit: Boolean,
			contact: Object
		},

		methods: {
			onSubmit() {
				insertContact(this.form);
			},

			cancel() {
				this.$emit("cancelled");
			}
		},

		data() {
			return {
				contacts: contacts,
				form: {},
				countries: COUNTRIES.map(c => ({ value: c.name, text: c.name }))
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