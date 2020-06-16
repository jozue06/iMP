<template>
	<section class="add-line-modal">
		<b-modal size="lg" centered ref="addLineModal" title="add-line-modal Component" hide-footer v-bind:expenseLine="expenseLine">
			<b-tabs content-class="mt-3">
				<b-tab title="First" active>
					<div class="row sub-section text-center">
						<b-form-group class="mr-1" label="date">
							<b-form-datepicker
								v-model="expenseLine.date"
								required
								:date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
								locale="en"
								name="firstDate"
							></b-form-datepicker>
						</b-form-group> 

						<b-form-group class="mr-1" label="method">
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
						<b-form-group class="mr-1" label="code">
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

						<b-form-group class="mr-1" label="code description">
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
						<b-form-group class="mr-1" label="currency">
							<b-form-select 
								v-model="expenseLine.currency" 
								:options="currencyOptions"
							>
							</b-form-select>
						</b-form-group>

						<b-form-group class="mr-1" label="exchange rate">
							<b-input-group>
								<b-form-input 
									class="text-right"
									type="text" 
									v-model="expenseLine.exchangeRate" 
									required
									placeholder="0.00"
									name="exchangeRate"
									lazy-formatter
									:formatter="formatMoney"
								>
								</b-form-input>
							</b-input-group>
						</b-form-group> 
					</div>

					<div class="row sub-section text-center">
					<b-form-group class="mr-1" label="foreign moneys">
							<b-input-group prepend="$">
								<b-form-input 
									class="text-right"
									type="text" 
									v-model="expenseLine.foreignAmount" 
									required
									placeholder="0.00"
									name="foreignAmount"
									lazy-formatter
									:formatter="formatMoney"
								>
								</b-form-input>
							</b-input-group>
						</b-form-group> 

						<b-form-group class="mr-1" label="merica moneys">
							<b-input-group prepend="$">
								<b-form-input 
									class="text-right"
									type="text" 
									v-model="expenseLine.dollarAmount" 
									required
									placeholder="0.00"
									name="dollarAmout"
									lazy-formatter
									:formatter="formatMoney"
								>
								</b-form-input>
							</b-input-group>
						</b-form-group> 
					</div>

					<div class="row sub-section text-center" >
						<b-form-group class="mr-1 description" label="description">
							<b-form-textarea
								v-model="expenseLine.description"
								rows="3"
								max-rows="6"
							>
							</b-form-textarea>
						</b-form-group> 
					</div>
							
				</b-tab>

				<!-- <b-tab title="Second">
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
				</b-tab>

				<b-tab 
					title="Image" 
					:disabled="expenseLine.receiptReq == 'No'"
				>
					<div class="row sub-section">
						<b-form-group class="mr-1" label="Receipt Image">
							<b-form-file 
								@change="fileSelected"
								v-model="expenseReceiptFile"
								accept=".jpg, .png">
							</b-form-file>
							<img v-if="previewPath" src="previewPath">
						</b-form-group>
					</div>
				</b-tab> -->
			</b-tabs>
			<b-button class="float-right" type="submit" @click="onSubmit" variant="primary">Submit</b-button>
		</b-modal>
	</section>
</template>

<script>
	// import { insertQuarterlyReport } from '@/data/data';
	import { remote } from 'electron';

	var path = require('path');
	var fs = require('fs');
	const URL = require('url');

	export default  {
		name: 'add-line-modal',
		props: {
			expenseLine: Object,
		},
		mounted () {

		},

		data() {
			return {
				expenseReceiptFile: null,
				previewPath: null,

				currencyOptions: [
					{ value: "USD", text: 'USD' },
					{ value: 'CAN', text: 'CAN' },
				]
						
				// countries: COUNTRIES.map(c => ({ value: c.name, text: c.name })),
				// states: STATES.map(c => ({ value: c.name, text: c.name }))
			};
		},
		
		methods: {
			fileSelected(evt) {
				let file = evt.target.files[0];
				this.expenseReceiptFile = file;

				let oldPath = file.path
				let fileName = path.basename(oldPath);
				let newPath = remote.app.getPath('userData') + '-' + fileName;

				var readStream = fs.createReadStream(oldPath);
				var writeStream = fs.createWriteStream(newPath);
				readStream.on('close', function () {
					let fileName = path.basename(newPath);
				});
				readStream.pipe(writeStream);

				this.previewPath = URL.pathToFileURL(newPath);
			},

			onSubmit() {
				this.$emit("submitExpenseLine", this.expenseLine);
			},

			formatMoney(amount) {

				if (isNaN(Number(amount))) {
					return 0;
				}

				let value = Number(amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
				
				return  Number(value);
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