<template>
	<section>
		<div class="main-card">
			<div class="mt-4">
				<ReportTop v-bind:currentReport="currentReport" :reportType=4 linkTo="/institutionalReports"/>
			</div>

			<b-row class="justify-content-around">
				<b-col class="my-2">
					<b-button size="sm" v-b-toggle.collapse-info variant="info">More Details</b-button>
				</b-col>
			</b-row>

			<b-collapse id="collapse-info">
				<ReportMoreInfo v-bind:currentReport="currentReport" v-bind:statement="statement" :reportType=4 @saveReport="saveReport"/>
			</b-collapse>
			
			<b-tabs pills card end>
				<b-tab title="ExpenseLines" active>
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
							<b-button size="sm" variant="primary" @click="showExpenseLineModal(null)">+ Add Expense Line </b-button>
						</b-col>	
					</b-row>
				</b-tab>

				<b-tab title="Comments">
					<h4>Comments</h4>
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
			<ExpenseLineModal 
				v-bind:expenseLine="selectedExpenseLine" 
				v-bind:currentReport="currentReport"
				ref="expenseLineModal"
				v-bind:expenseLineType=4
			/>
			<ConfirmModal 
				id="confirmDeleteExpenseLine" 
				title="Delete Expense Lines?" 
				v-bind:message="confirmDeleteExpenseLineMessage" 
				@handleConfirm="handleConfirmExpenseLineDelete" 
			/>
		</div>	
	</section>
</template>

<script>
	import moment from 'moment';
	import ReportTop from "../Globals/ReportTop";
	import ReportMoreInfo from "../Globals/ReportMoreInfo";
	import ExpenseLineModal from "../Modals/ExpenseLineModal";
	import ConfirmModal from "../Modals/ConfirmModal";
	import { InstitutionalReports  } from '../../data/institutionalReports'
	import { ExpenseLines } from "../../data/expenseLines";

	export default {
		components: {
			ReportTop,
			ReportMoreInfo,
			ExpenseLineModal,
			ConfirmModal,
		},

		methods: {
			formatDate(dateTimeObject) {
				return moment(dateTimeObject).format('YYYY');
			},

			saveReport() {
				InstitutionalReports.save(this.currentReport).then(res => {
					this.$Notification("Success", "Succesfully Saved the Institutional Report", "primary");
				}).catch(e => {
					console.error('eeek error saving report', e);
					throw e;
				});
			},

			showExpenseLineModal(rowItem) {
				if (rowItem) {
					this.selectedExpenseLine = rowItem;
				} else {
					this.selectedExpenseLine = {};
				}
				this.$refs.expenseLineModal.$refs.expenseLineModal.show()
			},

			handleConfirmExpenseLineDelete() {
				let ids = this.selectedExpenseLines.map(l => l._id);
				this.selectedExpenseLines.forEach(sel => {
					this.currentReport.expenseLines.pop(sel);
				});

				ExpenseLines.deleteExpenseLines(ids);
			},

			onExpenseLineRowSelected(expenseLine) {
				this.selectedExpenseLines = expenseLine;
			},

		},
		
		data() {
			return {
				loading: false,
				currentReport: {},
				selectedExpenseLines: [],
				selectedExpenseLine: {},
				statement: {},
				expenseLines: [],
			};
		},

		created() {
			if (this.$router.currentRoute.params.reportId || this.$router.currentRoute.query.reportId) {
				let reportId;
				if (this.$router.currentRoute.params.reportId) {
					reportId = this.$router.currentRoute.params.reportId;
					this.$router.replace({ path: 'institutionalReport', query: { reportId: reportId}});
				} else {
					reportId = this.$router.currentRoute.query.reportId;
				}
				
				InstitutionalReports.getInstitutionalReport(reportId).then(res => {
					this.currentReport = res;
					this.expenseLines = res.expenseLines;
					this.statement = res.statement;
				}).catch(e => {
					console.error(' Report.find eek ', e);
				});
			} else {
				let currentReport = {
					month: 1,
					institution: "-",
					account: "-",
					year: moment().format("YYYY"),
				};				
				InstitutionalReports.save(currentReport).then(res => {
					this.currentReport = res;
					this.$router.replace({ path: 'institutionalReport', query: { reportId: res._id}});
				});
			}
		},
		computed: {
			confirmDeleteExpenseLineMessage() {
				return "Are you sure you would like to delete the selected Expense Line(s)?";
			},
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
		}
	}
</script>