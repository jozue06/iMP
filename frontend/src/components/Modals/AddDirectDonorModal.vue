<template>
	<section class="add-direct-donor">
		<b-modal size="xl" ref="addDirectDonorModal" hide-footer>
			<div class="float-left">
				<h1>Add Contacts</h1>

				<form @submit.prevent="onSubmit">
					<b-form-group label="First Name">
						<b-form-input
						type="text"
						v-model="form.firstName"
						required
						placeholder="First Name"
						name="firstName"
						></b-form-input>
					</b-form-group>
					<b-form-group label="Last Name">
						<b-form-input
						type="text"
						v-model="form.lastName"
						required
						placeholder="Last Name"
						name="lastName"
						></b-form-input>
					</b-form-group>
					<b-form-group label="Address">
						<b-form-input
						type="text"
						:state="errors.length == 0"
						v-model="form.street"
						required
						placeholder="Address"
						name="street"
						></b-form-input>
					</b-form-group>
					<b-form-group label="City">
						<b-form-input
						type="text"
						:state="errors.length == 0"
						v-model="form.city"
						required
						placeholder="City"
						name="city"
						></b-form-input>
					</b-form-group>
					<b-form-group
						v-if="form.country == 'Canada' || form.country == 'United States'"
						label="State/Provence"
					>
						<b-form-select
						:options="form.country == 'Canada' ? provences : form.country == 'United States' ? states : '' "
						v-model="form.state"
						required
						placeholder="State"
						name="state"
						></b-form-select>
					</b-form-group>
					<b-form-group label="Postal Code">
						<b-form-input
						type="text"
						v-model="form.postalCode"
						required
						placeholder="Postal Code"
						name="postalCode"
						></b-form-input>
					</b-form-group>
					<b-form-group label="Country">
						<b-form-select
						:options="countries"
						v-model="form.country"
						required
						placeholder="Country"
						name="country"
						></b-form-select>
					</b-form-group>
					<b-form-group label="Email">
						<b-form-input
						type="text"
						v-model="form.email"
						required
						placeholder="Email"
						name="email"
						></b-form-input>
					</b-form-group>
					<b-form-group
						label="Phone"
						:description="form.country == 'Canada' ? '000-000-0000' : form.country == 'United States' ? '000-000-0000' : ''"
					>
						<b-form-input
						type="text"
						v-model="form.phone"
						required
						placeholder="Phone"
						name="phone"
						></b-form-input>
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
								:formatter="$formatMoney"
							></b-form-input>
						</b-input-group>
					</b-form-group>
					<b-button class="float-right" type="submit" variant="primary">Submit</b-button>
				</form>
			</div>
			<div class="float-right">
				<h1>Contacts</h1>
				<div v-if="contacts.length > 0">
				<!-- <b-form-group label="Selection mode:" label-cols-md="4">
										<b-form-select v-model="selectMode" :options="modes" class="mb-3"></b-form-select>
				</b-form-group>-->
					<b-table
						striped
						hover
						selectable
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
	import { findAllContacts } from "@/data/data";

	export default {
		components: {
		},

		methods: {
			findAllContacts() {
			let contacts = [];
				findAllContacts().then((data) => {
					data.forEach((c) => {
					if (c.record.firstName && c.record.lastName) {
						c.record.id = c._id;
						contacts.push({ ...c.record });
					}
					});
				});
			return contacts;
			},

			onRowSelected(contact) {
				this.form = contact[0];
			},
		},

		data() {
			return {
				form: {},
				countries: COUNTRIES.map((c) => ({ value: c.name, text: c.name })),
				contacts: this.findAllContacts(),
				states: STATES.map((c) => ({ value: c.name, text: c.name })),
				fields: [
					{ key: "firstName", label: "First" },
					{ key: "lastName", label: "Last" },
				],
				sortBy: "firstName",
				sortDesc: false,
				selected: "",
				selectMode: "single",
			};
		},

		watch: {
			contact: {
				handler(c) {
					this.form = c || {};
				},
				deep: true,
				immediate: true,
			},
		},
	};
</script>

<style scoped>
	.small-contacts {
		max-width: 10%;
		margin-right: 10px;
	}
</style>