<template>
	<section>		
		<b-modal v-if="currentReport && currentReport.statement" top ref="statementModal" title="Statements" hide-footer v-bind:currentReport="currentReport">	
			<div>
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

			<div>
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
			<div>
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

		<b-modal v-if="statement" top ref="statementModal" title="Statements" hide-footer>	
			<div>
				<b-row class="ml-4 mr-4 justify-content-between">
					<b-col cols="12">
						<b-form-group label="Statement Date">
							<b-form-datepicker
								v-model="statement.date"
								required
								:date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
								locale="en"
								name="date"
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
									v-model="statement.amount" 
									placeholder="0.00"
									name="amount"
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
									v-model="statement.reimbursementAmount" 
									placeholder="0.00"
									name="reimbursementAmount"
									lazy-formatter
									:formatter="$formatMoney"
								></b-form-input>
							</b-input-group>
						</b-form-group>
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
			statement: Object,
			currentReport: Object,
			statementReimbursementTotal: String,
			reportType: Number,
		},

		created() {			
			// if (!this.statement) {
			// 	this.currentReport.statement = {}
			// } else if (this.currentReport) {
			// 	this.currentReport.statement = this.statement;
			// }
		},

		data() {
			return {
				loading: false,
			}
		},

		methods: {
			saveStatement() {
				if (this.currentReport) {
					if (this.reportType == 0) {
						this.statement.qtrReportId = this.currentReport._id;
					}

					if (this.reportType == 1) {
						this.statement.itinReportId = this.currentReport._id;
					}  

					if (this.reportType == 2) {
						this.statement.maReportId = this.currentReport._id;
					}

					if (this.reportType == 3) {
						this.statement.sdrReportId = this.currentReport._id;
					}

					if (this.reportType == 4) {
						this.statement.institutionalReportId = this.currentReport._id;
					}

					this.statement.reportType = this.reportType;
				}

				Statements.save(this.statement).then(res => {
					this.$refs.statementModal.hide();
					this.loading = false;
					this.$Notification("Success!", "Successfully Added the Statement", "primary");
					this.$emit("refresh", res);
				}).catch(e => {
					console.error('eeek ', e);
					this.$Notification("Error", `Error Saving Statement Log: ${e.message}`, "warning", "", 6000);
					this.loading = false;
					throw e;
				});
			},
		},
	}
</script>