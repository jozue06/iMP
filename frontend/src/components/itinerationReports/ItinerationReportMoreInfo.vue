<template>
	<div class="sub-card" v-bind:currentReport="currentReport">		
		<b-row class="mx-2 justify-content-around">
			<b-col cols="2" class="my-2">
				<b-form-group class="mr-1" label="Car Miles">
					<!-- <b-input-group prepend="$">
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
					</b-input-group> -->
				</b-form-group> 
			</b-col>
			<b-col cols="2" class="my-2">
				<b-form-group class="mr-1" label="Cents Per Mile">
					<!-- <b-input-group>
						<b-form-input 
							v-model="currentReport.sdrReferenceNumbers"
							class="text-right"
							type="text" 
							name="sdrNumbers"
							@blur="saveReport"
						>
						</b-form-input>
					</b-input-group> -->
				</b-form-group> 
			</b-col>
			<b-col cols="2" class="my-2">
				<b-form-group class="mr-1" label="Car W/ Trailer / Camper Miles">
					<!-- <b-input-group prepend="$">
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
					</b-input-group> -->
				</b-form-group> 
			</b-col>
			<b-col cols="2" class="my-2">
				<b-form-group class="mr-1" label="Car W/ Trailer / Camper Cents per Mile">
					<b-input-group prepend="$">
						<!-- <b-form-input 
							v-model="currentReport.otherFundsHeld"
							class="text-right"
							type="text"
							name="otherFundsHeld"
							lazy-formatter
							:formatter="$formatMoney"
						>
						</b-form-input> -->
					</b-input-group>
				</b-form-group> 
			</b-col>
		</b-row>
		<b-row class="ml-2 mr-2">
			<b-col cols="4" class="my-2">
				<b-form-group class="mr-1" label="Trailer / Camper Lodging # of Nights">
					<!-- <b-input-group prepend="$">
						<b-form-input 
							v-model="currentReport.personalOfferingsRetained"
							class="text-right"
							type="text"
							name="personalPfferingsRetained"
							lazy-formatter
							:formatter="$formatMoney"
							@blur="saveReport"
						>
						</b-form-input>
					</b-input-group> -->
				</b-form-group> 
			</b-col>
			<b-col cols="4" class="my-2">
				<b-form-group class="mr-1" label="Trailer / Camper Lodging Per Night">
					<b-input-group prepend="$">
						<!-- <b-form-input 
							v-model="currentReport.deficitReimbursement"
							class="text-right"
							type="text"
							name="deficitReimbursement"
							lazy-formatter
							:formatter="$formatMoney"
							@blur="saveReport"
						>
						</b-form-input> -->
					</b-input-group>
				</b-form-group> 
			</b-col>
			<b-col cols="4" class="my-2">
				<b-form-group class="mr-1" label="Trailer Park Nights">
					<!-- <b-input-group prepend="$">
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
					</b-input-group> -->
				</b-form-group> 
			</b-col>
			<b-col cols="4" class="my-2">
				<b-form-group class="mr-1" label="Trailer Park Per Night">
					<b-input-group prepend="$">
						<!-- <b-form-input 
							v-model="currentReport.otherAGWMIncome"
							class="text-right"
							type="text"
							name="otherAGWMIncome"
							lazy-formatter
							:formatter="$formatMoney"
							@blur="saveReport"
						>
						</b-form-input> -->
					</b-input-group> 
				</b-form-group> 
			</b-col>
		</b-row>
		<b-row class="mx-2">
			<b-col cols="6" class="my-2" style="border-right: solid 1px #ced4da;">
				<label>
					Support Info
				</label>
					
				<b-col cols="4" class="my-2">
					<b-form-group class="mr-1" label="Commitments">
						<b-input-group prepend="$">
							<!-- <b-form-input 
								v-model="currentReport.otherAGWMIncome"
								class="text-right"
								type="text"
								name="otherAGWMIncome"
								lazy-formatter
								:formatter="$formatMoney"
								@blur="saveReport"
							>
							</b-form-input> -->
						</b-input-group> 
					</b-form-group> 
				</b-col>
				<b-col cols="4" class="my-2">
					<b-form-group class="mr-1" label="Cash">
						<b-input-group prepend="$">
							<!-- <b-form-input 
								v-model="currentReport.otherAGWMIncome"
								class="text-right"
								type="text"
								name="otherAGWMIncome"
								lazy-formatter
								:formatter="$formatMoney"
								@blur="saveReport"
							>
							</b-form-input> -->
						</b-input-group> 
					</b-form-group> 
				</b-col>
			</b-col>

			<b-col cols="6"  class="my-2">
				<label>Other</label>
				<b-row class="align-items-center">
					<b-col>
						<b-row class="justify-content-around">
							<b-col cols="4" class="my-2">
								<b-form-group class="mr-1" label="No of events">
									<b-input-group prepend="$">
										<!-- <b-form-input 
											v-model="currentReport.otherAGWMIncome"
											class="text-right"
											type="text"
											name="otherAGWMIncome"
											lazy-formatter
											:formatter="$formatMoney"
											@blur="saveReport"
										>
										</b-form-input> -->
									</b-input-group> 
								</b-form-group> 
							</b-col>
							<b-col cols="4" class="my-2">
								<b-form-group class="mr-1" label="No of Appointments">
									<b-input-group prepend="$">
										<!-- <b-form-input 
											v-model="currentReport.otherAGWMIncome"
											class="text-right"
											type="text"
											name="otherAGWMIncome"
											lazy-formatter
											:formatter="$formatMoney"
											@blur="saveReport"
										>
										</b-form-input> -->
									</b-input-group> 
								</b-form-group> 
							</b-col>
							<b-col cols="4" class="my-2">
								<b-form-group class="mr-1" label="Start Receipt No">
									<b-input-group prepend="$">
										<!-- <b-form-input 
											v-model="currentReport.otherAGWMIncome"
											class="text-right"
											type="text"
											name="otherAGWMIncome"
											lazy-formatter
											:formatter="$formatMoney"
											@blur="saveReport"
										>
										</b-form-input> -->
									</b-input-group> 
								</b-form-group> 
							</b-col>
							<b-col cols="4" class="my-2">
								<b-form-group class="mr-1" label="End Receipt No">
									<b-input-group prepend="$">
										<!-- <b-form-input 
											v-model="currentReport.otherAGWMIncome"
											class="text-right"
											type="text"
											name="otherAGWMIncome"
											lazy-formatter
											:formatter="$formatMoney"
											@blur="saveReport"
										>
										</b-form-input> -->
									</b-input-group> 
								</b-form-group> 
							</b-col>

							<b-col cols="4" class="my-2">
								<b-form-group class="mr-1" label="Personal Note">
									<!-- <b-input-group prepend="$"> -->
										<!-- <b-form-input 
											v-model="currentReport.otherAGWMIncome"
											class="text-right"
											type="text"
											name="otherAGWMIncome"
											lazy-formatter
											:formatter="$formatMoney"
											@blur="saveReport"
										>
										</b-form-input> -->
									<!-- </b-input-group>  -->
								</b-form-group> 
							</b-col>
						</b-row>
					</b-col>
				</b-row>
				<!-- <b-row v-else class="align-items-center">
					<b-col cols="12">
						<b-button @click="showOtherIncomeModal(null)" variant="primary" class="m-2" size="sm">+ Add other or misc income</b-button>
					</b-col>
				</b-row> -->
			</b-col>
		</b-row>
		<OtherIncomeModal ref="otherIncomeModal" v-bind:otherIncomeLine="otherIncomeLine" v-bind:currentReport="currentReport" />
		<StatementModal ref="statementModal" v-bind:currentReport="currentReport" v-bind:statement="statement" />
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

		name: 'itinerationReportMoreInfo',

		components: {
			OtherIncomeModal,
			StatementModal,
			ConfirmModal
		},

		props: {
			currentReport: Object,
		},

		mounted() {

		},

		data() {
			return {
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
				}

				this.$refs.otherIncomeModal.$refs.otherIncomeModal.show();
			},

			showStatementModal(statement) {
				this.$refs.statementModal.$refs.statementModal.show();
			},

			saveReport() {
				this.$emit("saveReport");
			}
		},

		computed: {
			fields1() {				
				let keys = Object.keys(this.statement).map(f => {
					let tmp = {};
					tmp.sortable = true;

					if (allowedFields.commsList.includes(f)) {
						tmp.key = f;
					} else { 
						tmp.key = "";
					}

					return tmp;
				});

				return keys;
			},

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

			statement() {
				if (this.currentReport.statements) {
					return this.currentReport.statements[0];
				}
				return {}
			},

			otherIncomeLines() {
				return this.currentReport.otherIncomeLines;
			},

			statementReimbursementTotal() {
				return "$" + this.$formatMoney(this.statement.reimbursementOne + this.statement.reimbursementTwo + this.statement.reimbursementThree)
			},

			statementAmountTotal() {
				return "$" + this.$formatMoney(this.statement.amountOne + this.statement.amountTwo + this.statement.amountThree)
			},

			confirmDeleteOtherLineMessage() {
				return "Are you sure you want to Delete the Selected Other Income Lines? This cannot be un-done";
			}

		}
}

</script>