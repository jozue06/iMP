<template>
	<div class="card mx-2">
		<div class="card-header">
			<h1>card header</h1>
		</div>
		<div class="card-body text-center">
			<h2>card body</h2>
			<!-- <div class="card-block"> -->
				<b-table-simple
					@row-clicked="$emit('showAddLineModal')"
				>
					<b-thead>
						<b-tr>
							<b-th></b-th>
							<b-th>date</b-th>
							<b-th>code</b-th>
							<b-th>description</b-th>
							<b-th>currency</b-th>
							<b-th>foreign amount</b-th>
							<b-th>exchange rate</b-th>
							<b-th>Dollar amt</b-th>
						</b-tr>
					</b-thead>
					<b-tbody>
						<b-tr>
							<b-td>
								<b-badge variant="danger">
									<b-link v-on:click="$emit('showDeleteLineModal')" class="text">
										(trashcan)
									</b-link>
								</b-badge>	
							</b-td>
							<b-td class="point">date</b-td>
							<b-td class="point">code</b-td>
							<b-td class="point">
								<b-link v-on:click="$emit('showAddLineModal')">
									description
								</b-link>
							</b-td>
							<b-td class="point">currency</b-td>
							<b-td class="point">foreign amount</b-td>
							<b-td class="point">exchange rate</b-td>
							<b-td class="point">Dollar amt</b-td>
						</b-tr>
					</b-tbody>
				</b-table-simple>
			<!-- </div>	 -->
		</div>
	</div>
</template>

<script>
	import moment from 'moment';
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