<template>
	<div class="card mx-2">
		<div class="card-header">
			<QuarterlyReportTop v-bind:quarterlyReport="currentReport"/>
		</div>
		<div class="card-body text-center">
			<b-button class="float-right mb-2" variant="success" @click="showAddLineModal(null)"> add Line </b-button>
			<b-table
				@row-clicked="showAddLineModal"
				striped 
				hover 
				:fields="fields"
				ref="reportTable"
				:items="lines" 
				responsive="sm"
			>
			</b-table>
		</div>
		<AddLineModal 
			v-bind:expenseLine="selectedLine" 
			ref="addLineModal"
			@submitExpenseLine="handleSubmitExpenseLine"
		/>		
	</div>
</template>

<script>
	import moment from 'moment';
	import AddLineModal from "../Modals/AddLineModal";
	import { QuarterlyReport as Report, ExpenseLine } from '../../data/models/quarterlyReportModel'
	import QuarterlyReportTop from './QuarterlyReportTop'

	export default {
		components: {
			AddLineModal,
			QuarterlyReportTop,
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
				this.currentReport.expenseLines.push(expenseLine);
				
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
				lines: [],
				selectedLine: {},
				currentReport: {},
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

<style scoped>
	section {
		float: right;
		width: 80%;
	}

	.top-qtr-container {
		display: flex;
		flex-direction: row;
		margin-left: 2px;
	}	

	.small-grouping {
		max-width: 200px;
		margin-right: 10px;
	}
	.bass-amount {
		margin-left: 40%;
	}
	.point {
		cursor: pointer;
	}
</style>