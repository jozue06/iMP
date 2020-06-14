<template>
	<div>
		<h1>add {{ formatQuarterToView(selectedQuarterOption) }} - {{ formatDate(quarterlyReport.selectedYear) }} </h1>
		<div class="top-qtr-container">
			<div class="small-grouping">
				<b-form-group label="Quarter">
					<b-form-select v-model="selectedQuarterOption" :options="quarterOptions">
					</b-form-select>
				</b-form-group>
			</div>
			<div class="small-grouping">
				<b-form-group label="Year">
					<!-- (!!!) MUST convert moment object to just year string after select before saving -->
					<yearSelector v-model="quarterlyReport.selectedYear" placeHolder="Please Select A Year"/>
				</b-form-group>
			</div>
			<div class="bass-amount mr-2">
				<b-form-group label="Base Amount">
					<b-input-group prepend="$">
						<b-form-input
							class="text-right"
							type="text" 
							v-model="quarterlyReport.baseAmount" 
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
		</div>
	</div>	
</template>

<script>
	import moment from 'moment';
	
	export default {
		props: {
			quarterlyReport: Object,
		},

		methods: {
			onSubmit() {
				// insertQuarterlyReport(this.form);
			// 	this.form = {};
			// 	this.$nextTick(() => {
			// 		this.$Notification("Success!", "Successfully Added the Contact");
			// 		this.$refs.quarterlyReport.reset();
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
</style>