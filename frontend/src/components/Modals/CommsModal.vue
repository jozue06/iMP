<template>
	<section>
		<b-modal top ref="commsModal" title="Communication" hide-footer v-bind:commsLine="commsLine" v-bind:currentContact="currentContact">
			<p v-if="commsLine.contactPersonName != ''" class="text-center"> Communications with {{ commsLine.contactPersonName }}</p>
			<div>
				<b-row>
					<b-col cols="6">
						<b-form-group label="Date">
							<b-form-datepicker
								v-model="commsLine.date"
								required
								:date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
								locale="en"
								name="firstDate"
							></b-form-datepicker>
						</b-form-group>
					</b-col>
					<b-col cols="6">
						<b-form-group label="Time">
							<b-form-timepicker
								v-model="commsLine.time"
								button-only
								right
								:hour12="true"
								hourCycle='h12'
								locale="en"
								aria-controls="example-input"
								@context="onContext"
							></b-form-timepicker>
								{{ formattedValue }}
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
	import { contactTypes, contactPurposes } from "../../constants/commsConstants";
	import { Comms } from "../../data/communications";

	export default  {

		name: 'commsModal',
		
		props: {
			commsLine: Object,
			currentContact: Object,
		},

		mounted () {

		},

		data () {
			return {
				loading: false,
				formattedValue: "",
			}
		},

		methods: {
			saveComm() {
				this.loading = true;

				this.commsLine.contactId = this.currentContact._id;
				Comms.save(this.commsLine).then(res => {
					this.$Notification("Success!", "Successfully saved the Communication", "primary");
					this.$refs.commsModal.hide();
					this.loading = false;
					this.$emit("doneSaving");
				}).catch(e => {
					console.error('eeek ', e);
					this.$Notification("Error", `Error Saving Communication: ${e.message}`, "warning", "", 6000);
					this.loading = false;
					throw e;
				});
			
			},
			
			onContext(ctx) {
				this.formattedValue = ctx.formatted
			}
		},

		computed: {
			contactTypes() {
				return contactTypes;
			},

			contactPurposes() {
				return contactPurposes;
			},
		}
	}

</script>