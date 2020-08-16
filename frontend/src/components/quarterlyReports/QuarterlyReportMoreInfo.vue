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
							name="personalPfferingsRetained"
							lazy-formatter
							:formatter="$formatMoney"
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
						>
						</b-form-input>
					</b-input-group>
				</b-form-group> 
			</b-col>
		</b-row>
		<b-row class="mx-2">
			<b-col cols="6" class="my-2" style="border-right: solid 1px #ced4da;">
				<label>
					Statment Info
				</label>
				<b-col>
					<b-row v-if="statements.length > 0" class="align-items-center">
						<b-col>
							<b-table
								class="small-table"
								striped 
								hover 
								:fields="fields1"
								:items="statements" 
								ref="statementsTable"
								responsive="sm"
								selectable
								sort-icon-left
								selected-variant="danger"
								@row-selected="onStatementRowSelected"
							>
								<template v-slot:cell()="data">
									<b @click="showStatementModal(data.item)" class="text-info">{{ data.value }}</b>
								</template>
							</b-table>
							<b-button @click="showStatementModal(null)"  variant="primary" class="m-2" size="sm">+ Add statment info</b-button>
						</b-col>
					</b-row>
					<b-row v-else class="align-items-center">
						<b-col cols="12">
							<b-button @click="showStatementModal(null)" variant="primary" class="m-2" size="sm">+ Add statment info</b-button>
						</b-col>
					</b-row>
				</b-col>
			</b-col>
			<b-col cols="6"  class="my-2">
				<label>Other</label>
				<b-row v-if="otherIncomeLines.length > 0" class="align-items-center">
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
						<b-button @click="showOtherIncomeModal(null)" variant="primary" class="m-2" size="sm">+ Add other or misc income</b-button>
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
	</div>
</template>

<script>
	import { allowedFields } from "../../constants/tableFields";
	import OtherIncomeModal from "../Modals/OtherIncomeModal";
	import { 
		QuarterlyReport as Report, 
		OtherIncomeLine,
		Statement,
	} from "../../data/models/quarterlyReportModel";

	export default  {

		name: 'quarterlyReportMoreInfo',

		components: {
			OtherIncomeModal
		},

		props: {
			currentReport: Object,
		},

		mounted() {

		},

		data() {
			return {
				otherIncomeLine: {}
			}
		},

		methods: {
			onStatementRowSelected() {

			},

			onMiscIncomeRowSelected() {

			},

			showOtherIncomeModal(otherIncomeLine) {
				if (otherIncomeLine) {
					this.otherIncomeLine = otherIncomeLine;
				} else {
					this.otherIncomeLine = OtherIncomeLine.create();
				}

				this.$refs.otherIncomeModal.$refs.otherIncomeModal.show();
			},

			showStatementModal(statement) {

			}
		},

		computed: {
			fields1() {				
				let keys = Object.keys(this.statements[0]).map(f => {
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

			statements() {
				return this.currentReport.statements;
			},

			otherIncomeLines() {
				return this.currentReport.otherIncomeLines;
			}

		}
}

</script>