<template>
	<section class="add-line-modal">
		<b-modal size="lg" top ref="expenseLineModal" title="Add Expense Line" hide-footer v-bind:currentReport="currentReport" v-bind:expenseLine="expenseLine">
			<b-tabs content-class="mt-3">
				<b-tab title="Expense Info" active>
					<div class="row sub-section text-center">
						<b-form-group class="mr-1" label="Date">
							<b-form-datepicker
								v-model="expenseLine.date"
								required
								:date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
								locale="en"
								name="firstDate"
							></b-form-datepicker>
						</b-form-group> 

						<b-form-group class="mr-1" label="Method">
							<b-input-group>
								<b-form-input 
									class="text-right"
									type="text" 
									v-model="expenseLine.paymentMethod" 
									required
									name="paymentMethod"
								>
								</b-form-input>
							</b-input-group>
						</b-form-group> 
					</div>

					<div class="row sub-section text-center">
						<b-form-group class="mr-1" label="Code">
						<!-- NEED TO CHAGNE THIS TO AN INPUT SELECT OF NUMBER CODE AND DESCRIPTION -->
							<b-input-group>
								<b-form-input 
									class="text-right"
									type="text" 
									v-model="expenseLine.code" 
									name="code"
									lazy-formatter
									:formatter="formatToNumber"
								>
								</b-form-input>
							</b-input-group>
						</b-form-group> 

						<b-form-group class="mr-1" label="Code Description">
							<b-input-group>
								<b-form-input 
									class="text-right"
									type="text" 
									v-model="expenseLine.codeDescription" 
									required
									name="codeDescription"
								>
								</b-form-input>
							</b-input-group>
						</b-form-group> 
					</div>

					<div class="row sub-section text-center">
						<b-form-group class="mr-1" label="Currency">
							<b-form-select 
								v-model="expenseLine.currency" 
								:options="currencyOptions"
							>
							</b-form-select>
						</b-form-group>

						<b-form-group class="mr-1" label="Exchange Rate">
							<b-input-group>
								<b-form-input 
									class="text-right"
									type="text" 
									v-model="expenseLine.exchangeRate" 
									required
									placeholder="0.00"
									name="exchangeRate"
									lazy-formatter
									:formatter="$formatMoney"
								>
								</b-form-input>
							</b-input-group>
						</b-form-group> 
					</div>

					<div class="row sub-section text-center">
						<b-form-group class="mr-1" label="Foreign Amount">
							<b-input-group prepend="$">
								<b-form-input 
									class="text-right"
									type="text" 
									v-model="expenseLine.foreignAmount" 
									required
									placeholder="0.00"
									name="foreignAmount"
									lazy-formatter
									:formatter="$formatMoney"
								>
								</b-form-input>
							</b-input-group>
						</b-form-group> 

						<b-form-group class="mr-1" label="Dollar Amount">
							<b-input-group prepend="$">
								<b-form-input 
									class="text-right"
									type="text" 
									v-model="expenseLine.dollarAmount" 
									required
									placeholder="0.00"
									name="dollarAmout"
									lazy-formatter
									:formatter="$formatMoney"
								>
								</b-form-input>
							</b-input-group>
						</b-form-group> 
					</div>

					<div class="row sub-section text-center" >
						<b-form-group class="mr-1 description" label="Description">
							<b-form-textarea
								v-model="expenseLine.description"
								rows="3"
								max-rows="6"
							>
							</b-form-textarea>
						</b-form-group> 
					</div>
							
				</b-tab>
<!-- 
				<b-tab title="Second">
					<div class="row sub-section text-center">
						<b-form-group class="mr-1" label="multiPart">
							<b-form-select 
								v-model="expenseLine.multiPart" 
								:options="['No', 'Yes']"
							>
							</b-form-select>
						</b-form-group>
						<b-form-group class="mr-1" label="is req">
							<b-form-select 
								v-model="expenseLine.receiptReq" 
								:options="['No', 'Yes']"
							>
							</b-form-select>
						</b-form-group>
					</div>
				</b-tab> -->

				<b-tab 
					title="Image" 
					:disabled="expenseLine.receiptReq == 'No'"
				>
					<div class="row sub-section">
						<b-form-group v-if="!previewPath" class="mr-1" label="Receipt Image">
							<b-form-file
								v-model="expenseReceiptFile"
								accept=".jpg, .png">
							</b-form-file>
						</b-form-group>
						<img v-else :src=previewPath alt="left">
						<b-button 
							v-if="expenseReceiptFile && expenseLine._id && !previewPath" 
							class="float-right" 
							type="submit" 
							@click="upload" 
							variant="primary"
						>
							Upload
						</b-button>
					</div>
				</b-tab>
			</b-tabs>
			<b-button class="float-right" type="submit" @click="onSubmit" variant="primary">Submit</b-button>
		</b-modal>
	</section>
</template>

<script>
	import { ExpenseLines } from "../../data/expenseLines";

	export default  {
		name: 'expenseLineModal',

		props: {
			expenseLine: Object,
			currentReport: Object,
			expenseLineType: Number,
		},

		updated () {
			if (this.expenseLine && this.expenseLine.imageURL) {
				this.previewPath = this.expenseLine.imageURL;
			}
		},

		data() {
			return {
				expenseReceiptFile: null,
				didUpload: false,
				previewPath: "",
				currencyOptions: [
					{ value: "USD", text: 'USD' },
					{ value: 'CAN', text: 'CAN' },
				]
			};
		},
		
		methods: {
			upload() {
				ExpenseLines.uploadPhoto(this.expenseLine._id, this.expenseReceiptFile).then(res => {
					this.previewPath = res.imageURL;
					this.didUpload = true;
				}).catch(e => {
					console.error(' uploadPhoto error ', e);
				});
			},

			onSubmit() {
				if (this.expenseReceiptFile && !this.didUpload) {
					return alert("You Have not uploaded your Photo, please click upload or remove the photo before saving");
				}

				this.loading = true;

				ExpenseLines.save(this.expenseLine, this.expenseLineType, this.expenseReceiptFile, this.currentReport._id).then(res => {
					this.$refs.expenseLineModal.hide();
					this.$Notification("Success!", "Successfully Added the Expense Line");
					this.loading = false;
					
					if (this.currentReport.expenseLines && !this.currentReport.expenseLines.includes(res)) {
						this.currentReport.expenseLines.push(res);
					}
				}).catch(e => {
					console.error('eeek ', e);
					this.$Notification("Error", `Error Saving Expense Line: ${e}`, "warning", "", 3000);
					this.loading = false;
					throw e;
				});
			},

			formatToNumber(string) {
				return Number(string);
			},
		},

		computed: {
		},
	}
</script>

<style scoped lang="scss">
	.sub-section {
		display: flex;
		justify-content: center;
		width: 100%;

		.description {
			width: 500px;
		}
	} 
</style>