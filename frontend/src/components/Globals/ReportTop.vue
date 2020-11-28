<template>
	<div class="card-header mt-4">
		<router-link :to=linkTo>
			<h3 v-if="reportType != 3" class="pt-2">Report for {{ $GetMonth(currentReport.month) }} {{ formatDate(currentReport.year) }} </h3>
			<h3 v-if="reportType == 3 && currentReport.sdrDate" class="pt-2">Report for {{ currentReport.sdrDate }} </h3>
		</router-link>
		<b-row>
			<b-col v-if="reportType != 3">
				<b-form-group label="Month">
					<b-form-select v-model="currentReport.month" :options="monthOptions" @change="formatMonthForSave">
					</b-form-select>
				</b-form-group>
			</b-col>

			<b-col v-if="reportType != 3">
				<b-form-group label="Year">
					<YearSelector v-model="currentReport.year" @selected="formatYearForSave" placeHolder="Please Select A Year"/>
				</b-form-group>
			</b-col>

			<!-- <b-col v-if="reportType === 3">
				<b-form-group label="Import Btn">
					Import
				</b-form-group>
			</b-col> -->

			<b-col cols="4" v-if="reportType === 3">
				<b-form-group label="Foreign or US based SDR?">
					<b-form-select 
						@change="saveReport"
						v-model="currentReport.reportLocationType"
					>
						<option value=0>US</option>
						<option value=1>Foreign</option>
					</b-form-select>
				</b-form-group>
			</b-col>

			<b-col cols="2">
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

			<b-col v-if="reportType === 4" cols="4">
				<b-form-group label="Beginning work funds Amount">
					<b-input-group prepend="$">
						<b-form-input
							class="text-right"
							type="text" 
							v-model="currentReport.beginningAmount" 
							required
							placeholder="0.00"
							name="beginningAmount"
							@blur="saveReport"
						></b-form-input>
						<b-input-group-append>
							<b-button variant="outline-secondary" :disabled="true">Get Previous Funds</b-button>
						</b-input-group-append>
					</b-input-group>
				</b-form-group>
			</b-col>
		</b-row>
	</div>	
</template>

<script>
	import { ItinReports } from "../../data/itinReports";
	import { MAReports } from "../../data/maReports";
	import { SDRReports } from "../../data/sdrReports";
	import { InstitutionalReports } from "../../data/institutionalReports";
	import { months } from "../../constants/months";

	export default {
		props: {
			report: Object,
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
				this.$emit("saveReport");
			},
		},
		
		data() {
			return {
				monthOptions: months,
				selectedQuarterOption: null,
				selectedYear: this.$Moment(this.$Moment.now()).format("YYYY"),
				loading: false,
				currentReport: this.report,
			};
		},

		computed: {
			reportName() {
				let name = "";
				if (this.reportType === 1) {
					name = "Itineration ";
				}
				if (this.reportType === 2) {
					name = "MA ";
				} 
				if (this.reportType === 3) {
					name = "SDR ";
				} 
				return name;
			}
		}

	}
</script>