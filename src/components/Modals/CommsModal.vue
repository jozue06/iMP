<template>
	<section>
		<b-modal top ref="commsModal" title="Communication" hide-footer v-bind:commsLine="commsLine" v-bind:currentContact="currentContact">
			<p v-if="commsLine.contactPersonName != ''" class="text-center"> Communications with {{ commsLine.contactPersonName }}</p>
			<div>
				<b-row>
					<b-col cols="6">
						<b-form-group label="Date">
							<DatePicker
								v-model="commsLine.date"
							>
							</DatePicker>
						</b-form-group>
					</b-col>
					<b-col cols="6">
						<b-form-group label="Time">
							<TimePicker
								use12-hours format="h:mm A"
								:minute-step="15"
								v-model="commsLine.time"
							>
							</TimePicker>
						</b-form-group>
					</b-col>
				</b-row>
				<b-row >
					<b-col cols="6">
						<b-form-group label="Contact Type">
							<b-form-select v-model="commsLine.contactPersonType" :options="contactTypes">
							</b-form-select>
						</b-form-group>
					</b-col>
					<b-col cols="6">
						<b-form-group label="Contact Name">
							<b-form-input
								type="text"
								v-model="commsLine.contactPersonName"
								placeholder="Name"
								name="contactName"
							></b-form-input>
						</b-form-group>
					</b-col>
				</b-row>
				<b-row>
					<b-col cols="6">
						<b-form-group label="Contact Via:">
							<b-form-input
								type="text"
								v-model="commsLine.contactVia"
								placeholder="Mode of contact"
								name="contactVia"
							></b-form-input>
						</b-form-group>
					</b-col>
					<b-col cols="6">
						<b-form-group label="Contact Purpose">
							<b-form-select v-model="commsLine.purpose" :options="contactPurposes">
							</b-form-select>
						</b-form-group>
					</b-col>
				</b-row>
				<b-row align-h="center" class="mb-2">
					<b-col cols="10">
						<b-form-textarea
							id="textarea"
							v-model="commsLine.notes"
							placeholder="Notes..."
							rows="3"
							max-rows="6"
						></b-form-textarea>
					</b-col>
				</b-row>
				<b-row align-h="center">
					<b-col cols="10">
						<b-form-textarea
							id="textarea"
							v-model="commsLine.response"
							placeholder="Response..."
							rows="3"
							max-rows="6"
						></b-form-textarea>
					</b-col>
				</b-row>
			<b-button variant="primary" class="float-right m-2" size="sm" :disabled="loading" @click="saveComm">
				Save
				<b-spinner v-if="loading" small type="grow"></b-spinner>
			</b-button>
			</div>
		</b-modal>
	</section>
</template>

<script>
	import { DatePicker, TimePicker } from 'ant-design-vue';
	import { contactTypes, contactPurposes } from "../../constants/commsConstants";
	import { Contact } from "../../data/models/contactModel";

	export default  {

		name: 'commsModal',
		
		components: {
			DatePicker,
			TimePicker,
		},

		props: {
			commsLine: Object,
			currentContact: Object,
		},

		mounted () {

		},

		data () {
			return {
				loading: false,
			}
		},

		methods: {
			saveComm() {
				this.loading = true;
				if (!this.currentContact.communications.includes(this.commsLine)) {
					this.currentContact.communications.push(this.commsLine);
					this.currentContact.save().then(res => {
						this.$refs.commsModal.hide();
						this.loading = false;
					}).catch(e => {
						console.log('eeek ', e);
						this.$Notification("Error", `Error Saving Communication: ${e}`, "warning", "", 3000);
						this.loading = false;
						throw e;
					});
				} else {
					Contact.findOneAndUpdate( { _id: this.commsLine._id }, {communications: this.commsLine}).then(res => {
					this.$refs.commsModal.hide();
					this.loading = false;
					}).catch(e => {
						console.log('eeek ', e);
						this.$Notification("Error", `Error Saving Communication: ${e}`, "warning", "", 3000);
						this.loading = false;
						throw e;
					});
				}
			}

		},

		computed: {
			contactTypes() {
				return contactTypes;
			},

			contactPurposes() {
				return contactPurposes;
			}
		}
}

</script>

<style lang="scss" scoped>
</style>