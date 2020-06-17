<template>
	<section>
		<b-modal top ref="contactTaskModal" title="Task" hide-footer v-bind:taskLine="taskLine" v-bind:currentContact="currentContact">
			<p v-if="taskLine.contactId != ''" class="text-center"> Task for {{ currentContact.firstName }} {{ currentContact.lastName }}</p>
			<div class="justify-content-center">
				<b-row align-h="center">
					<b-col cols="4" class="text-center">
						<b-form-group label="Date">
							<DatePicker
								v-model="selectedDate"
							>
							</DatePicker>
						</b-form-group>
					</b-col>
				</b-row>
				<b-row align-h="center">
					<b-col cols="6" class="text-center">
						<b-form-group label="Task Type">
							<b-form-select v-model="taskLine.type" :options="contactPurposes">
							</b-form-select>
						</b-form-group>
					</b-col>
				</b-row>
				<b-row align-h="center" class="mb-2">
					<b-col cols="10">
						<b-form-textarea
							id="textarea"
							v-model="taskLine.details"
							placeholder="Details..."
							rows="3"
							max-rows="6"
						></b-form-textarea>
					</b-col>
				</b-row>
				<b-button variant="primary" class="float-right m-2" size="sm" :disabled="loading" @click="saveTask">
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

		name: 'contactTaskModal',
		
		components: {
			DatePicker,
			TimePicker,
		},

		props: {
			taskLine: Object,
			currentContact: Object,
		},

		mounted () {

		},

		data () {
			return {
				loading: false,
				selectedDate: "",
			}
		},

		methods: {
			saveTask() {
				this.loading = true;
				this.taskLine.date = this.selectedDate;
				this.taskLine.save().then(savedTask => {
					if (!this.currentContact.taskIds.includes(savedTask._id)) {
						this.currentContact.taskIds.push(savedTask._id);
						this.currentContact.save().then(res => {
							this.$Notification("Success!", "Successfully saved the Task", "Primary");
							this.loading = false;
							return
						}).catch(e => {
							console.log('eek', e);
							throw e;
						});
					}
				}).catch(e => {
					console.log('eeek ', e);
					this.$Notification("Error", `Error Saving Task: ${e}`, "warning", "", 3000);
					this.loading = false;
					throw e;
				});				
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