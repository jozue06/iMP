<template>
	<section>
		<b-modal top ref="mileageLogModal" title="Mileage Component" hide-footer v-bind:currentReport="currentReport" v-bind:mileageLog="mileageLog">		
			<div class="mx-2">
				<b-row>
					<b-col cols="6">
						<b-form-group label="Date">
							<b-form-datepicker
								v-model="mileageLog.date"
								:date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
								locale="en"
								name="mileageLogDate"
							></b-form-datepicker>
						</b-form-group>
					</b-col>
					<b-col cols="6">
						<b-form-group label="Vehicle">
							<b-form-input
								type="text"
								v-model="mileageLog.vehicle"
								placeholder="Vehicle"
								name="vehicle"
							></b-form-input>
						</b-form-group>
					</b-col>
				</b-row>
				<b-row>
					<b-col cols="6">
						<b-form-group label="Od Start">
							<b-form-input
								type="number"
								v-model="mileageLog.odometerStart"
								placeholder="Od Start"
								name="OdStart"
								lazy-formatter
								:formatter="formatToNumber"
							></b-form-input>
						</b-form-group>
					</b-col>
					<b-col cols="6">
						<b-form-group label="Od end">
							<b-form-input
								type="number"
								v-model="mileageLog.odometerEnd"
								placeholder="Od end"
								name="OdEnd"
								lazy-formatter
								:formatter="formatToNumber"
							></b-form-input>
						</b-form-group>
					</b-col>
				</b-row>
				<b-row>
					<b-col cols="6">
						<b-form-group label="Type">
							<b-form-input
								type="text"
								v-model="mileageLog.type"
								placeholder="Type"
								name="type"
							></b-form-input>
						</b-form-group>
					</b-col>
					<b-col cols="6">
						<b-form-group label="Description">
							<b-form-input
								type="text"
								v-model="mileageLog.description"
								placeholder="Description"
								name="description"
							></b-form-input>
						</b-form-group>
					</b-col>
				</b-row>
				<b-button variant="primary" class="float-right m-2" size="sm" :disabled="loading" @click="saveMilageLog">
					Save
					<b-spinner v-if="loading" small type="grow"></b-spinner>
				</b-button>
			</div>		
		</b-modal>
	</section>
</template>

<script>
	import { QuarterlyReports } from "../../data/quarterlyReports";

	export default  {

		name: 'mileageLogModal',

		props: {
			mileageLog: Object,
			currentReport: Object
		},

		mounted() {

		},

		data() {
			return {
				loading: false,
			}
		},

		methods: {
			saveMilageLog() {
				this.loading = true;
				if (!this.currentReport.mileageLogs.includes(this.mileageLog)) {
					this.currentReport.mileageLogs.push(this.mileageLog);
				}

				QuarterlyReports.save(this.currentReport).then(res => {
					this.$refs.mileageLogModal.hide();
					this.$Notification("Success!", "Successfully Added the Mileage Log", "primary");
					this.loading = false;
				}).catch(e => {
					console.log('eeek ', e);
					this.$Notification("Error", `Error Saving Mileage Log: ${e}`, "warning", "", 3000);
					this.loading = false;
					throw e;
				});
			},

			formatToNumber(string) {
				return Number(string);
			},
		},

		computed: {

		}
}

</script>