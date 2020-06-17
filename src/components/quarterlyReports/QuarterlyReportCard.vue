<template>
	<section>
		<div class="main-card">
			<div>
				<QuarterlyReportTop v-bind:quarterlyReport="currentReport"/>
			</div>
			<div v-if="lines.length > 0">
				<b-table
					striped 
					hover 
					:fields="fields"
					:items="lines" 
					ref="reportTable"
					responsive="sm"
					selectable
					selected-variant="danger"
					@row-selected="onRowSelected"
				>
					<template v-slot:cell()="data">
						<b @click="showAddLineModal(data.item)" class="text-info">{{ data.value }}</b>
					</template>
				</b-table>
				<b-button 
					class="m-2" 
					variant="danger" 
					size="sm" 
					:disabled="selected == 0" 
					v-bind:selected="selected"
					v-b-modal.confirmModal>
						Delete selected
				</b-button>
				<b-button class="float-right m-2" size="sm" variant="primary" @click="showAddLineModal(null)"> + Add Line </b-button>
			</div>
			<router-link
				v-else-if="lines.length == 0" 
				to="/addQuarterlyReport"
				v-slot="{ href, route, navigate}"
			>
				<b-button :href="href" @click="navigate" variant="success" class="m-2" size="sm">
					New Quarterly Report
				</b-button>
			</router-link>

			<AddLineModal 
				v-bind:expenseLine="selectedLine" 
				ref="addLineModal"
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
	import AddLineModal from "../Modals/AddLineModal";
	import { QuarterlyReport as Report, ExpenseLine } from '../../data/models/quarterlyReportModel'
	import QuarterlyReportTop from './QuarterlyReportTop'
	import ConfirmModal from '../Modals/ConfirmModal'

	export default {
		components: {
			AddLineModal,
			QuarterlyReportTop,
			ConfirmModal,
		},

		methods: {
			showAddLineModal(rowItem) {
				if (rowItem) {
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
				lines: [],
				selectedLine: {},
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
					this.lines = report.expenseLines;
				}).catch(e => {
					console.log(' Report.find eek ', e);
				});
			} else {
				report = Report.create();
				this.currentReport = report;
			}
		},

		computed: {
			fields() {
				if (this.lines[0]) {
					return Object.keys(this.lines[0]).map(f => {
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
			}
		}
	}
</script>