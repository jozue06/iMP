<template>
	<div class="sub-card" v-bind:currentReport="currentReport">
		<b-row class="mx-2 justify-content-around">
			<b-col cols="2" class="my-2">
				<b-form-group class="mr-1" label="non-AGWM Income">
					<b-input-group prepend="$">
						<b-form-input 
							v-model="currentReport.otherNonAGWMIncome"
							class="text-right"
							type="text"
							name="nonAgwmIncome"
							lazy-formatter
							:formatter="$formatMoney"
							@blur="saveReport"
						>
						</b-form-input>
					</b-input-group>
				</b-form-group> 
			</b-col>
			<b-col cols="2" class="my-2">
				<b-form-group class="mr-1" label="SDR Numbers">
					<b-input-group>
						<b-form-input 
							v-model="currentReport.sdrReferenceNumbers"
							class="text-right"
							type="text" 
							name="sdrNumbers"
							@blur="saveReport"
						>
						</b-form-input>
					</b-input-group>
				</b-form-group> 
			</b-col>
			<b-col cols="2" class="my-2">
				<b-form-group class="mr-1" label="SDR Balance">
					<b-input-group prepend="$">
						<b-form-input 
							v-model="currentReport.sdrBalance"
							class="text-right"
							type="text" 
							name="sdrBalance"
							lazy-formatter
							:formatter="$formatMoney"
							@blur="saveReport"
						>
						</b-form-input>
					</b-input-group>
				</b-form-group> 
			</b-col>
			<b-col cols="2" class="my-2">
				<b-form-group class="mr-1" label="Other Funds Held">
					<b-input-group prepend="$">
						<b-form-input 
							v-model="currentReport.otherFundsHeld"
							class="text-right"
							type="text"
							name="otherFundsHeld"
							lazy-formatter
							:formatter="$formatMoney"
						>
						</b-form-input>
					</b-input-group>
				</b-form-group> 
			</b-col>
		</b-row>
		<b-row class="ml-2 mr-2">
			<b-col cols="4" class="my-2">
				<b-form-group class="mr-1" label="Personal Offerings Retained">
					<b-input-group prepend="$">
						<b-form-input 
							v-model="currentReport.personalOfferingsRetained"
							class="text-right"
							type="text"
							name="personalOfferingsRetained"
							lazy-formatter
							:formatter="$formatMoney"
							@blur="saveReport"
						>
						</b-form-input>
					</b-input-group>
				</b-form-group> 
			</b-col>
			<b-col cols="4" class="my-2">
				<b-form-group class="mr-1" label="Deficit Reimbursement">
					<b-input-group prepend="$">
						<b-form-input 
							v-model="currentReport.deficitReimbursement"
							class="text-right"
							type="text"
							name="deficitReimbursement"
							lazy-formatter
							:formatter="$formatMoney"
							@blur="saveReport"
						>
						</b-form-input>
					</b-input-group>
				</b-form-group> 
			</b-col>
			<b-col cols="4" class="my-2">
				<b-form-group class="mr-1" label="Other AGWM Income">
					<b-input-group prepend="$">
						<b-form-input 
							v-model="currentReport.otherAGWMIncome"
							class="text-right"
							type="text"
							name="otherAGWMIncome"
							lazy-formatter
							:formatter="$formatMoney"
							@blur="saveReport"
						>
						</b-form-input>
					</b-input-group>
				</b-form-group> 
			</b-col>
		</b-row>
		<b-row class="mx-2">
			<b-col cols="6" class="my-2" style="border-right: solid 1px #ced4da;">
				<label>
					Statement Info
				</label>
				<b-col>	
					<b-row v-if="currentReport.statements.length" class="align-items-center mt-2">
						<b-col v-for="(statement, id) in currentReport.statements" :key="`${id}`" @click="showStatementModal(statement)" cols='4'>
							{{statement.date}}
							<br>
							${{statement.amount}}
							<br>
							${{statement.reimbursementAmount}}
						</b-col>
						<b-row class="mt-2 mb-2 text-right">
							<b-col cols="12" class="text-right">
								Totals
								<br>
								Statements Total: {{statementAmountTotal}}
								<br>
								Reimbursement Total: {{statementReimbursementTotal}}
							</b-col>
						</b-row>
					</b-row>
					<b-row v-if="currentReport.statements.length < 3" class="align-items-center">
						<b-col cols="12">
							<b-button @click="showStatementModal(null)" variant="primary" class="m-2" size="sm">+ Add statement info</b-button>
						</b-col>
					</b-row>
				</b-col>
			</b-col>
			<b-col cols="6"  class="my-2">
				<label>Other</label>
				<b-row v-if="otherIncomeLines && otherIncomeLines.length > 0" class="align-items-center">
					<b-col>
						<b-table
							class="small-table"
							striped 
							hover 
							:fields="fields2"
							:items="otherIncomeLines" 
							ref="otherIncomeLinesTable"
							responsive="sm"
							selectable
							sort-icon-left
							selected-variant="danger"
							@row-selected="onMiscIncomeRowSelected"
						>
							<template v-slot:cell()="data">
								<b @click="showOtherIncomeModal(data.item)" class="text-info">{{ data.value }}</b>
							</template>
						</b-table>
						<b-row class="justify-content-around">
							<b-col cols="4" class="my-2" v-if="otherIncomeLines && otherIncomeLines.length > 0">
								<b-button 
									variant="danger" 
									size="sm" 
									:disabled="selectedOtherLines == 0" 
									v-bind:onMiscIncomeRowSelected="onMiscIncomeRowSelected"
									v-b-modal.confirmDeleteOtherLine>
										Delete selected
								</b-button>
							</b-col>
							<b-col cols="4" class="my-2">
								<b-button @click="showOtherIncomeModal(null)" variant="primary" class="m-2" size="sm">+ Add other or misc income</b-button>
							</b-col>
						</b-row>
						
					</b-col>
				</b-row>
				<b-row v-else class="align-items-center">
					<b-col cols="12">
						<b-button @click="showOtherIncomeModal(null)" variant="primary" class="m-2" size="sm">+ Add other or misc income</b-button>
					</b-col>
				</b-row>
			</b-col>
		</b-row>
		<OtherIncomeModal ref="otherIncomeModal" v-bind:otherIncomeLine="otherIncomeLine" v-bind:currentReport="currentReport" />
		<StatementModal 
			ref="statementModal" 
			v-bind:statement="selectedStatement"
			v-bind:currentReport="currentReport" 
			v-bind:reportType="0"
			@refresh="refresh"
		/>
		<ConfirmModal 
			id="confirmDeleteOtherLine" 
			title="Delete Misc Lines?" 
			v-bind:message="confirmDeleteOtherLineMessage" 
			@handleConfirm="handleConfirmDelete" 
		/>
	</div>
</template>

<script>
	import { allowedFields } from "../../constants/tableFields";
	import OtherIncomeModal from "../Modals/OtherIncomeModal";
	import StatementModal from "../Modals/StatementModal";
	import { OtherIncomeLines } from "../../data/otherIncomeLines"
	import ConfirmModal from "../Modals/ConfirmModal";

	export default  {

		name: 'quarterlyReportMoreInfo',

		components: {
			OtherIncomeModal,
			StatementModal,
			ConfirmModal
		},

		props: {
			currentReport: Object,
		},

		created() {
			if (this.currentReport.statements.length) {
				this.statements = this.currentReport.statements;
			}
		},

		data() {
			return {
				selectedStatement: {},
				statements: [],
				otherIncomeLine: {},
				selectedOtherLines: null,
			}
		},

		methods: {
			onMiscIncomeRowSelected(otherLine) {
				this.selectedOtherLines = otherLine;
			},

			handleConfirmDelete() {
				let ids = this.selectedOtherLines.map(l => l._id);
				this.selectedOtherLines.forEach(sel => {
					this.currentReport.otherIncomeLines.pop(sel);
				});

				OtherIncomeLines.deleteOtherIncomeLines(ids);
			},

			showOtherIncomeModal(otherIncomeLine) {
				if (otherIncomeLine) {
					this.otherIncomeLine = otherIncomeLine;
				} else {
					this.otherIncomeLine = {};
				}

				this.$refs.otherIncomeModal.$refs.otherIncomeModal.show();
			},

			showStatementModal(selectedStatement) {
				if (selectedStatement) {
					this.selectedStatement = selectedStatement;
				} else {
					this.selectedStatement = {}
				}
				this.$refs.statementModal.$refs.statementModal.show();
			},

			saveReport() {
				this.$emit("saveReport");
			},

			refresh(savedReport) {
				this.currentReport = savedReport;
			}
		},

		computed: {
			fields2() {
				let keys = Object.keys(this.otherIncomeLines[0]).map(f => {
					let tmp = {};
					tmp.sortable = true;

					if (allowedFields.otherIncomeTable.includes(f)) {
						tmp.key = f;
					} else { 
						tmp.key = "";
					}

					return tmp;
				});

				return keys;
			},

			otherIncomeLines() {
				return this.currentReport.otherIncomeLines;
			},

		
			statementAmountTotal() {
				let amt = 0;
				if (this.currentReport.statements) {
					this.currentReport.statements.forEach(statement => {
						amt = this.$addMoney(amt, statement.amount);
					});
				}
				
				return "$" + this.$formatMoney(amt);
			},

			statementReimbursementTotal() {
				let amt = 0;
				if (this.currentReport.statements) {
					this.currentReport.statements.forEach(statement => {
						amt = this.$addMoney(amt, statement.reimbursementAmount);
					});
				}

				return "$" + this.$formatMoney(amt);
			},

			confirmDeleteOtherLineMessage() {
				return "Are you sure you want to Delete the Selected Other Income Lines? This cannot be un-done";
			}
		}
	}
</script>