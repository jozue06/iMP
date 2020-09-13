<template>
	<div class="card-header mt-4">
		<router-link to="/itinerationReports">
			<h3 class="pt-2">Report for {{ $GetMonth(itinReport.month) }} {{ formatDate(itinReport.year) }} </h3>
		</router-link>
		<b-row>
			<b-col>
				<b-form-group label="Month">
					<b-form-select v-model="itinReport.month" :options="monthOptions" @change="formatMonthForSave">
					</b-form-select>
				</b-form-group>
			</b-col>

			<b-col>
				<b-form-group label="Year">
					<YearSelector v-model="itinReport.year" @selected="formatYearForSave" placeHolder="Please Select A Year"/>
				</b-form-group>
			</b-col>
			<b-col>
				<b-form-group class="mr-1" label="date completed">
					<b-form-datepicker
						required
						v-model="itinReport.dateCompleted"
						:date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
						locale="en"
						name="firstDate"
						@change="saveReport"
					></b-form-datepicker>
				</b-form-group> 
			</b-col>
		</b-row>
	</div>	
</template>

<script>
	import { ItinReports } from "../../data/itinReports"
	import { months } from "../../constants/months"
	export default {
		props: {
			itinReport: Object,
		},

		methods: {
			formatMonthForSave(value) {
				this.itinReport.month = value;	
				this.saveReport();
			},

			formatYearForSave(value) {
				this.itinReport.year = value.format('YYYY');
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
				ItinReports.save(this.itinReport).then(res => {
					this.$Notification("Success!", "Successfully Saved the Itineration Report");
					this.loading = false;
				}).catch(e => {
					console.error('eeek ', e);
					this.loading = false;
					throw e;
				});
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

	}
</script>