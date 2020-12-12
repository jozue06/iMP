<template>
	<section>
		<b-modal top ref="otherIncomeModal" title="Other Income" hide-footer v-bind:otherIncomeLine="otherIncomeLine" v-bind:currentReport="currentReport">
			<div>
				<b-row>
					<b-col cols="6">
						<ContactSearchComponent @contactClicked="selected" />
					</b-col>
				</b-row>
			</div>			
			<b-row v-if="otherIncomeLine.contact" class="align-items-center">
				<b-col cols="4">
					<label> Name: </label>
					<div>
						{{ otherIncomeLine.contact.firstName }} {{ otherIncomeLine.contact.lastName }}
					</div>
					<label> email: </label>
					<br>
					{{ otherIncomeLine.contact.email }}
				</b-col>
				<b-col cols="5">
					<br>
					<label> address: </label>
					<br>
					{{ otherIncomeLine.contact.address }},
					{{ otherIncomeLine.contact.city }}, 
					{{ otherIncomeLine.contact.postalCode }}
					<br>
					{{ otherIncomeLine.contact.country }}
					<br>
					<b-button class="mb-2" size="sm" variant="danger" @click="clear">Clear</b-button>
				</b-col>
			</b-row>
			<b-row v-else class="align-items-center">
				<b-col cols="4">
					<div>
						<b-form-group label="First Name">
							<b-form-input
								type="text"
								v-model="otherIncomeLine.firstName"
								placeholder="First Name"
								name="firstName"
							></b-form-input>
						</b-form-group> 
						<b-form-group label="Last Name">
							<b-form-input
								type="text"
								v-model="otherIncomeLine.lastName"
								placeholder="Last Name"
								name="lastName"
							></b-form-input>
						</b-form-group> 
					</div>
					<b-form-group label="Email">
						<b-form-input
							type="text"
							v-model="otherIncomeLine.email"
							placeholder="Email"
							name="email"
						></b-form-input>
					</b-form-group> 
				</b-col>
				<b-col cols="5">
					<b-form-group label="Address">
						<b-form-input
							type="text"
							v-model="otherIncomeLine.address"
							required
							placeholder="Address"
							name="street"
						></b-form-input>
					</b-form-group> 
					<b-form-group label="City">
						<b-form-input
							type="text"
							v-model="otherIncomeLine.city"
							required
							placeholder="City"
							name="city"
						></b-form-input>
					</b-form-group>
					<b-form-group label="Country">
						<b-form-select
							:options="countries"
							v-model="otherIncomeLine.country"
							required
							placeholder="Country"
							name="country"
						></b-form-select>
					</b-form-group> 
					<b-form-group v-if="otherIncomeLine.country == 'Canada' || otherIncomeLine.country == 'United States'" label="State/Province">
						<b-form-select
							:options="otherIncomeLine.country == 'Canada' ? provinces : otherIncomeLine.country == 'United States' ? states : '' "
							v-model="otherIncomeLine.state"
							required
							placeholder="State"
							name="state"
						></b-form-select>
					</b-form-group> 
					<b-form-group label="Postal Code">
						<b-form-input
							type="text"
							v-model="otherIncomeLine.postalCode"
							required
							placeholder="Postal Code"
							name="postalCode"
						></b-form-input>
					</b-form-group> 
				</b-col>
			</b-row>
			<b-row>
				<b-col cols="3">
					<b-form-group label="amount">
						<b-input-group prepend="$">
							<b-form-input 
								class="text-right"
								type="text" 
								v-model="otherIncomeLine.amount" 
								required
								placeholder="0.00"
								name="amount"
								lazy-formatter
								:formatter="$formatMoney"
							>
							</b-form-input>
						</b-input-group>
					</b-form-group>
				</b-col>
				<b-col cols="6" class="text-center">
					<b-form-group label="Income Type">
						<b-form-select v-model="otherIncomeLine.type">
							<option value=0>Personal</option>
							<option value=1>Director Donor</option>
						</b-form-select>
					</b-form-group>
				</b-col>
			</b-row>

			<b-button class="mb-2" size="sm" variant="primary" @click="save">Save</b-button>
		</b-modal>
	</section>
</template>

<script>
	import ContactSearchComponent from "../Globals/ContactSearchComponent";
	import { COUNTRIES, STATES, PROVINCES } from "@/constants/statesAndCountries";
	import { OtherIncomeLines } from "../../data/otherIncomeLines";

	export default  {

		name: 'otherIncomeModal',

		components: {
			ContactSearchComponent
		},

		props: {
			otherIncomeLine: Object,
			currentReport: Object,
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
			selected(item) {
				this.otherIncomeLine.contact = item;
				this.$forceUpdate();
			},

			clear() {
				this.otherIncomeLine.contact = null;
				this.$forceUpdate();
			},

			getContact() {
				if (this.otherIncomeLineId) {
					OtherIncomeLines.getOtherIncomeLine(this.otherIncomeLineId).then(line => {
						this.otherIncomeLine.contact = line.contact;
					});
				} else {
					this.otherIncomeLine.contact = null;
				}
			},

			save() {
				this.loading = true;

				if (this.currentReport.otherIncomeLines && !this.currentReport.otherIncomeLines.includes(this.otherIncomeLine)) {
					this.currentReport.otherIncomeLines.push(this.otherIncomeLine);
				}
				
				this.otherIncomeLine.qtrReportId = this.currentReport._id;

				OtherIncomeLines.save(this.otherIncomeLine).then(res => {
					this.$Notification("Success!", "Successfully saved the Other Income", "primary")
					this.$refs.otherIncomeModal.hide();
					this.loading = false;
				}).catch(e => {
					console.error('eeek ', e);
					this.loading = false;
					throw e;
				});
			}
		},

		computed: {
			otherIncomeLineId() {
				if (this.otherIncomeLine._id) {
					return this.otherIncomeLine._id;
				}
				return '0';
			}
		},

		watch: {
			otherIncomeLine: {
				handler(c) {
					this.getContact();
				},
				deep: true,
				immediate: true,
			}
		},
	}
</script>