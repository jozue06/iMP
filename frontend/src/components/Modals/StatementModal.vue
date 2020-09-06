<template>
	<section>
		<b-modal top ref="statementModal" title="Statements" hide-footer v-bind:currentReport="currentReport"  v-bind:statement="statement">
			<div>
				<h5>first qtr</h5>
				<b-row class="ml-4 mr-4 justify-content-between">
					<b-col cols="12">
						<b-form-group label="Statement Date">
							<b-form-datepicker
								v-model="statement.dateOne"
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
									v-model="statement.amountOne" 
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
									v-model="statement.reimbursementOne" 
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
								v-model="statement.dateTwo"
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
									v-model="statement.amountTwo" 
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
									v-model="statement.reimbursementTwo" 
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
								v-model="statement.dateThree"
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
									v-model="statement.amountThree" 
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
									v-model="statement.reimbursementThree" 
									placeholder="0.00"
									name="reimbursementThree"
									lazy-formatter
									:formatter="$formatMoney"
								></b-form-input>
							</b-input-group>
						</b-form-group>
					</b-col>
					<b-col cols='8'>						
						Reimbursement Total: {{total}}
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
				this.loading = true;
				this.statement.qtrReportId = this.currentReport._id;
				Statements.save(this.statement).then(res => {
					this.$refs.statementModal.hide();
					this.$Notification("Success!", "Successfully Added the Statement", "primary");
					this.loading = false;
				}).catch(e => {
					console.error('eeek ', e);
					this.$Notification("Error", `Error Saving Mileage Log: ${e}`, "warning", "", 3000);
					this.loading = false;
					throw e;
				});
			},
		},

		computed: {
			total() {
				return "$" + this.$formatMoney(this.statement.reimbursementOne + this.statement.reimbursementTwo + this.statement.reimbursementThree);
			}

		}
}

</script>