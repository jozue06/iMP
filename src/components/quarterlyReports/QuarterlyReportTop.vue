<template>
	<div class="card-header mt-4">
		<router-link to="/quarterlyReports">
			<h3 class="pt-2">Report for {{ formatQuarterToView(quarterlyReport.quarterNumber) }} - {{ formatDate(quarterlyReport.selectedYear) }} </h3>
		</router-link>
		<b-row>
			<b-col>
				<b-form-group label="Quarter">
					<b-form-select v-model="quarterlyReport.quarterNumber" :options="quarterOptions" @change="formatQuarterForSave">
					</b-form-select>
				</b-form-group>
			</b-col>

			<b-col>
				<b-form-group label="Year">
					<YearSelector v-model="quarterlyReport.year" @selected="formatYearForSave" placeHolder="Please Select A Year"/>
				</b-form-group>
			</b-col>
			<b-col>
				<b-form-group class="mr-1" label="date completed">
					<b-form-datepicker
						required
						v-model="quarterlyReport.dateCompleted"
						:date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
						locale="en"
						name="firstDate"
					></b-form-datepicker>
				</b-form-group> 
			</b-col>

			<b-col cols="4">
				<b-form-group label="Base Amount">
					<b-input-group prepend="$">
						<b-form-input
							class="text-right"
							type="text" 
							v-model="quarterlyReport.baseAmount" 
							required
							placeholder="0.00"
							name="baseAmount"
							lazy-formatter
							:formatter="formatMoney"
						></b-form-input>
						<b-input-group-append>
							<b-button variant="outline-secondary" :disabled="true">get funds</b-button>
						</b-input-group-append>
					</b-input-group>
				</b-form-group>
			</b-col>
		</b-row>
	</div>	
</template>

<script>
	import { DatePicker } from 'ant-design-vue';
	export default {
		props: {
			quarterlyReport: Object,
		},

		methods: {
			formatQuarterForSave(value) {
				this.quarterlyReport.quarterNumber = value;	
				this.saveReport();
			},

			formatYearForSave(value) {
				this.quarterlyReport.year = value.format('YYYY');
			},

			formatMoney(amount) {
				if (isNaN(Number(amount))) {
					return 0;
				}
				let value = Number(amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
				return Number(value);
			},

			formatDate(dateTimeObject) {
				return this.$Moment(dateTimeObject).format('YYYY');
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
				this.quarterlyReport.save().then(res => {
					this.$Notification("Success!", "Successfully Saved the Quarterly Report");
					this.loading = false;
				}).catch(e => {
					console.log('eeek ', e);
					this.loading = false;
					throw e;
				});
			},
		},
		
		data() {
			return {
				quarterOptions: [
					{ value: null, text: 'Please Select a Quarter' },
					{ value: 1, text: 'First Quarter' },
					{ value: 2, text: 'Second Quarter' },
					{ value: 3, text: 'Third Quarter' },
					{ value: 4, text: 'Fourth Quarter' },
					
				],
				selectedQuarterOption: null,
				selectedYear: this.$Moment(this.$Moment.now()).format("YYYY"),
				loading: false
			};
		},

	}
</script>