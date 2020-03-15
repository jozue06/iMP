<template>
	<section class="add-quarterly-report">
		<h1>add</h1>
		<b-form-select v-model="form.quarter">
			<b-form-select-option :value="null">Please select an Quarter</b-form-select-option>
			<b-form-select-option value="1">1st Quarter</b-form-select-option>
			<b-form-select-option value="2">2nd Quarter</b-form-select-option>
			<b-form-select-option value="3">3rd Quarter</b-form-select-option>
			<b-form-select-option value="4">4th Quarter</b-form-select-option>
		</b-form-select>
		<yearSelector v-model="form.selectedYear" />
		{{ form.selectedYear }}
		<h3 class="mr-0">income</h3>
		<form @submit.prevent="onSubmit">
			<div class="top-qtr-container">
				<div class="small-grouping">
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
				<div class="small-grouping">
					<b-form-group label="Statement Amounts">
						<b-form-input
							type="text" 
							v-model="form.firstAmount" 
							required
							name="firstAmount"
							lazy-formatter
							:formatter="formatMoney"
						>
						</b-form-input>
						<b-form-input
							type="text" 
							v-model="form.secondAmount" 
							required
							name="secondAmount"
							lazy-formatter
							:formatter="formatMoney"
						>
						</b-form-input>
						<b-form-input
							type="text" 
							v-model="form.thirdAmount" 
							required
							name="thirdAmount"
							lazy-formatter
							:formatter="formatMoney"
						>
						</b-form-input>
					</b-form-group> 
				</div>	
			</div>
			<b-button type="submit" variant="primary">Submit</b-button>
		</form>
	</section>
</template>

<script>
	import { insertQuarterlyReport } from '@/data/data'
	// import { yearSelector } from '../Modals/YearSelector'
	import "bootstrap/dist/css/bootstrap.css";
	import "bootstrap-vue/dist/bootstrap-vue.css";

	export default {
		// components: {
		// 	yearSelector,
		// },
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
				let removeDollarSign = amount.replace("$", "");	
				
				if (isNaN(Number(removeDollarSign))) {
					return 0;
				}

				let value = "$ " + Number(removeDollarSign).toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");

				return value;
			}
			
		},

		data() {
			return {
				form: {},
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
	/* .add-quarterly-report {
		display: inline;
	} */
	.top-qtr-container {
		display: flex;
		margin-left: 2px;
	}
	.small-grouping {
		max-width: 200px;
		margin-right: 10px;
		
		/* float: right; */
	}
</style>