<template>
	<section class="add-quarterly-report">
		<QuarterlyReportTop />
		<!-- <h1>add {{ formatQuarterToView(selectedQuarterOption) }} - {{ formatDate(form.selectedYear) }} </h1>
		<div class="top-qtr-container">
			<div class="small-grouping">
				<b-form-group label="Quarter">
					<b-form-select v-model="selectedQuarterOption" :options="quarterOptions">
					</b-form-select>
				</b-form-group>
			</div>
			<div class="small-grouping">
				<b-form-group label="Year"> -->
					<!-- (!!!) MUST convert moment object to just year string after select before saving -->
					<!-- <yearSelector v-model="form.selectedYear" placeHolder="Please Select A Year"/>
				</b-form-group>
			</div>
			<div class="bass-amount mr-2">
				<b-form-group label="Base Amount">
					<b-input-group prepend="$">
						<b-form-input
							class="text-right"
							type="text" 
							v-model="form.baseAmount" 
							required
							placeholder="0.00"
							name="baseAmount"
							lazy-formatter
							:formatter="formatMoney"
						></b-form-input>
						<b-input-group-append>
							<b-button variant="outline-secondary">get funds</b-button>
						</b-input-group-append>
					</b-input-group>
				</b-form-group>
			</div>
		</div> -->

		<!-- BREAK -->

		<h3 class="mr-0">income</h3>
		<div class="text-left ml-2 mb-2">
			<b-button variant="outline-secondary">Import hsit</b-button>
		</div>
		<div class="mid-section mr-2 mb-2">
			<!-- <form @submit.prevent="onSubmit"> -->
				<div class="qtr-statements-container mr-2">
					<div class="sub-section">
					<div class="small-grouping ml-2">
						<b-form-group label="Statement Dates">
							<b-form-datepicker
								type="date"
								v-model="form.firstDate"
								required
								name="firstDate"
							></b-form-datepicker>
							<b-form-datepicker
								type="date"
								v-model="form.secondDate"
								required
								name="secondDate"
							></b-form-datepicker>
							<b-form-datepicker
								type="date"
								v-model="form.thirdDate"
								required
								name="thirdDate"
							></b-form-datepicker>

						</b-form-group> 
					</div>	
					<div class="small-grouping ml-2">
						<b-form-group label="Statement Amounts">
							<b-input-group prepend="$">
								<b-form-input 
									class="text-right"
									type="text" 
									v-model="form.firstAmount" 
									required
									placeholder="0.00"
									name="firstAmount"
									lazy-formatter
									:formatter="formatMoney"
								>
								</b-form-input>
							</b-input-group>
							<b-input-group prepend="$">
								<b-form-input
									class="text-right"
									type="text" 
									v-model="form.secondAmount" 
									required
									placeholder="0.00"
									name="secondAmount"
									lazy-formatter
									:formatter="formatMoney"
								>
								</b-form-input>
							</b-input-group>
							<b-input-group prepend="$">
								<b-form-input
									class="text-right"
									type="text" 
									v-model="form.thirdAmount" 
									required
									placeholder="0.00"
									name="thirdAmount"
									lazy-formatter
									:formatter="formatMoney"
								>
								</b-form-input>
							</b-input-group>
						</b-form-group> 
					</div>
					</div>
					<div class="sub-section border-top">
						<div class="small-grouping ml-2">
							<b-form-group label="Def Reimbursement">
								<b-input-group prepend="$">
									<b-form-input 
										class="text-right"
										type="text" 
										v-model="form.firstAmount" 
										required
										placeholder="0.00"
										name="firstAmount"
										lazy-formatter
										:formatter="formatMoney"
									>
									</b-form-input>
								</b-input-group>
							</b-form-group>
						</div>
						<div class="small-grouping ml-2">
							<b-form-group label="other income">
								<b-input-group prepend="$">
									<b-form-input
										class="text-right"
										type="text" 
										v-model="form.secondAmount" 
										required
										placeholder="0.00"
										name="secondAmount"
										lazy-formatter
										:formatter="formatMoney"
									>
									</b-form-input>
								</b-input-group>
							</b-form-group>
						</div>	
					</div>	
				</div>
			<!-- </form> -->
			<div class="qtr-misc-container">
				<h1>other misc</h1>
			</div>
		</div>
		<b-button type="submit" variant="primary">Submit</b-button>
	</section>
</template>

<script>
	import { insertQuarterlyReport } from '@/data/data';
	import moment from 'moment';
	import "bootstrap/dist/css/bootstrap.css";
	import "bootstrap-vue/dist/bootstrap-vue.css";
	import QuarterlyReportTop from './QuarterlyReportTop'

	export default {
		components: {
			QuarterlyReportTop
		},

		methods: {
			onSubmit() {
				insertQuarterlyReport(this.form);
			// 	this.form = {};
			// 	this.$nextTick(() => {
			// 		this.$Notification("Success!", "Successfully Added the Contact");
			// 		this.$refs.form.reset();
			// 	});
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
				
			}
			
		},

		data() {
			return {
				form: {},
				quarterOptions: [
					{ value: null, text: 'Please Select a Quarter' },
					{ value: 1, text: 'First Quarter' },
					{ value: 2, text: 'Second Quarter' },
					{ value: 3, text: 'Third Quarter' },
					{ value: 4, text: 'Fourth Quarter' },
					
				],
				selectedQuarterOption: null,
				// countries: COUNTRIES.map(c => ({ value: c.name, text: c.name })),
				// states: STATES.map(c => ({ value: c.name, text: c.name }))
			};
		},

		watch: {
			quarterlyReport: {
				handler(c) {
					this.form = c || {};
				},
				deep: true,
				immediate: true
			}
		},
	
	};
</script>

<style scoped>
	section {
		float: right;
		width: 80%;
	}

	/* .top-qtr-container {
		display: flex;
		margin-left: 2px;
	} */
	.mid-section {
		display: flex;
		flex-direction: row;
	}
	.qtr-statements-container {
		width: 40%;
		display: flex;
		flex-direction: column;
		margin-left: 2px;
		border: 1px solid grey;
		border-radius: 5px;
	}

	.qtr-misc-container {
		width: 60%;
		display: flex;
		flex-direction: column;
		margin-left: 2px;
		border: 1px solid grey;
		border-radius: 5px;
	}

	/* .sub-class {
		display: flex;
		align-self: flex-end;
	}
		*/
	.sub-section {
		width: 100%;
		display: flex;
	} 

	.qtr-container {
		display: flex;
		margin-left: 2px;
		border: 1px solid grey;
		border-radius: 5px;
	}

	.small-grouping {
		max-width: 200px;
		margin-right: 10px;
	}

	.bass-amount {
		margin-left: 40%;
	}
</style>