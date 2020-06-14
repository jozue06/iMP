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
		props: {
			quarterlyReport: Object,
		},

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

				let value = Number(amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");

				return value;
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
						return "1st Quarter"
					case 2: 
						return "2nd Quarter"
					case 3: 
						return "3rd Quarter"
					case 4: 
						return "4th Quarter"

					default: "No Quarter Selected"
				}
			},

			getQuarterlyReport() {
				if (this.quarterlyReport && this.quarterlyReport._id) {
					return Report.find( { _id: this.quarterlyReport._id} ).then(res => {
						console.log(' Report.find res ' , res);
						
					}).catch(e => {
						console.log(' Report.find eek ', e);
					});
				} else {
					let report = Report.create()					
					return report;
				}
			}
		},
		
		data() {			
			return {
				// fields:[	
				// 	"",
				// 	"date",
				// 	"code",
				// 	"description",
				// 	"currency",
				// 	"foreign amount",
				// 	"exchange rate",
				// 	"Dollar amt",
				// ],

				lines: [],
				selectedLine: {},
				currentReport: this.getQuarterlyReport(),
				quarterOptions: [
					{ value: null, text: 'Please Select a Quarter' },
					{ value: 1, text: 'First Quarter' },
					{ value: 2, text: 'Second Quarter' },
					{ value: 3, text: 'Third Quarter' },
					{ value: 4, text: 'Fourth Quarter' },
					
				],
			};
		},

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