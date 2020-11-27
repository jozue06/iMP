<template>
	<section>
		<b-modal top ref="contactTaskModal" title="Task" hide-footer v-bind:taskLine="taskLine" v-bind:currentContact="currentContact">
			<p v-if="taskLine.contactId != ''" class="text-center"> Task for {{ currentContact.firstName }} {{ currentContact.lastName }}</p>			
			<div class="justify-content-center">
				<b-row align-h="center">
					<b-col cols="4" class="text-center">
						<b-form-group label="Date">
							<b-form-datepicker
								v-model="taskLine.date"
								required
								:date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
								locale="en"
								name="firstDate"
							></b-form-datepicker>
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
				<b-row class="ml-4 mr-4 justify-content-start" align-v="center">
					<b-col cols="4" class="mt-4">
						Completed
					</b-col>	
					<b-col cols="2" class="mt-4">
						<span @click="toggleTaskComplete(taskLine)">
							<b-icon class="h4" v-if='taskLine.completed === true' icon="check-circle" variant="info"></b-icon>
							<b-icon class="h4" v-else icon="circle" variant="danger"></b-icon>
						</span>
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
	import { contactPurposes } from "../../constants/commsConstants";
	import { Tasks } from "../../data/tasks";

	export default  {

		name: 'contactTaskModal',
		
		props: {
			taskLine: Object,
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
			saveTask() {
				this.loading = true;
				this.taskLine.contactId = this.currentContact._id;
				Tasks.save(this.taskLine).then(savedTask => {
					this.$Notification("Success!", "Successfully saved the Task", "primary");
					this.$refs.contactTaskModal.hide();
					this.loading = false;
					this.$emit("doneSaving");
				}).catch(e => {
					console.error('eeek ', e);
					this.$Notification("Error", `Error Saving Task: ${e.message}`, "warning", "", 6000);
					this.loading = false;
					throw e;
				});
			},

			toggleTaskComplete(taskLine) {
				this.taskLine.completed = !taskLine.completed;
			}
		},

		computed: {
			contactPurposes() {
				return contactPurposes;
			},
		}
	}

</script>