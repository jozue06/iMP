<template>
	<div class="card-header mt-4">
		<router-link :to=linkTo>
			<h3 class="pt-2">Report for {{ $GetMonth(currentReport.month) }} {{ formatDate(currentReport.year) }} </h3>
		</router-link>
		<b-row>
			<b-col>
				<b-form-group label="Month">
					<b-form-select v-model="currentReport.month" :options="monthOptions" @change="formatMonthForSave">
					</b-form-select>
				</b-form-group>
			</b-col>

			<b-col>
				<b-form-group label="Year">
					<YearSelector v-model="currentReport.year" @selected="formatYearForSave" placeHolder="Please Select A Year"/>
				</b-form-group>
			</b-col>
			<b-col>
				<b-form-group class="mr-1" label="Date Completed">
					<b-form-datepicker
						required
						v-model="currentReport.dateCompleted"
						:date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
						locale="en"
						name="dateCompleted"
						@change="saveReport"
					></b-form-datepicker>
				</b-form-group> 
			</b-col>
		</b-row>
	</div>	
</template>

<script>
	import { ItinReports } from "../../data/itinReports";
	import { MAReports } from "../../data/maReports";
	import { months } from "../../constants/months";

	export default {
		props: {
			currentReport: Object,
			linkTo: String,
			reportType: Number,
		},

		methods: {
			formatMonthForSave(value) {
				this.currentReport.month = value;	
				this.saveReport();
			},

			formatYearForSave(value) {
				this.currentReport.year = value.format('YYYY');
				this.saveReport();
			},

			formatMoney(amount) {
				if (isNaN(Number(amount))) {
					return 0;
				}
				let value = Number(amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
				this.saveReport();
				return Number(value);
			},

			formatDate(dateTimeObject) {
				return this.$Moment(dateTimeObject).format('YYYY');
				this.saveReport();
			},

			formatQuarterToView(quarterNumber) {
				switch (quarterNumber) {
					case 1: 
						return "1st Quarter";
					case 2: 
						return "2nd Quarter";
					case 3: 
						return "3rd Quarter";
					case 4: 
						return "4th Quarter";
					default: "No Quarter Selected";
				}
			},

			saveReport() {				
				this.loading = true;
				if (this.reportType === 1) {
					ItinReports.save(this.currentReport).then(res => {
						this.$Notification("Success!", `Successfully Saved the ${this.reportName} Report`);
						this.loading = false;
					}).catch(e => {
						console.error('eeek ', e);
						this.loading = false;
						throw e;
					});
				}

				if (this.reportType === 2) {
					MAReports.save(this.currentReport).then(res => {
						this.$Notification("Success!", `Successfully Saved the ${this.reportName} Report`);
						this.loading = false;
					}).catch(e => {
						console.error('eeek ', e);
						this.loading = false;
						throw e;
					});
				}
			},
		},
		
		data() {
			return {
				monthOptions: months,
				selectedQuarterOption: null,
				selectedYear: this.$Moment(this.$Moment.now()).format("YYYY"),
				loading: false
			};
		},

		computed: {
			reportName() {
				return this.reportType === 1 ? "Itineration " : "MA "
			}
		}

	}
</script>