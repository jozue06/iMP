<template>
	<section>
		<LoadingSpinner v-bind:loading="loading" />

		<div v-if="!loading" class="main-card">
			<router-link to="/statementList">
				<h3 class="pt-2">Statement Info {{ statement.date }} </h3>
			</router-link>
			<h1></h1>
			<b-row v-if="statement" align-h="start" @click="showStatementModal(statement)" class="align-items-center mt-2 mx-5">
				<b-col cols='3'>
					<h6>
						Statement Date
					</h6>
					<p v-if="statement.date">{{statement.date}}</p>
					<p v-else><i>No Date</i></p>
				</b-col>
				<b-col cols='3'>	
					<h6>
						Statement Amount 
					</h6>
					${{statement.amount}}
				</b-col>
				<b-col cols='3'>
					<h6>
					Reimbursement Amount
					</h6>
					${{statement.reimbursementAmount}}
				</b-col>
			</b-row>
			<b-row class="align-items-center">
				<b-col cols="12">
					<b-button @click="showStatementModal()" variant="primary" class="m-2" size="sm">+ Edit Statement Info</b-button>
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
		</div>
		<StatementLinesTable 
			ref="statementLinesTable" 
			v-bind:statement="statement" 
			v-bind:selected="selected" 
			@onRowSelected="onRowSelected" 
			@showStatementLineModal="showStatementLineModal" 
			@handleConfirmDelete="handleConfirmDelete"
		/>
		<StatementModal 
			ref="statementModal" 
			@refresh="saveReport"
			v-bind:statement="statement"
			v-bind:statementReimbursementTotal="statementReimbursementTotal"
		/>
		<StatementLineModal
			ref="statementLineModal"
			v-bind:statementLine="statementLine"
			v-bind:statement="statement"
			@refresh="refresh"
		/>
	</section>
</template>

<script>
	import { Statements } from "../../data/statements";
	import StatementModal from "../Modals/StatementModal.vue";
	import LoadingSpinner from "../Globals/LoadingSpinner.vue";
	import StatementLinesTable from './StatementLinesTable.vue';
	import StatementLineModal from '../Modals/StatementLineModal.vue';

	export default  {
		name: 'statementCard',

		components: {
			LoadingSpinner,
			StatementModal,
			StatementLinesTable,
			StatementLineModal
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
			} else {
				let newStatement = {}
				Statements.save(newStatement).then(res => {
					this.statement = res;
					this.loading = false;
				}).catch(e => {
					console.error(' Statements.save Statement eek ', e);
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
				statementLine: {},
			};
		},

		methods: {
			showStatementModal() {
				this.$refs.statementModal.$refs.statementModal.show();
			},

			showStatementLineModal(item) {
				if (item) {
					this.statementLine = item;
				} else {
					this.statementLine = {};
				}
				this.$refs.statementLineModal.$refs.statementLineModal.show();
			},

			saveReport() {

			},
			
			onRowSelected(item) {
				this.selected = item;
			},

			refresh(statement) {
				this.statement = statement;
			},

			onSaved() {
				Statements.getStatementWithLines(this.statement._id).then(res => {
					this.statement = res;
				});
			},

			handleConfirmDelete(ids) {
				Statements.deleteStatementLines(this.statement, ids).then(res => {
					this.onSaved();
					this.$Notification("Deleted", "Deleted the selected Statement Lines", "warning", "", 3000);
				}).catch(e => {
					console.error('e', e);
					throw e;
				});
			},
		},

		computed: {
			statementReimbursementTotal() {
				let amt = 0;
				if (this.statement) {
					if (this.statement.reimbursementAmount) {
						amt = this.$addMoney(amt, this.statement.reimbursementAmount);
					}
				}
				return "$" + this.$formatMoney(amt);
			},

			statementAmountTotal() {
				let amt = 0;
				
				if (this.statement) {
					if (this.statement.amount) {
						amt = this.$addMoney(amt, this.statement.amount);
					}
				}
				
				return "$" + this.$formatMoney(amt);
			},
		}
}

</script>