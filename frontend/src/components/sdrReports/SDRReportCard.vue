<template>
	<section>
		<LoadingSpinner v-bind:loading="loading" />
		<div v-if="!loading" class="main-card">
			<div class="mt-4">				
				<ReportTop v-bind:report="currentReport" :reportType=3 @saveReport="saveReport" linkTo="/SDRReports"/>
			</div>

			<b-row class="justify-content-around">
				<b-col class="my-2">
					<b-button size="sm" v-b-toggle.collapse-info variant="info">More Details</b-button>
				</b-col>
			</b-row>

			<b-collapse id="collapse-info">
				<ReportMoreInfo v-bind:currentReport="currentReport" :reportType=3 @saveReport="saveReport"/>
			</b-collapse>
			
			<b-tabs pills card end>
				<b-tab title="SDR ExpenseLines" active>
					<h4>SDR Expense Lines</h4>
					<b-table
						v-if="currentReport.expenseLines && currentReport.expenseLines.length > 0"
						striped 
						hover 
						:fields="expenseFields"
						:items="currentReport.expenseLines" 
						ref="expenseLinesTable"
						responsive="sm"
						selectable
						sort-icon-left
						selected-variant="danger"
						@row-selected="onExpenseLineRowSelected"
					>
						<template v-slot:cell()="data">
							<b @click="showExpenseLineModal(data.item)" class="text-info">{{ data.value }}</b>
						</template>
					</b-table>
				
					<b-row class="justify-content-around">
						<b-col cols="10" class="my-2" v-if="currentReport.expenseLines && currentReport.expenseLines.length > 0">
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
				@saved="saved"
				v-bind:expenseLineType=3
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
	import { SDRReports  } from '../../data/sdrReports';
	import { ExpenseLines } from "../../data/expenseLines";
	import LoadingSpinner from "../Globals/LoadingSpinner";
	import { allowedFields } from "../../constants/tableFields";

	export default {
		components: {
			ReportTop,
			ReportMoreInfo,
			ExpenseLineModal,
			ConfirmModal,
			LoadingSpinner,
		},

		methods: {
			formatDate(dateTimeObject) {
				return moment(dateTimeObject).format('YYYY');
			},

			saveReport() {
				SDRReports.save(this.currentReport).then(res => {
					this.$Notification("Success", "Succesfully Saved the SDR Report", "primary");
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

			saved() {
				this.loading = true;
				let reportId = this.$router.currentRoute.query.reportId;
				SDRReports.getSDRReport(reportId).then(res => {
					this.currentReport = res;
					this.loading = false;
				}).catch(e => {
					console.error(' Report.find eek ', e);
					this.loading = false;
					throw e;
				});
			}
		},
		
		data() {
			return {
				loading: false,
				currentReport: "",
				selectedExpenseLines: [],
				selectedExpenseLine: {},
			};
		},

		created() {
			this.loading = true;
			if (this.$router.currentRoute.params.reportId || this.$router.currentRoute.query.reportId) {
				let reportId;
				if (this.$router.currentRoute.params.reportId) {
					reportId = this.$router.currentRoute.params.reportId;
					this.$router.replace({ path: 'SDRReport', query: { reportId: reportId}});
				} else {
					reportId = this.$router.currentRoute.query.reportId;
				}
				
				SDRReports.getSDRReport(reportId).then(res => {
					this.currentReport = res;
					this.loading = false;
				}).catch(e => {
					console.error(' Report.find eek ', e);
					this.loading = false;
					throw e;
				});
			} else {
				let currentReport = {
					sdrDate: moment()
				};

				SDRReports.save(currentReport).then(res => {
					this.currentReport = res;
					this.$router.replace({ path: 'SDRReport', query: { reportId: res._id}});
					this.loading = false;
				});
			}
		},

		computed: {
			confirmDeleteExpenseLineMessage() {
				return "Are you sure you would like to delete the selected SDR Expense Line(s)?";
			},

			expenseFields() {
				let keys = allowedFields.expensLines.map(al => {
					let tmp = {};
					tmp.sortable = true;
					tmp.key = al;
					return tmp;
				});
				return keys;
			},
		}
	}
</script>