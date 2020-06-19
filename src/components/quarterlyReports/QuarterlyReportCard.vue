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
				<QuarterlyReportMoreInfo />
			</b-collapse>

			<b-tabs pills card end>
				<b-tab title="Expense Lines" active>
					<h4>Expense Lines</h4>
					<b-table
						v-if="expenseLines.length > 0"
						striped 
						hover 
						:fields="expenseFields"
						:items="expenseLines" 
						ref="expenseLinesTable"
						responsive="sm"
						selectable
						selected-variant="danger"
						@row-selected="onRowSelected"
					>
						<template v-slot:cell()="data">
							<b @click="showAddLineModal(data.item)" class="text-info">{{ data.value }}</b>
						</template>
					</b-table>
				
					<b-row class="justify-content-around">
						<b-col cols="10" class="my-2" v-if="expenseLines.length > 0">
							<b-button 
								variant="danger" 
								size="sm" 
								:disabled="selected == 0" 
								v-bind:selected="selected"
								v-b-modal.confirmModal>
									Delete selected
							</b-button>
						</b-col>
						<b-col cols="2" class="my-2">
							<b-button size="sm" variant="primary" @click="showAddLineModal(null)"> + Add Expense Line </b-button>
						</b-col>	
					</b-row>
				</b-tab>
				
				<b-tab title="Mileage logs">
					<h4>Mileage logs</h4>
					<b-table
						v-if="mileageLogs.length > 0"
						striped 
						hover 
						:fields="mileageLogFields"
						:items="mileageLogs" 
						ref="mileageLogsTable"
						responsive="sm"
						selectable
						selected-variant="danger"
						@row-selected="onRowSelected"
					>
						<template v-slot:cell()="data">
							<b @click="showAddMileageModal(data.item)" class="text-info">{{ data.value }}</b>
						</template>
					</b-table>
					<b-row class="justify-content-around">
						<b-col cols="10" class="my-2" v-if="mileageLogs.length > 0">
							<b-button 
								variant="danger" 
								size="sm" 
								:disabled="selected == 0" 
								v-bind:selected="selected"
								v-b-modal.confirmModal>
									Delete selected
							</b-button>
						</b-col>
						<b-col cols="2" class="my-2">
							<b-button size="sm" variant="primary" @click="showAddMileageModal(null)"> + Add Mileage Log </b-button>
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

			<AddExpenseLineModal 
				v-bind:expenseLine="selectedExpenseLine" 
				ref="addExpenseLineModal"
				@submitExpenseLine="handleSubmitExpenseLine"
			/>
			<ConfirmModal 
				id="confirmModal" 
				title="Delete?" 
				v-bind:message="confirmDeleteMessage" 
				@handleConfirm="handleConfirmDelete" 
			/>
		</div>	
	</section>
</template>

<script>
	import moment from 'moment';
	import AddExpenseLineModal from "../Modals/AddExpenseLineModal";
	import { QuarterlyReport as Report, ExpenseLine } from '../../data/models/quarterlyReportModel'
	import QuarterlyReportTop from './QuarterlyReportTop'
	import QuarterlyReportMoreInfo from './QuarterlyReportMoreInfo'
	import ConfirmModal from '../Modals/ConfirmModal'

	export default {
		components: {
			AddExpenseLineModal,
			QuarterlyReportTop,
			ConfirmModal,
			QuarterlyReportMoreInfo,
		},

		methods: {
			showAddLineModal(rowItem) {
				if (rowItem) {
					this.selectedExpenseLine = rowItem;
				} else {
					this.selectedExpenseLine = ExpenseLine.create();
				}
				this.$refs.addExpenseLineModal.$refs.addExpenseLineModal.show()
			},

			showAddMileageModal(mileageLine) {
				if (mileageLine) {
					this.selectedLine = rowItem;
				} else {
					this.selectedLine = ExpenseLine.create();
				}
				this.$refs.addLineModal.$refs.addLineModal.show()
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

			handleSubmitExpenseLine(expenseLine) {
				this.loading = true;
				if (!this.currentReport.expenseLines.includes(expenseLine)) {
					this.currentReport.expenseLines.push(expenseLine);
					this.currentReport.baseAmount = Number(this.currentReport.baseAmount);
					this.currentReport.save().then(res => {
						this.$refs.addLineModal.$refs.addLineModal.hide();
						this.$Notification("Success!", "Successfully Added the Expense Line");
						this.loading = false;
					}).catch(e => {
						console.log('eeek ', e);
						this.$Notification("Error", `Error Saving Expense Line: ${e}`, "warning", "", 3000);
						this.loading = false;
						throw e;
					});
				} else {			
					Report.findOneAndUpdate( { _id: expenseLine._id }, {expenseLines: expenseLine}).then(res => {
						this.$refs.addLineModal.$refs.addLineModal.hide();
						this.$Notification("Success!", "Successfully Added the Expense Line");
						this.loading = false;
					}).catch(e => {
						console.log('eeek ', e);
						this.$Notification("Error", `Error Saving Expense Line: ${e}`, "warning", "", 3000);
						this.loading = false;
						throw e;
					});
				}
			},

			onRowSelected(report) {
				this.selected = report;
			},

			handleConfirmDelete() {
				this.selected.forEach(sel => {
					this.currentReport.expenseLines.pop(sel);
				})
				this.currentReport.save().then(res => {
					this.$refs.addLineModal.$refs.addLineModal.hide();
					this.$Notification("Success!", "Successfully Added the Contact");
				}).catch(e => {
					console.log('eeek ', e);
					throw e;
				});
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
		},
		
		data() {
			return {
				selected: "",
				expenseLines: [],
				mileageLogs: [],
				selectedExpenseLine: {},
				currentReport: {},
				confirmDeleteMessage: "Are you sure you want to delete this Expense LIne? This cannot be un-done",
				loading: false,
			};
		},

		created() {
			let report
			if (this.$router.currentRoute.params.reportId) {
				Report.find( { _id: this.$router.currentRoute.params.reportId } ).then(res => {
					report = res[0];
					this.currentReport = report;
					this.expenseLines = report.expenseLines;
					this.mileageLogs = report.mileageLogs;
				}).catch(e => {
					console.log(' Report.find eek ', e);
				});
			} else {
				report = Report.create();
				this.currentReport = report;
			}
		},

		computed: {
			expenseFields() {
				if (this.expenseLines[0]) {
					return Object.keys(this.expenseLines[0]).map(f => {
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

		}
	}
</script>