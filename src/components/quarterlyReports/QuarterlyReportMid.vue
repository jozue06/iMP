<template>
	<div>
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
									v-model="form.firstDate"
									required
									:date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
									locale="en"
									name="firstDate"
								></b-form-datepicker>
								<b-form-datepicker
									v-model="form.secondDate"
									required
									:date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
									locale="en"
									name="secondDate"
								></b-form-datepicker>
								<b-form-datepicker
									v-model="form.thirdDate"
									required
									:date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
									locale="en"
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
				<div class="sub-section">
					<div class="small-grouping ml-2">
						<b-form-group label="from donar">
							<p>small table1</p>

							<b-table
								striped 
								hover 
								small
								ref="selectableTable"
								:items="table1" 
								responsive="sm"
							>
							</b-table>
							<b-button type="add" class="sm float-left" variant="primary">+</b-button>
						</b-form-group> 
					</div>	
					<div class="small-grouping ml-2">
						<b-form-group label="personal steelings">
							<p>small table2</p>
							<b-table
								striped 
								hover 
								small
								ref="selectableTable"
								:items="table1" 
								responsive="sm"
							>
							</b-table>
							<b-button type="add" class="sm float-left" variant="primary">+</b-button>
						</b-form-group> 
					</div>
				</div>
				<div class="sub-section border-top">
					<div class="small-grouping ml-2">
						<b-form-group label="1">
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
						<b-form-group label="2">
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
					<div class="small-grouping ml-2">
						<b-form-group label="3">
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
					<div class="small-grouping ml-2">
						<b-form-group label="4">
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

				<div class="sub-section">
					<div class="small-grouping ml-2">
						<b-form-group label="personal off retain">
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
						<b-form-group label=" date 2">
							<b-form-datepicker
								v-model="form.firstDate"
								required
								:date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
								locale="en"
								name="firstDate"
							></b-form-datepicker>
						</b-form-group>
					</div>
				</div>
			</div>
		</div>  
	</div>  
</template>        


<script>
	import "bootstrap/dist/css/bootstrap.css";
	import "bootstrap-vue/dist/bootstrap-vue.css";

	export default {
		methods: {
			onSubmit() {
				// insertQuarterlyReport(this.form);
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
		},

		data() {
			return {
				form: {},
				table1: [{ nameAndAmount: ""}],
				
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
		max-width: 50%;
		margin-right: 10px;
	}
</style>