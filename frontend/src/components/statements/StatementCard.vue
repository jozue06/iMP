<template>
	<section>
		<LoadingSpinner v-bind:loading="loading" />

		<div v-if="!loading" class="main-card">
			<h1>Statement Info</h1>
			<b-row v-if="statement && (statement.dateOne || statement.dateTwo || statement.dateThree)" @click="showStatementModal(statement)" class="align-items-center mt-2">
				
				<b-col cols='4'>
					<h6>
						First Month
					</h6>
					<p v-if="statement.dateOne">{{statement.dateOne}}</p>
					<p v-else><i>No Date</i></p>
					Statement Amount 
					<br>
					${{statement.amountOne}}
					<br>
					Reimbursement Amount
					<br> 
					${{statement.reimbursementOne}}
				</b-col>
				
				<b-col cols='4'>
					<h6>
						Second Month
					</h6>
					<p v-if="statement.dateTwo">{{statement.dateTwo}}</p>
					<p v-else><i>No Date</i></p>
					Statement Amount 
					<br>
					${{statement.amountTwo}}
					<br>
					Reimbursement Amount
					<br> 
					${{statement.reimbursementTwo}}
				</b-col>

				<b-col cols='4'>
					<h6>
						Third Month
					</h6>
					<p v-if="statement.dateThree">{{statement.dateThree}}</p>
					<p v-else><i>No Date</i></p>
					Statement Amount
					<br>
					${{statement.amountThree}}
					<br>
					Reimbursement Amount
					<br>
					${{statement.reimbursementThree}}
				</b-col>
			</b-row>
			<b-row class="mt-4 mr-2" align-h="end">
				<b-col cols="2" align-self="end">
					<tr>
						<td class="text-left">
							<b>Totals</b>
						</td>
						<td class="text-right">
						</td>
					</tr>
					<tr>
						<td class="text-left">
							<b>Statements Total:</b>
						</td>
						<td class="text-right">
							<b><i>{{statementAmountTotal}}</i></b>
						</td>
					</tr>
					<tr>
						<td class="text-left mr-2">
							<b>Reimbursement Total:</b>
						</td>
						<td class="text-right">
							<b><i>{{statementReimbursementTotal}}</i></b>
						</td>
					</tr>
				</b-col>
			</b-row>

			<b-row class="align-items-center">
				<b-col cols="10">
					<b-button @click="showStatementModal()" variant="primary" class="m-2" size="sm">+ Edit Statement Info</b-button>
				</b-col>
			</b-row>
		</div>
		<StatementLinesTable ref="statementLinesTable" v-bind:statement="statement" @onRowSelected="onRowSelected" v-bind:selected="selected" />
		<StatementModal 
			ref="statementModal" 
			@refresh="saveReport"
			v-bind:statement="statement"
			v-bind:statementReimbursementTotal="statementReimbursementTotal"
		/>
	</section>
</template>

<script>
	import { Statements } from "../../data/statements";
	import StatementModal from "../Modals/StatementModal.vue";
	import LoadingSpinner from "../Globals/LoadingSpinner.vue";
	import StatementLinesTable from './StatementLinesTable.vue';

	export default  {
		name: 'statementCard',

		components: {
			LoadingSpinner,
			StatementModal,
			StatementLinesTable
		},

		created() {
			this.loading = true;
			if (this.$router.currentRoute.params.statementId || this.$router.currentRoute.query.statementId) {
				let statementId;
				if (this.$router.currentRoute.params.statementId) {
					statementId = this.$router.currentRoute.params.statementId;
					this.$router.replace({ path: 'statementCard', query: { statementId: statementId}});
				} else {
					statementId = this.$router.currentRoute.query.statementId;
				}
				
				Statements.getStatementWithLines(statementId).then(res => {
					this.statement = res;
					this.loading = false;
				}).catch(e => {
					console.error(' Statements.getStatement eek ', e);
					this.loading = false;
					throw e;
				});
			}
		},

		data() {
			return {
				loading: false,
				statement: {},
				selected: [],
			};
		},

		methods: {
			showStatementModal() {
				this.$refs.statementModal.$refs.statementModal.show();
			},

			saveReport() {

			},
			
			onRowSelected() {

			}
		},

		computed: {
			statementReimbursementTotal() {
				let amt = 0;
				if (this.statement) {
					if (this.statement.reimbursementOne) {
						amt = this.$addMoney(amt, this.statement.reimbursementOne);
					}

					if (this.statement.reimbursementTwo) {
						amt = this.$addMoney(amt, this.statement.reimbursementTwo);
					}

					if (this.statement.reimbursementThree) {
						amt = this.$addMoney(amt, this.statement.reimbursementThree);
					}
				}
				
				return "$" + this.$formatMoney(amt);
			},

			statementAmountTotal() {
				let amt = 0;
				console.log('this.statement.amountOne ?? ', this.statement.amountOne);
				
				if (this.statement) {
					if (this.statement.amountOne) {
						amt = this.$addMoney(amt, this.statement.amountOne);
					}

					if (this.statement.amountTwo) {
						amt = this.$addMoney(amt, this.statement.amountTwo);
					}

					if (this.statement.amountThree) {
						amt = this.$addMoney(amt, this.statement.amountThree);
					}
				}
				
				return "$" + this.$formatMoney(amt);
			},
		}
}

</script>