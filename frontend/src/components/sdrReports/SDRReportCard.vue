<template>
	<section>
		<div class="main-card">
			<div class="mt-4">
				<ReportTop v-bind:currentReport="currentReport" reportType="sdr" linkTo="/SDRReports"/>
			</div>

			<b-row class="justify-content-around">
				<b-col class="my-2">
					<b-button size="sm" v-b-toggle.collapse-info variant="info">More Details</b-button>
				</b-col>
			</b-row>

			<b-collapse id="collapse-info">
				<ReportMoreInfo v-bind:currentReport="currentReport" reportType="sdr" @saveReport="saveReport"/>
			</b-collapse>
			<b-tabs pills card end>
				<b-tab title="Itineration ExpenseLines" active>
					<h4>Itineration Expense Lines</h4>
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
						placeholder="Leave a note or a prayer request ..."
						rows="6"
						max-rows="12"
						debounce="2000"
						@blur="saveReport"
					>
					</b-form-textarea>
				</b-tab>
			</b-tabs>
		</div>	
	</section>
</template>

<script>
	import moment from 'moment';
	import ReportTop from "../Globals/ReportTop";
	import ReportMoreInfo from "../Globals/ReportMoreInfo";
	import ConfirmModal from "../Modals/ConfirmModal";
	import { SDRReports  } from '../../data/sdrReports'

	export default {
		components: {
			ReportTop,
			ReportMoreInfo,
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
			}
		},
		
		data() {
			return {
				loading: false,
				currentReport: {},
			};
		},

		created() {
			if (this.$router.currentRoute.params.reportId || this.$router.currentRoute.query.reportId) {
				let reportId;
				if (this.$router.currentRoute.params.reportId) {
					reportId = this.$router.currentRoute.params.reportId;
					this.$router.push({ path: 'SDRReport', query: { reportId: reportId}});
				} else {
					reportId = this.$router.currentRoute.query.reportId;
				}
				
				MAReports.getMaReport(reportId).then(res => {
					this.currentReport = res;
				}).catch(e => {
					console.error(' Report.find eek ', e);
				});
			} else {
				this.currentReport = {
					month: 1,
					year: moment().format("YYYY"),
				};
			}
		},
	}
</script>