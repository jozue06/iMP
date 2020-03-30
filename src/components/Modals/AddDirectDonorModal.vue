<template>
	<section class="add-direct-donor">
		<b-modal size="xl" ref="addDirectDonorModal" hide-footer>
			<div class="float-left">
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
						<b-form-group label="amount">
							<b-input-group prepend="$">
								<b-form-input 
									class="text-right"
									type="text" 
									v-model="form.amount" 
									required
									placeholder="0.00"
									name="amount"
									lazy-formatter
									:formatter="formatMoney"
								>
								</b-form-input>
							</b-input-group>
						</b-form-group>
						<b-button class="float-right" type="submit" variant="primary">Submit</b-button>
					</form>
				</ValidationObserver>
			</div>
			<div class="float-right">
				<h1>Contacts</h1>
				<div v-if="contacts.length > 0">
					<!-- <b-form-group label="Selection mode:" label-cols-md="4">
						<b-form-select v-model="selectMode" :options="modes" class="mb-3"></b-form-select>
					</b-form-group> -->
					<b-table
						striped 
						hover 
						selectable=""
						ref="selectableTable"
						:items="contacts" 
						:fields="fields"
						:sort-by.sync="sortBy"
						:sort-desc.sync="sortDesc"
						:select-mode="selectMode"
						@row-selected="onRowSelected"
						selected-variant="primary"
						sort-icon-left
						responsive="sm"
						>
						<template v-slot:cell(selected)="{ rowSelected }">
							<template v-if="rowSelected">
								<span aria-hidden="true">&check;</span>
								<span variant="danger" class="sr-only"></span>
							</template>
							<template v-else>
								<span aria-hidden="true">&nbsp;</span>
							</template>
						</template>
					</b-table>
				</div>
			</div>
		</b-modal>
	</section>
</template>

<script>
	import { COUNTRIES, STATES } from "@/constants/statesAndCountries";
	import { ValidationProvider, ValidationObserver } from 'vee-validate';
	import { findAllContacts } from '@/data/data';

	export default {

		components: {
			ValidationProvider,
			ValidationObserver
		},

		methods: {
			findAllContacts() {
				let contacts = []; 
				findAllContacts().then((data) => {	
					data.forEach(c => {
						if (c.record.firstName && c.record.lastName) {
							c.record.id = c._id;
							contacts.push({...c.record});
						}
					});
				});
				return contacts;
			},

			onRowSelected(contact) {
				console.log('contact', contact[0]);
				console.log('this.form before', this.form);
				
				this.form = contact[0];
				console.log('this.form after', this.form);
			},

			formatMoney(amount) {

				if (isNaN(Number(amount))) {
					return 0;
				}

				let value = Number(amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");

				return value;
			},
		},

		data() {
			return {
				form: {},
				countries: COUNTRIES.map(c => ({ value: c.name, text: c.name })),
				contacts: this.findAllContacts(),
				states: STATES.map(c => ({ value: c.name, text: c.name })),
				fields: [
							{ key: 'firstName', label: 'First' },
							{ key: 'lastName', label: 'Last' },
						],
				sortBy: 'firstName',
				sortDesc: false,
				selected: "",
				selectMode: 'single',
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
		},		
	}
</script>

<style scoped>
	.small-contacts {
		max-width: 10%;
		margin-right: 10px;
	}
</style>