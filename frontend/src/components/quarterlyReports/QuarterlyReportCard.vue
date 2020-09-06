<template>
	<section>
		<div class="main-card">
			<div class="mt-4">
				<QuarterlyReportTop v-bind:quarterlyReport="currentReport"/>
			</div>

			<b-row class="justify-content-around">
				<b-col class="my-2">
					<b-button size="sm" v-b-toggle.collapse-info variant="info">More Details</b-button>
				</b-col>
			</b-row>

			<b-collapse id="collapse-info">
				<QuarterlyReportMoreInfo v-bind:currentReport="currentReport" />
			</b-collapse>

			<b-tabs pills card end>
				<b-tab title="Expense Lines" active>
					<h4>Expense Lines</h4>
					<b-table
						v-if="expenseLines && expenseLines.length > 0"
						striped 
						hover 
						:fields="expenseFields"
						:items="expenseLines" 
						ref="expenseLinesTable"
						responsive="sm"
						selectable
						selected-variant="danger"
						@row-selected="onExpenseLineRowSelected"
					>
						<template v-slot:cell()="data">
							<b @click="showExpenseLineModal(data.item)" class="text-info">{{ data.value }}</b>
						</template>
					</b-table>
				
					<b-row class="justify-content-around">
						<b-col cols="10" class="my-2" v-if="expenseLines && expenseLines.length > 0">
							<b-button 
								variant="danger" 
								size="sm" 
								:disabled="selectedExpenseLines == 0" 
								v-bind:selectedExpenseLines="selectedExpenseLines"
								v-b-modal.confirmDeleteExpenseLine>
									Delete selected
							</b-button>
						</b-col>
						<b-col cols="2" class="my-2">
							<b-button size="sm" variant="primary" @click="showExpenseLineModal(null)"> + Add Expense Line </b-button>
						</b-col>	
					</b-row>
				</b-tab>
				
				<b-tab title="Mileage logs">
					<h4>Mileage logs</h4>
					<b-table
						v-if="mileageLogs && mileageLogs.length > 0"
						striped 
						hover 
						:fields="mileageLogFields"
						:items="mileageLogs" 
						ref="mileageLogsTable"
						responsive="sm"
						selectable
						selected-variant="danger"
						@row-selected="onMileageLogRowSelected"
					>
						<template v-slot:cell()="data">
							<b @click="showMileageLogModal(data.item)" class="text-info">{{ data.value }}</b>
						</template>
					</b-table>
					<b-row class="justify-content-around">
						<b-col cols="10" class="my-2" v-if="mileageLogs && mileageLogs.length > 0">
							<b-button 
								variant="danger" 
								size="sm" 
								:disabled="selectedMileageLogs == 0" 
								v-bind:onMileageLogRowSelected="onMileageLogRowSelected"
								v-b-modal.confirmDeleteMileageLog>
									Delete selected
							</b-button>
						</b-col>
						<b-col cols="2" class="my-2">
							<b-button size="sm" variant="primary" @click="showMileageLogModal(null)"> + Add Mileage Log </b-button>
						</b-col>
					</b-row>
				</b-tab>

				<b-tab title="Notes">
					<h4>Notes</h4>
					<b-form-textarea
						class="text-center"
						v-model="currentReport.comments"
						placeholder="Leave a note ..."
						rows="6"
						max-rows="12"
						debounce="2000"
						@blur="saveReport"
					>
					</b-form-textarea>
				</b-tab>
			</b-tabs>

			<!-- <div class="card-footer">
				<b-row class="justify-content-end">
					<b-col cols="2" class="my-2">
						
					</b-col>
				</b-row>
			</div> -->

			<ExpenseLineModal 
				v-bind:expenseLine="selectedExpenseLine" 
				v-bind:currentReport="currentReport"
				ref="expenseLineModal"
			/>
			<MileageLogModal 
				v-bind:mileageLog="selectedMileageLog" 
				v-bind:currentReport="currentReport"
				ref="mileageLogModal"
			/>
			<ConfirmModal 
				id="confirmDeleteExpenseLine" 
				title="Delete Expense Lines?" 
				v-bind:message="confirmDeleteExpenseLineMessage" 
				@handleConfirm="handleConfirmExpenseLineDelete" 
			/>
			<ConfirmModal 
				id="confirmDeleteMileageLog" 
				title="Delete Mileage Logs?" 
				v-bind:message="confirmDeleteMileageLogMessage" 
				@handleConfirm="handleConfirmMileageLogDelete" 
			/>
		</div>	
	</section>
</template>

<script>
	import moment from 'moment';
	import ExpenseLineModal from "../Modals/ExpenseLineModal";
	import MileageLogModal from "../Modals/MileageLogModal";
	import QuarterlyReportTop from "./QuarterlyReportTop";
	import QuarterlyReportMoreInfo from "./QuarterlyReportMoreInfo";
	import ConfirmModal from "../Modals/ConfirmModal";
	import { QuarterlyReports } from "../../data/quarterlyReports"

	export default {
		components: {
			ExpenseLineModal,
			MileageLogModal,
			QuarterlyReportTop,
			ConfirmModal,
			QuarterlyReportMoreInfo,
		},

		methods: {
			showExpenseLineModal(rowItem) {
				if (rowItem) {
					this.selectedExpenseLine = rowItem;
				} else {
					this.selectedExpenseLine = {};
				}
				this.$refs.expenseLineModal.$refs.expenseLineModal.show()
			},

			showMileageLogModal(mileageLine) {
				if (mileageLine) {
					this.selectedMileageLog = mileageLine;
				} else {
					this.selectedMileageLog = {};
				}
				this.$refs.mileageLogModal.$refs.mileageLogModal.show()
			},

			formatMoney(amount) {
				if (isNaN(Number(amount))) {
					return 0;
				}
				return Number(amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");;
			},

			formatDate(dateTimeObject) {
				return moment(dateTimeObject).format('YYYY');
			},

			onExpenseLineRowSelected(expenseLine) {
				this.selectedExpenseLines = expenseLine;
			},

			onMileageLogRowSelected(mileageLog) {
				this.selectedMileageLogs = mileageLog;
			},

			handleConfirmExpenseLineDelete() {
				this.selectedExpenseLines.forEach(sel => {
					this.currentReport.expenseLines.pop(sel);
				});

				QuarterlyReports.deleteLine(this.currentReport);
			},

			handleConfirmMileageLogDelete() {
				this.selectedMileageLogs.forEach(sel => {
					this.currentReport.mileageLogs.pop(sel);
				});

				QuarterlyReports.deleteLine(this.currentReport);
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
				QuarterlyReports.save(this.currentReport).then(res => {
					this.$Notification("Success", "Succesfully Saved The Quarterly Report", "primary");
				}).catch(e => {
					console.log('eeek error saving report', e);
					throw e;
				});
			}
		},
		
		data() {
			return {
				loading: false,

				selectedExpenseLines: "",
				selectedMileageLogs: "",

				expenseLines: [],
				mileageLogs: [],

				selectedExpenseLine: {},
				selectedMileageLog: {},

				currentReport: {},
				statements: [],
				otherIncomeLines: [],
			};
		},

		created() {
			if (this.$router.currentRoute.params.reportId) {
				QuarterlyReports.getQuarterlyReport(this.$router.currentRoute.params.reportId).then(res => {
					this.currentReport = res;
					this.expenseLines = res.expenseLines;
					this.mileageLogs = res.mileageLogs;
				}).catch(e => {
					console.log(' Report.find eek ', e);
				});
			} else {
				this.currentReport = {
					quarterNumber: 1,
					year: moment().format("YYYY"),
				};
			}
		},

		computed: {
			expenseFields() {				
				if (this.expenseLines[0]) {
					return Object.keys(this.expenseLines[0]).map(f => {						
						let tmp = {};
						tmp.sortable = false;
						
						if (f == "_id" || f == "_schema" || f == "expenseLines" || f == "__v") {
							tmp.key = "";
						} else {
							tmp.key = f;
						}
						return tmp;
					});
				} else {
					return [];
				}
			},

			mileageLogFields() {
				if (this.mileageLogs[0]) {
					return Object.keys(this.mileageLogs[0]).map(f => {
						let tmp = {};
						tmp.sortable = false;
						
						if (f == "_id" || f == "_schema" || f == "expenseLines") {
							tmp.key = "";
						} else {
							tmp.key = f;
						}
						return tmp;
					});
				} else {
					return [];
				}
			},

			confirmDeleteExpenseLineMessage() {
				return "Are you sure you want to Delete the Selected Expense Lines? This cannot be un-done";
			},

			confirmDeleteMileageLogMessage() {
				return "Are you sure you want to Delete the Selected Mileage Logs? This cannot be un-done";
			}

		}
	}
</script>