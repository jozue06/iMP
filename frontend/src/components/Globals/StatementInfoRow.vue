<template>
	<b-col cols="6" class="my-2" style="border-right: solid 1px #ced4da;">
		<label>
			Statement Info
		</label>
		<b-col>				
			<b-row v-if="currentReport.statements && currentReport.statements.length" class="align-items-center mt-2">
				<b-col v-for="(statement, id) in currentReport.statements" :key="`${id}`" @click="showStatementModal(statement)" cols='4'>
					{{statement.date}}
					<br>
					${{statement.amount}}
					<br>
					${{statement.reimbursementAmount}}
				</b-col>
				<b-row class="mt-2 mb-2 text-right">
					<b-col cols="12" class="text-right">
						Totals
						<br>
						Statements Total: {{statementAmountTotal}}
						<br>
						Reimbursement Total: {{statementReimbursementTotal}}
					</b-col>
				</b-row>
			</b-row>
			<b-row v-if="currentReport.statements && currentReport.statements.length < 3" class="align-items-center">
				<b-col cols="12">
					<b-button @click="showStatementModal(null)" variant="primary" class="m-2" size="sm">+ Add statement info</b-button>
				</b-col>
			</b-row>
		</b-col>
	</b-col>
</template>

<script>
	export default  {

		name: 'statement-info-row',

		components: {

		},

		props: {
			currentReport: Object
		},

		mounted() {

		},

		data() {
			return {

			}
		},

		methods: {
			showStatementModal(selectedStatement) {
				this.$emit("showStatementModal", selectedStatement);
			}
		},

		computed: {
			statementAmountTotal() {
				let amt = 0;
				if (this.currentReport.statements) {
					this.currentReport.statements.forEach(statement => {
						amt = this.$addMoney(amt, statement.amount);
					});
				}
				
				return "$" + this.$formatMoney(amt);
			},

			statementReimbursementTotal() {
				let amt = 0;
				if (this.currentReport.statements) {
					this.currentReport.statements.forEach(statement => {
						amt = this.$addMoney(amt, statement.reimbursementAmount);
					});
				}

				return "$" + this.$formatMoney(amt);
			},
		}
}

</script>