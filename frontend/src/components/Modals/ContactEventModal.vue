<template>
	<section>
		<b-modal top ref="contactEventModal" title="Event" hide-footer v-bind:eventLine="eventLine" v-bind:currentContact="currentContact">
			<p v-if="eventLine.contactId != ''" class="text-center"> Event for {{ currentContact.firstName }} {{ currentContact.lastName }}</p>			
			<div>
				<b-row class="ml-4 mr-4 justify-content-between">
					<b-col cols="6">
						<b-form-group label="Date">
							<b-form-datepicker
								v-model="eventLine.date"
								required
								:date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
								locale="en"
								name="eventDate"
							></b-form-datepicker>
						</b-form-group>
					</b-col>
					<b-col cols="4">
						<b-form-group label="Time">
							<b-form-timepicker
								v-model="eventLine.time"
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
				<b-row align-h="center">
					<b-col cols="6" class="text-center">
						<b-form-group label="Event Type">
							<b-form-select v-model="eventLine.type" :options="contactPurposes">
							</b-form-select>
						</b-form-group>
					</b-col>
				</b-row>
				<b-row align-h="center" class="mb-2">
					<b-col cols="10">
						<b-form-textarea
							id="textarea"
							v-model="eventLine.details"
							placeholder="Details..."
							rows="3"
							max-rows="6"
						></b-form-textarea>
					</b-col>
				</b-row>

				<b-row class="ml-4 mr-4 justify-content-between" align-v="center">
					<b-col cols="6">
						<b-form-group label="Commitment Amount">
							<b-input-group prepend="$">
								<b-form-input
									class="text-right"
									type="text"
									v-model="eventLine.amountReceived" 
									placeholder="0.00"
									name="amountReceived"
									lazy-formatter
									:formatter="formatMoney"
								></b-form-input>
							</b-input-group>
						</b-form-group>
					</b-col>
					<b-col cols="4" class="mt-4">
						<b-form-checkbox
							class="float-right"
							size="sm"
							id="eventComplete"
							v-model="eventLine.isCompleted"
							name="checkboxforEvent"
							value=true
							unchecked-value=false
							@change="toggleEventComplete"
						>
							<label class="mt-1"> 
								Completed
							</label>
						</b-form-checkbox>
					</b-col>
				</b-row>
					<b-button variant="primary" class="float-right m-2" size="sm" :disabled="loading" @click="saveEvent">
						Save
					<b-spinner v-if="loading" small type="grow"></b-spinner>
				</b-button>
			</div>
		</b-modal>
	</section>
</template>

<script>
	import { contactPurposes } from "../../constants/commsConstants";
	import { Events } from "../../data/events";

	export default  {

		name: 'contactEventModal',
		
		props: {
			eventLine: Object,
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
			saveEvent() {
				this.loading = true;
				this.eventLine.isCompleted = Boolean(this.eventLine.isCompleted);
				console.log('this.currentContact id ? ', this.currentContact);
				
				this.eventLine.contactId = this.currentContact._id;
				Events.save(this.eventLine).then(savedEvent => {
					// if (!this.currentContact.eventIds.includes(savedEvent._id)) {
					// 	this.currentContact.eventIds.push(savedEvent._id);
					// 	this.currentContact.save().then(res => {
					// 		this.loading = false;
					// 		this.$refs.contactEventModal.hide();
					// 		this.$emit("doneSaving");
					// 	}).catch(e => {
					// 		console.log('eek', e);
					// 		throw e;
					// 	});
					// }
					this.$Notification("Success!", "Successfully saved the Event", "primary");
					this.loading = false;
					this.$refs.contactEventModal.hide();
					this.$emit("doneSaving");
				}).catch(e => {
					console.log('eeek', e);
					this.$Notification("Error", `Error Saving Event: ${e}`, "warning", "", 3000);
					this.loading = false;
					throw e;
				});				
			},

			onContext(ctx) {
				this.formattedValue = ctx.formatted
			},

			formatMoney(amount) {
				if (isNaN(Number(amount))) {
					return 0;
				}
				let value = Number(amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
				return Number(value);
			},

			toggleEventComplete(value) {

				if (value == "true") {
					this.eventLine.isCompleted = true;
				} else {
					this.eventLine.isCompleted = false;
				}				
			},
		},

		computed: {
			contactPurposes() {
				return contactPurposes;
			},
		}
	}

</script>