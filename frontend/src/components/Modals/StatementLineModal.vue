<template>
	<section>
		<b-modal 
			top 
			ref="statementLineModal" 
			title="statement-line-modal Component" 
			hide-footer 
		>

			<b-row v-if="!statementLine.contact" class="justify-content-around">
				<b-col cols="6" class="text-center">
					<ContactSearchComponent @contactClicked="contactSelected" />
				</b-col>
			</b-row>

			<b-row class="mb-4">
				<b-col cols="6" class="text-center">
					<p>Date</p>
					<b-form-datepicker
						v-model="statementLine.date"

						:date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
						locale="en"
						name="date"
					/>
				</b-col>
				<b-col cols="6" class="text-center">
					<p>Statement Month</p>
					<b-form-datepicker
						v-model="statement.date"
						disabled
						locale="en"
						name="statementMonth"
					/>
				</b-col>
			</b-row>

			<b-row  class="mb-4">
				<b-col cols="6" class="text-center">
					<p>Amount</p>
					<b-input-group prepend="$">
						<b-form-input 
							class="text-right"
							type="text" 
							v-model="statementLine.amount" 
							placeholder="0.00"
							name="amount"
							lazy-formatter
							:formatter="$formatMoney"
						/>
					</b-input-group>
				</b-col>
				<b-col cols="6" class="text-center">
					<p>Class</p>
					<b-input-group>
						<b-form-select 
							v-model="statementLine.class"
						>
							<option value=00>00</option>
							<option value=04>04</option>
							<option value=09>09</option>
						</b-form-select>
					</b-input-group>
				</b-col>
			</b-row>

			<b-row class="mb-4">
				<b-col cols="6" class="text-center">
					<p>Pledge Date</p>
					<b-form-datepicker
						v-model="statementLine.pledgeDate"
						:date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
						locale="en"
						name="date"
					/>
				</b-col>
				<b-col cols="6" class="text-center">
					<p>Pledge Amount</p>
					<b-input-group prepend="$">
						<b-form-input 
							class="text-right"
							type="text" 
							v-model="statementLine.pledgeAmount" 
							placeholder="0.00"
							name="amount"
							lazy-formatter
							:formatter="$formatMoney"
						/>
					</b-input-group>
				</b-col>
			</b-row>
			<b-row class="mb-4">
				<b-col cols="6" class="text-center">
					<p>Year-to-date Amount</p>
					<b-input-group prepend="$">
						<b-form-input 
							class="text-right"
							type="text" 
							v-model="statementLine.yearToDateAmount" 
							placeholder="0.00"
							name="yearToDateAmount"
							lazy-formatter
							:formatter="$formatMoney"
						/>
					</b-input-group>
				</b-col>
				<b-col cols="6" class="text-center">
					<p>Receipt Count</p>
					<b-input-group>
						<b-form-input
							v-model="statementLine.receiptCount"
							class="text-right"
							type="number"
							name="receiptCount"
						/>
					</b-input-group>
				</b-col>
			</b-row>
			<b-button class="mb-2 float-right" size="sm" variant="primary" @click="save">Save</b-button>
		</b-modal>
	</section>
</template>

<script>
	import { Statements } from '../../data/statements';
	import ContactSearchComponent from "../Globals/ContactSearchComponent.vue";
	export default  {

		name: "statementLineModal",

		components: {
			ContactSearchComponent,

		},

		props: {
			statementLine: Object,
			statement: Object,
		},

		mounted() {

		},

		data() {
			return {
				loading: false,
			}
		},

		methods: {
			contactSelected(selectedContact) {
				this.statementLine.contact = selectedContact;
			},

			save() {
				this.loading = true;
				this.statementLine.statement = this.statement._id;
				Statements.saveLine(this.statementLine).then(res => {
					this.loading = false;
					this.$refs.statementLineModal.hide();
					this.$Notification("Success!", "Successfully saved the Statement Line", "primary");
					this.$emit("refresh", res)
				}).catch(e => {
					console.error('eek');
					this.$Notification("Error", `Error Saving the Statement Line: ${e.message}`, "warning", 6000);
					this.loading = false;
				});
			}
		},

		computed: {

		}
}

</script>