<template>
	<div class="sub-card" v-bind:currentReport="currentReport">		
		<b-row class="justify-content-around">
			<b-col cols="2" class="my-2">
				<b-form-group>
					<label>Car Miles</label>
					<b-form-input 
						v-model="currentReport.carMiles"
						class="text-right"
						type="text"
						name="carMiles"
						lazy-formatter
						:formatter="$formatMoney"
						@blur="saveReport"
					>
					</b-form-input>
					<label>Cents Per Mile</label>
					<b-input-group prepend="$">
						<b-form-input 
							v-model=currentReport.carCentsPerMile
							class="text-right"
							type="text" 
							name="carCentsPerMile"
							lazy-formatter
							:formatter="$formatMoney"
							@blur="saveReport"
						>
						</b-form-input>
					</b-input-group>
				</b-form-group> 
			</b-col>
			<b-col cols="2" class="my-2">
				<b-form-group class="mr-1">
					<label>Car W/ Trailer / Camper Miles</label>
					<b-form-input 
						v-model="currentReport.trailerMiles"
						class="text-right"
						type="text" 
						name="trailerMiles"
						lazy-formatter
						:formatter="$formatMoney"
						@blur="saveReport"
					>
					</b-form-input>
					<label>Car W/ Trailer / Camper Cents per Mile</label>
					<b-input-group prepend="$">
						<b-form-input 
							v-model="currentReport.trailerCentsPerMile"
							class="text-right"
							type="text"
							name="trailerCentsPerMile"
							lazy-formatter
							:formatter="$formatMoney"
						>
						</b-form-input>
					</b-input-group>
				</b-form-group> 
			</b-col>
			<b-col cols="2" class="my-2">
				<b-form-group class="mr-1">
					<label>Trailer / Camper Lodging # of Nights</label>
					<b-form-input 
						v-model="currentReport.trailerLodgingNights"
						class="text-right"
						type="number"
						name="trailerLodgingNights"
						@blur="saveReport"
					>
					</b-form-input>
					<label>Trailer / Camper Lodging Per Night</label>
					<b-input-group prepend="$">
						<b-form-input 
							v-model="currentReport.trailerLodgingPrice"
							class="text-right"
							type="text"
							name="trailerLodgingPrice"
							lazy-formatter
							:formatter="$formatMoney"
							@blur="saveReport"
						>
						</b-form-input>
					</b-input-group>
				</b-form-group> 
			</b-col>
			<b-col cols="2" class="my-2">
				<b-form-group class="mr-1">
					<label>Trailer Park Nights</label>
					<b-form-input 
						v-model="currentReport.trailerParkNights"
						class="text-right"
						type="number"
						name="trailerParkNights"
						@blur="saveReport"
					>
					</b-form-input>
					<label>Trailer Park Per Night</label>
					<b-input-group prepend="$">
						<b-form-input 
							v-model="currentReport.trailerParkPrice"
							class="text-right"
							type="text"
							name="trailerParkPrice"
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
					Support Info
				</label>
				<b-row class="justify-content-around">
					<b-form-group class="mr-1" label="Commitments">
						<b-input-group prepend="$">
							<b-form-input 
								v-model="currentReport.commitmentAmount"
								class="text-right"
								type="text"
								name="commitmentAmount"
								lazy-formatter
								:formatter="$formatMoney"
								@blur="saveReport"
							>
							</b-form-input>
						</b-input-group> 
					</b-form-group> 
					<b-form-group class="mr-1" label="Cash">
						<b-input-group prepend="$">
							<b-form-input 
								v-model="currentReport.cashAmount"
								class="text-right"
								type="text"
								name="cashAmount"
								lazy-formatter
								:formatter="$formatMoney"
								@blur="saveReport"
							>
							</b-form-input>
						</b-input-group> 
					</b-form-group> 
				</b-row>
			</b-col>

			<b-col cols="6"  class="my-2">
				<label>Other</label>
				<b-row class="align-items-center">
					<b-col>
						<b-row class="justify-content-around">
							<b-col cols="4" class="my-2">
								<b-form-group class="mr-1" label="No of events">
									<b-form-input 
										v-model="currentReport.numberOfServices"
										class="text-right"
										type="number"
										name="numberOfServices"
										@blur="saveReport"
									>
									</b-form-input>
								</b-form-group> 
								<b-form-group class="mr-1" label="No of Appointments">
									<b-form-input 
										v-model="currentReport.numberOfAppointments"
										class="text-right"
										type="number"
										name="numberOfAppointments"
										@blur="saveReport"
									>
									</b-form-input>
								</b-form-group> 
							</b-col>
							<b-col cols="4" class="my-2">
								<b-form-group class="mr-1" label="Start Receipt No">
									<b-form-input 
										v-model="currentReport.startReceiptNo"
										class="text-right"
										type="text"
										name="startReceiptNo"
										@blur="saveReport"
									>
									</b-form-input>
								</b-form-group> 
								<b-form-group class="mr-1" label="End Receipt No">
									<b-form-input 
										v-model="currentReport.endReceiptNo"
										class="text-right"
										type="text"
										name="endReceiptNo"
										@blur="saveReport"
									>
									</b-form-input>
								</b-form-group> 
							</b-col>

							<b-col cols="4" class="my-2">
								<b-form-group class="mr-1" label="Personal Note">
									<b-form-textarea
										v-model="currentReport.personalNotes"
										placeholder=""
										rows="4"
										max-rows="6"
									></b-form-textarea>
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