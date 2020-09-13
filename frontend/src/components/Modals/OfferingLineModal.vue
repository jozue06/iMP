<template>
	<section>
		<b-modal top ref="offeringLineModal" title="Offering Receipt" hide-footer v-bind:offeringLine="offeringLine" v-bind:currentReport="currentReport">
			<p></p>
			<div>
				<b-row>
					<!-- <b-col cols="6">
						<ContactSearchComponent @rowClicked="selected" />
					</b-col> -->
				</b-row>
			</div>
				<!-- <b-row v-if="currentContact" class="align-items-center">
					<b-col cols="4">
						<label> Name: </label>
						<div>
							{{ currentContact.firstName }} {{ currentContact.lastName }}
						</div>
						<label> email: </label>
						<br>
						{{ currentContact.email }}
					</b-col>
					<b-col cols="5">
						<br>
						<label> address: </label>
						<br>
						{{ currentContact.address }},
						{{ currentContact.city }}, 
						{{ currentContact.postalCode }}
						<br>
						{{ currentContact.country }}
						<br>
						<b-button class="mb-2" size="sm" variant="danger" @click="clear">Clear</b-button>
					</b-col>
					<b-col colls="3">
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
				</b-row> -->
				<b-row class="align-items-center">
					<b-col cols="4">
						<b-form-datepicker
								v-model="offeringLine.date"
								required
								:date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
								locale="en"
								name="firstDate"
							></b-form-datepicker>
						<div>
							<b-form-group label="First Name">
								<b-form-input
									type="text"
									v-model="offeringLine.firstName"
									placeholder="First Name"
									name="firstName"
								></b-form-input>
							</b-form-group> 
							<b-form-group label="Last Name">
								<b-form-input
									type="text"
									v-model="offeringLine.lastName"
									placeholder="Last Name"
									name="lastName"
								></b-form-input>
							</b-form-group> 
						</div>
						<b-form-group label="Email">
							<b-form-input
								type="text"
								v-model="offeringLine.email"
								placeholder="Email"
								name="email"
							></b-form-input>
						</b-form-group> 
					</b-col>
					<b-col cols="5">
						<b-form-group label="Address">
							<b-form-input
								type="text"
								v-model="offeringLine.address"
								required
								placeholder="Address"
								name="street"
							></b-form-input>
						</b-form-group> 
						<b-form-group label="City">
							<b-form-input
								type="text"
								v-model="offeringLine.city"
								required
								placeholder="City"
								name="city"
							></b-form-input>
						</b-form-group>
						<b-form-group label="Country">
							<b-form-select
								:options="countries"
								v-model="offeringLine.country"
								required
								placeholder="Country"
								name="country"
							></b-form-select>
						</b-form-group> 
						<b-form-group v-if="offeringLine.country == 'Canada' || offeringLine.country == 'United States'" label="State/Province">
							<b-form-select
								:options="offeringLine.country == 'Canada' ? provinces : offeringLine.country == 'United States' ? states : '' "
								v-model="offeringLine.state"
								required
								placeholder="State"
								name="state"
							></b-form-select>
						</b-form-group> 
						<b-form-group label="Postal Code">
							<b-form-input
								type="text"
								v-model="offeringLine.postalCode"
								required
								placeholder="Postal Code"
								name="postalCode"
							></b-form-input>
						</b-form-group> 
					</b-col>
					<b-col colls="3">
						<b-form-group label="amount">
							<b-input-group prepend="$">
								<b-form-input 
									class="text-right"
									type="text" 
									v-model="offeringLine.amount" 
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
							<b-form-select v-model="offeringLine.type">
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

	import { COUNTRIES, STATES, PROVINCES } from "@/constants/statesAndCountries";
	import { OfferingLines } from "../../data/offeringLines"
	export default  {

		name: 'offeringLineModal',

		components: {

		},

		props: {
			offeringLine: Object,
			currentReport: Object,
		},

		mounted() {

		},

		data() {
			return {
				loading: false,
				currentContact: null,
				countries: COUNTRIES.map(c => ({ value: c.name, text: c.name })),
				states: STATES.map(c => ({ value: c.name, text: c.name })),
				provinces: PROVINCES.map(c => ({ value: c.name, text: c.name }))
			}
		},

		methods: {
			selected(item) {
				this.currentContact = item;
			},

			clear() {
				this.currentContact = null;
			},

			save() {
				this.loading = true;
				if (this.currentContact && this.currentContact._id > 0) {
					this.offeringLine.contactId = this.currentContact._id;
				}

				if (this.currentReport.offeringLines && !this.currentReport.offeringLines.includes(this.offeringLine)) {
					this.currentReport.offeringLines.push(this.offeringLine);
				}
				
				this.offeringLine.itinReportId = this.currentReport._id;
				OfferingLines.save(this.offeringLine).then(res => {
					this.$Notification("Success!", "Successfully saved the Offering", "primary")
					this.$refs.offeringLineModal.hide();
					this.loading = false;
				}).catch(e => {
					console.error('eeek ', e);
					this.loading = false;
					throw e;
				});
			}
		},
}

</script>