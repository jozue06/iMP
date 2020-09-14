<template>
	<section>
		<b-modal 
			top 
			ref="offeringLineModal" 
			size="xl" 
			title="Offering Receipt" 
			hide-footer 
			v-bind:offeringLine="offeringLine" 
			v-bind:currentReport="currentReport"
		>
			<b-row class="mb-4">
				<!-- <b-col cols="6">
					<ContactSearchComponent @rowClicked="selected" />
				</b-col> -->
				<b-col cols="6" class="text-center">
					<label>Date</label>
					<b-form-datepicker
						v-model="offeringLine.date"
						required
						:date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
						locale="en"
						name="firstDate"
					></b-form-datepicker>
				</b-col>	
				<b-col cols="6" class="text-center">
					<label>Offering Type</label>
					<b-form-select v-model="offeringLine.type">
						<option value=0>Receipt</option>
						<option value=1>Director Diposit</option>
					</b-form-select>
				</b-col>
			</b-row>
			<b-row class="text-center mx-4 mb-2 justify-content-around" style="border-bottom: solid 1px #ced4da;">
				<b-col cols="4">
					<p> Cash </p>
					<label> Work Support (00) </label>
					<b-input-group prepend="$">
						<b-form-input 
							class="text-right"
							type="text" 
							v-model="offeringLine.workSupportAmt" 
							placeholder="0.00"
							name="workSupportAmt"
							lazy-formatter
							:formatter="$formatMoney"
						>
						</b-form-input>
					</b-input-group>
					<label> Special / Christmas (09) </label>
					<b-input-group prepend="$">
						<b-form-input 
							class="text-right"
							type="text" 
							v-model="offeringLine.specialAmt" 
							placeholder="0.00"
							name="specialAmt"
							lazy-formatter
							:formatter="$formatMoney"
						>
						</b-form-input>
					</b-input-group>
					<label> Other Cash </label>
					<b-input-group prepend="$">
						<b-form-input 
							class="text-right"
							type="text" 
							v-model="offeringLine.otherAmt" 
							placeholder="0.00"
							name="otherAmt"
							lazy-formatter
							:formatter="$formatMoney"
						>
						</b-form-input>
					</b-input-group>
				</b-col>
				<b-col cols="4" class="mb-4">
					<p> Non-Cash </p>
					<label>Hospitality Provided</label>
					<b-input-group prepend="$">
						<b-form-input 
							class="text-right"
							type="text" 
							v-model="offeringLine.hospitality" 
							placeholder="0.00"
							name="hospitality"
							lazy-formatter
							:formatter="$formatMoney"
						>
						</b-form-input>
					</b-input-group>
					<label> Equipment Received </label>
					<b-input-group prepend="$">
						<b-form-input 
							class="text-right"
							type="text" 
							v-model="offeringLine.equipment" 
							placeholder="0.00"
							name="equipment"
							lazy-formatter
							:formatter="$formatMoney"
						>
						</b-form-input>
					</b-input-group>
					<label> Other Non-Cash </label>
					<b-input-group prepend="$">
						<b-form-input 
							class="text-right"
							type="text" 
							v-model="offeringLine.otherNonCash" 
							placeholder="0.00"
							name="otherNonCash"
							lazy-formatter
							:formatter="$formatMoney"
						>
						</b-form-input>
					</b-input-group>
				</b-col>
			</b-row>
			<b-row class="justify-content-around">
				<b-col cols="6" class="text-center m-4">
					<label>Contact Type</label>
					<b-form-select v-model="offeringLine.contactType">
						<option value=0>Personal</option>
						<option value=1>Church / Orginization</option>
					</b-form-select>
				</b-col>
			</b-row>
			<b-row class="align-items-center">
				<b-col cols="4">
					<div v-if="offeringLine.contactType == 0">
						<b-form-group label="First Name">
							<b-form-input
								type="text"
								v-model="currentContact.firstName"
								placeholder="First Name"
								name="firstName"
							></b-form-input>
						</b-form-group> 
						<b-form-group label="Last Name">
							<b-form-input
								type="text"
								v-model="currentContact.lastName"
								placeholder="Last Name"
								name="lastName"
							></b-form-input>
						</b-form-group> 
					</div>
					<div v-else-if="offeringLine.contactType == 1">
						<b-form-group label="Church / Organization Name">
							<b-form-input
								type="text"
								v-model="currentContact.orgName"
								placeholder="Org Name"
								name="orgName"
							></b-form-input>
						</b-form-group> 
					</div>
				</b-col>
				<b-col cols="5">
					<b-form-group label="Address">
						<b-form-input
							type="text"
							v-model="currentContact.address"
							placeholder="Address"
							name="street"
						></b-form-input>
					</b-form-group> 
					<b-form-group label="City">
						<b-form-input
							type="text"
							v-model="currentContact.city"
							placeholder="City"
							name="city"
						></b-form-input>
					</b-form-group>
					<b-form-group label="Country">
						<b-form-select
							:options="countries"
							v-model="currentContact.country"
							placeholder="Country"
							name="country"
						></b-form-select>
					</b-form-group> 
					<b-form-group v-if="currentContact.country == 'Canada' || currentContact.country == 'United States'" label="State/Province">
						<b-form-select
							:options="currentContact.country == 'Canada' ? provinces : currentContact.country == 'United States' ? states : '' "
							v-model="currentContact.state"
							placeholder="State"
							name="state"
						></b-form-select>
					</b-form-group> 
					<b-form-group label="Postal Code">
						<b-form-input
							type="text"
							v-model="currentContact.postalCode"
							placeholder="Postal Code"
							name="postalCode"
						></b-form-input>
					</b-form-group> 
					<DistrictSelector v-bind:currentContact="currentContact"/>
				</b-col>
			</b-row>
			<b-button class="mb-2 float-right" size="sm" variant="primary" @click="save">Save</b-button>
		</b-modal>
	</section>
</template>

<script>
	import { COUNTRIES, STATES, PROVINCES } from "@/constants/statesAndCountries";
	import { OfferingLines } from "../../data/offeringLines"
	import DistrictSelector from '../DistrictSelector'
	export default  {

		name: 'offeringLineModal',

		components: {
			DistrictSelector
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
				currentContact: {},
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