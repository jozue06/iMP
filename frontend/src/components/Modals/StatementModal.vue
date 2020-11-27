<template>
	<section>		
		<b-modal top ref="statementModal" title="Statements" hide-footer v-bind:currentReport="currentReport">	
			<div v-if="currentReport.statement">
				<h5>first qtr</h5>
				<b-row class="ml-4 mr-4 justify-content-between">
					<b-col cols="12">
						<b-form-group label="Statement Date">
							<b-form-datepicker
								v-model="currentReport.statement.dateOne"
								required
								:date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
								locale="en"
								name="dateOne"
							></b-form-datepicker>
						</b-form-group>
					</b-col>
				</b-row>
				<b-row class="ml-4 mr-4 justify-content-between" align-v="center">
					<b-col cols="6">
						<b-form-group label="Income Amount">
							<b-input-group prepend="$">
								<b-form-input
									class="text-right"
									type="text"
									v-model="currentReport.statement.amountOne" 
									placeholder="0.00"
									name="amountOne"
									lazy-formatter
									:formatter="$formatMoney"
								></b-form-input>
							</b-input-group>
						</b-form-group>
					</b-col>
					<b-col cols="6">
						<b-form-group label="Reimbursement Amount">
							<b-input-group prepend="$">
								<b-form-input
									class="text-right"
									type="text"
									v-model="currentReport.statement.reimbursementOne" 
									placeholder="0.00"
									name="reimbursementOne"
									lazy-formatter
									:formatter="$formatMoney"
								></b-form-input>
							</b-input-group>
						</b-form-group>
					</b-col>
				</b-row>
			</div>

			<div v-if="currentReport.statement">
				<h5>second qtr</h5>
				<b-row class="ml-4 mr-4 justify-content-between">
					<b-col cols="12">
						<b-form-group label="Statement Date">
							<b-form-datepicker
								v-model="currentReport.statement.dateTwo"
								required
								:date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
								locale="en"
								name="dateTwo"
							></b-form-datepicker>
						</b-form-group>
					</b-col>
				</b-row>
				<b-row class="ml-4 mr-4 justify-content-between" align-v="center">
					<b-col cols="6">
						<b-form-group label="Income Amount">
							<b-input-group prepend="$">
								<b-form-input
									class="text-right"
									type="text"
									v-model="currentReport.statement.amountTwo" 
									placeholder="0.00"
									name="amountTwo"
									lazy-formatter
									:formatter="$formatMoney"
								></b-form-input>
							</b-input-group>
						</b-form-group>
					</b-col>
					<b-col cols="6">
						<b-form-group label="Reimbursement Amount">
							<b-input-group prepend="$">
								<b-form-input
									class="text-right"
									type="text"
									v-model="currentReport.statement.reimbursementTwo" 
									placeholder="0.00"
									name="reimbursementTwo"
									lazy-formatter
									:formatter="$formatMoney"
								></b-form-input>
							</b-input-group>
						</b-form-group>
					</b-col>
				</b-row>
			</div>
			<div v-if="currentReport.statement">
				<h5>third qtr</h5>
				<b-row class="ml-4 mr-4 justify-content-between">
					<b-col cols="12">
						<b-form-group label="Statement Date">
							<b-form-datepicker
								v-model="currentReport.statement.dateThree"
								required
								:date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
								locale="en"
								name="dateThree"
							></b-form-datepicker>
						</b-form-group>
					</b-col>
				</b-row>
				<b-row class="ml-4 mr-4 justify-content-between" align-v="center">
					<b-col cols="6">
						<b-form-group label="Income Amount">
							<b-input-group prepend="$">
								<b-form-input
									class="text-right"
									type="text"
									v-model="currentReport.statement.amountThree" 
									placeholder="0.00"
									name="amountThree"
									lazy-formatter
									:formatter="$formatMoney"
								></b-form-input>
							</b-input-group>
						</b-form-group>
					</b-col>
					<b-col cols="6">
						<b-form-group label="Reimbursement Amount">
							<b-input-group prepend="$">
								<b-form-input
									class="text-right"
									type="text"
									v-model="currentReport.statement.reimbursementThree" 
									placeholder="0.00"
									name="reimbursementThree"
									lazy-formatter
									:formatter="$formatMoney"
								></b-form-input>
							</b-input-group>
						</b-form-group>
					</b-col>
					<b-col cols='8'>						
						Reimbursement Total: {{statementReimbursementTotal}}
					</b-col>
				</b-row>
			</div>

			<b-button variant="primary" class="float-right m-2" size="sm" :disabled="loading" @click="saveStatement">
				Save
				<b-spinner v-if="loading" small type="grow"></b-spinner>
			</b-button>
		</b-modal>	
	</section>
</template>

<script>
	import { Statements } from "../../data/statements";
	export default  {
		name: 'statementModal',

		props: {
			currentReport: Object,
			statementReimbursementTotal: String,
			reportType: Number,
		},

		mounted() {			
		},

		data() {
			return {
				loading: false,
			}
		},

		methods: {
			saveStatement() {
				if (this.reportType == 0) {
					this.currentReport.statement.qtrReportId = this.currentReport._id;
				}

				if (this.reportType == 1) {
					this.currentReport.statement.itinReportId = this.currentReport._id;
				}  

				if (this.reportType == 2) {
					this.currentReport.statement.maReportId = this.currentReport._id;
				}

				if (this.reportType == 3) {
					this.currentReport.statement.sdrReportId = this.currentReport._id;
				}

				if (this.reportType == 4) {
					this.currentReport.statement.institutionalReportId = this.currentReport._id;
				}

				this.currentReport.statement.reportType = this.reportType;				
				this.loading = true;
				
				Statements.save(this.currentReport.statement).then(res => {
					this.$refs.statementModal.hide();
					this.$Notification("Success!", "Successfully Added the Statement", "primary");
					this.loading = false;
					this.$emit("refresh", res);
				}).catch(e => {
					console.error('eeek ', e);
					this.$Notification("Error", `Error Saving Mileage Log: ${e.message}`, "warning", "", 6000);
					this.loading = false;
					throw e;
				});
			},
		},
	}
</script>