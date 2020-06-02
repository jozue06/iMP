<template>
	<div class="card mx-2">
		<div class="card-header">
			<h1>card header</h1>
		</div>
		<div class="card-body text-center">
			<!-- <h2>card body</h2> -->
			<b-button class="float-right mb-2" variant="success" @click="showAddLineModal"> add Line </b-button>
			<b-table
				striped 
				hover 
				ref="reportTable"
				:items="lines" 
				responsive="sm"
			>
				<template v-slot:cell(selected)="{ rowSelected }">
					<template v-if="rowSelected">
						<span aria-hidden="true">&check;</span>
						<span variant="danger" class="sr-only"></span>
					</template>
					<template v-else>
						<span aria-hidden="true">&nbsp;</span>
					</template>
				</template>
			</b-table>
		</div>
		{{ $log(lines) }}
		<AddLineModal ref="addLineModal"/>
	</div>
</template>

<script>
	import moment from 'moment';
	import "bootstrap/dist/css/bootstrap.css";
	import "bootstrap-vue/dist/bootstrap-vue.css";
	import AddLineModal from "../Modals/AddLineModal";
	import { findAllQuarterlyReports } from "../../data/data.js"

	export default {
		components: {
			AddLineModal,
		},

		methods: {
			showAddLineModal() {
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

			findAllQuarterlyReports() {
				let lines = [];
				findAllQuarterlyReports().then((data) => {
					data.forEach(da => {
						da.record.expenseLines.forEach(el =>{
							lines.push(el);
						});				
					});				
				});
				return lines;
			}
		},
		
		data() {
			console.log('return ? ' , this.findAllQuarterlyReports());
			
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

				lines: this.findAllQuarterlyReports(),
				
				quarterlyReport: {},
				quarterOptions: [
					{ value: null, text: 'Please Select a Quarter' },
					{ value: 1, text: 'First Quarter' },
					{ value: 2, text: 'Second Quarter' },
					{ value: 3, text: 'Third Quarter' },
					{ value: 4, text: 'Fourth Quarter' },
					
				],
				// countries: COUNTRIES.map(c => ({ value: c.name, text: c.name })),
				// states: STATES.map(c => ({ value: c.name, text: c.name }))
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