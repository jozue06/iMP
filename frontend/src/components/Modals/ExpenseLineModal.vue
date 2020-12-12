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
								name="date"
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

					<ExpenseCodeSelector :expenseLine="expenseLine" :expenseLineType="expenseLineType" />

					<div class="row sub-section text-center">
						<b-form-group class="mr-1" label="Currency">
							<b-form-select 
								v-model="expenseLine.currency" 
								:options="currencyOptions"
							>
							</b-form-select>
						</b-form-group>						
						<b-form-group v-if="expenseLine.currency !== 'USD'" class="mr-1" label="Exchange Rate">
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
									@blur="setDollarAmount()"
								>
								</b-form-input>
							</b-input-group>
						</b-form-group> 
					</div>

					<div class="row sub-section text-center">
						<b-form-group v-if="expenseLine.currency !== 'USD'"  class="mr-1" label="Foreign Amount">
							<b-input-group :prepend=expenseLine.currency>
								<b-form-input 
									class="text-right"
									type="text" 
									v-model="expenseLine.foreignAmount" 
									required
									placeholder="0.00"
									name="foreignAmount"
									lazy-formatter
									:formatter="$formatMoney"
									@blur="setDollarAmount()"
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
									name="dollarAmount"
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
								@change="selectFile"
								v-model="expenseReceiptFile"
								accept=".jpg, .png">
							</b-form-file>
						</b-form-group>
						<div v-else>
							<img :src=previewPath alt="left" style="max-width:350px; max-height:350px">
							<b-button @click="deleteImage" class="float-right" variant="danger"> X </b-button>
						</div>

						<b-button 
							v-if="showUploadBtn && !previewPath" 
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
	import ExpenseCodeSelector from '../Globals/ExpenseCodeSelector.vue';
	import { ExpenseLines } from "../../data/expenseLines";
	import { Settings } from "../../data/userSettings";
	export default  {
  components: { ExpenseCodeSelector },
		name: 'expenseLineModal',

		props: {
			expenseLine: Object,
			currentReport: Object,
			expenseLineType: Number,
		},

		created() {
			Settings.getSettings().then(settings => {
				this.userSettings = settings;
			});
		},

		data() {
			return {
				expenseReceiptFile: null,
				needsUpload: false,
				fileSelected: false,
				showUploadBtn: false,
				userSettings: {},
			};
		},
		
		methods: {
			setDollarAmount() {
				this.expenseLine.dollarAmount = (this.expenseLine.foreignAmount * this.expenseLine.exchangeRate).toFixed(2);
			},

			selectFile() {
				this.fileSelected = true;
				if (this.expenseLine._id) {
					this.needsUpload = true;
					this.showUploadBtn = true;
				}
			},
			
			upload() {
				ExpenseLines.uploadPhoto(this.expenseLine._id, this.expenseReceiptFile).then(res => {
					this.expenseLine = res;
					this.needsUpload = false;
					this.expenseReceiptFile = null;
					this.showUploadBtn = false;
				}).catch(e => {
					console.error(' uploadPhoto error ', e);
				});
			},

			onSubmit() {
				if (this.fileSelected && this.needsUpload) {
					return alert("You Have not uploaded your Photo, please click upload or remove the photo before saving");
				}

				this.loading = true;

				ExpenseLines.save(this.expenseLine, this.expenseLineType, this.expenseReceiptFile, this.currentReport._id).then(res => {					
					if (this.currentReport.expenseLines && !this.currentReport.expenseLines.find(l => l._id === res._id)) {
						this.currentReport.expenseLines.push(res);
					}

					this.$Notification("Success!", "Successfully Added the Expense Line");
					this.$refs.expenseLineModal.hide();
					this.loading = false;
					this.expenseReceiptFile = null;
					this.$emit("saved");
				}).catch(e => {
					this.$Notification("Error", `Error Saving Expense Line: ${e.message}`, "warning", "", 6000);
					this.loading = false;
				});
			},

			formatToNumber(string) {
				return Number(string);
			},

			deleteImage() {
				ExpenseLines.deletePhoto(this.expenseLine).then(res => {
					this.expenseLine.imageURL = "";
				}).catch(e => {
					console.error('eek ', e);
					throw e;
				});
			}
		},

		computed: {
			previewPath() {
				if (this.expenseLine.imageURL) {
					return this.expenseLine.imageURL;
				}

				return "";
			},

			currencyOptions() {
				if (this.userSettings && this.userSettings.userCurrencies && this.userSettings.userCurrencies.length) {
					return this.userSettings.userCurrencies.map(c => {
						return {value: c.code, text: c.code}
					});
				}
				return [
					{ value: "USD", text: 'USD' },
					{ value: 'CAN', text: 'CAN' },
				]
			}
		},
	}
</script>