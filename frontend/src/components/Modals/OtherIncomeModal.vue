<template>
	<section>
		<b-modal top ref="otherIncomeModal" title="Other Income" hide-footer v-bind:otherIncomeLine="otherIncomeLine" v-bind:currentReport="currentReport">
			<p></p>
			<div>
				<b-row>
					<b-col cols="6">
						<ContactSearchComponent @rowClicked="selected" />
					</b-col>
				</b-row>
			</div>
				<b-row v-if="currentContact" class="align-items-center">
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
				</b-row>
				<b-button class="mb-2" size="sm" variant="primary" @click="save">Save</b-button>
		</b-modal>
	</section>
</template>

<script>
	import ContactSearchComponent from "../ContactSearchComponent";
	// import { QuarterlyReport as Report } from "../../data/models/quarterlyReportModel";
	import setContactInfo from "../../mixins/setContactInfo";
	export default  {

		name: 'otherIncomeModal',

		components: {
			ContactSearchComponent
		},

		props: {
			otherIncomeLine: Object,
			currentReport: Object,
		},

		mounted() {

		},

		data() {
			return {
				currentContact: "",
			}
		},

		methods: {
			selected(item) {
				this.currentContact = item;
			},

			clear() {
				this.currentContact = "";
			},

			save() {
				if (this.currentContact._id > 0) {
					this.otherIncomeLine.contactId = this.currentContact._id;
				}

				setContactInfo(this.otherIncomeLine, this.currentContact);

				if (!this.currentReport.otherIncomeLines.includes(this.otherIncomeLine)) {
					this.currentReport.otherIncomeLines.push(this.otherIncomeLine);
					this.currentReport.save().then(res => {
						this.$refs.otherIncomeModal.hide();
						this.$Notification("Sucess!", "Successfully saved the Other Income", "primary")
					}).catch(e => {
						console.log('eeek ', e);
						throw e;
					});
				} else {
					// Report.findOneAndUpdate({ _id: this.otherIncomeLine._id }, { otherIncomeLines: this.otherIncomeLine }).then(res => {
					// 	this.$refs.otherIncomeModal.hide();
					// 	this.$Notification("Sucess!", "Successfully saved the Other Income", "primary")
					// }).catch(e => {
					// 	console.log('eek ', e);
					// 	throw e;
					// })
				}
			}
				
		},

		computed: {

		}
}

</script>