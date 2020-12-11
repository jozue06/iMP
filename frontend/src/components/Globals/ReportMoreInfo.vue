<template>
	<div>
		<div class="sub-card">
			<b-row v-if='reportType === 1' class="justify-content-around">
				<b-col cols="2" class="my-2">
					<b-form-group>
						<label>Car Miles</label>
						<b-form-input 
							v-model="currentReport.carMiles"
							class="text-right"
							type="text"
							name="carMiles"
							lazy-formatter
							:formatter="$formatMoney"
							@blur="saveReport"
						>
						</b-form-input>
						<label>Cents Per Mile</label>
						<b-input-group prepend="$">
							<b-form-input 
								v-model=currentReport.carCentsPerMile
								class="text-right"
								type="text" 
								name="carCentsPerMile"
								lazy-formatter
								:formatter="$formatMoney"
								@blur="saveReport"
							>
							</b-form-input>
						</b-input-group>
					</b-form-group> 
				</b-col>
				<b-col cols="2" class="my-2">
					<b-form-group class="mr-1">
						<label>Car W/ Trailer / Camper Miles</label>
						<b-form-input 
							v-model="currentReport.trailerMiles"
							class="text-right"
							type="text" 
							name="trailerMiles"
							lazy-formatter
							:formatter="$formatMoney"
							@blur="saveReport"
						>
						</b-form-input>
						<label>Car W/ Trailer / Camper Cents per Mile</label>
						<b-input-group prepend="$">
							<b-form-input 
								v-model="currentReport.trailerCentsPerMile"
								class="text-right"
								type="text"
								name="trailerCentsPerMile"
								lazy-formatter
								:formatter="$formatMoney"
							>
							</b-form-input>
						</b-input-group>
					</b-form-group> 
				</b-col>
				<b-col cols="2" class="my-2">
					<b-form-group class="mr-1">
						<label>Trailer / Camper Lodging # of Nights</label>
						<b-form-input 
							v-model="currentReport.trailerLodgingNights"
							class="text-right"
							type="number"
							name="trailerLodgingNights"
							@blur="saveReport"
						>
						</b-form-input>
						<label>Trailer / Camper Lodging Per Night</label>
						<b-input-group prepend="$">
							<b-form-input 
								v-model="currentReport.trailerLodgingPrice"
								class="text-right"
								type="text"
								name="trailerLodgingPrice"
								lazy-formatter
								:formatter="$formatMoney"
								@blur="saveReport"
							>
							</b-form-input>
						</b-input-group>
					</b-form-group> 
				</b-col>
				<b-col cols="2" class="my-2">
					<b-form-group class="mr-1">
						<label>Trailer Park Nights</label>
						<b-form-input 
							v-model="currentReport.trailerParkNights"
							class="text-right"
							type="number"
							name="trailerParkNights"
							@blur="saveReport"
						>
						</b-form-input>
						<label>Trailer Park Per Night</label>
						<b-input-group prepend="$">
							<b-form-input 
								v-model="currentReport.trailerParkPrice"
								class="text-right"
								type="text"
								name="trailerParkPrice"
								lazy-formatter
								:formatter="$formatMoney"
								@blur="saveReport"
							>
							</b-form-input>
						</b-input-group> 
					</b-form-group> 
				</b-col>
			</b-row>

			<b-row v-if='reportType === 1' class="mx-2">
				<b-col cols="6" class="my-2" style="border-right: solid 1px #ced4da;">
					<label>
						Support Info
					</label>
					<b-row class="justify-content-around">
						<b-form-group class="mr-1" label="Commitments">
							<b-input-group prepend="$">
								<b-form-input 
									v-model="currentReport.commitmentAmount"
									class="text-right"
									type="text"
									name="commitmentAmount"
									lazy-formatter
									:formatter="$formatMoney"
									@blur="saveReport"
								>
								</b-form-input>
							</b-input-group> 
						</b-form-group> 
						<b-form-group class="mr-1" label="Cash">
							<b-input-group prepend="$">
								<b-form-input 
									v-model="currentReport.cashAmount"
									class="text-right"
									type="text"
									name="cashAmount"
									lazy-formatter
									:formatter="$formatMoney"
									@blur="saveReport"
								>
								</b-form-input>
							</b-input-group> 
						</b-form-group> 
					</b-row>
				</b-col>

				<b-col cols="6"  class="my-2">
					<label>Other</label>
					<b-row class="align-items-center">
						<b-col>
							<b-row class="justify-content-around">
								<b-col cols="4" class="my-2">
									<b-form-group class="mr-1" label="No of events">
										<b-form-input 
											v-model="currentReport.numberOfServices"
											class="text-right"
											type="number"
											name="numberOfServices"
											@blur="saveReport"
										>
										</b-form-input>
									</b-form-group> 
									<b-form-group class="mr-1" label="No of Appointments">
										<b-form-input 
											v-model="currentReport.numberOfAppointments"
											class="text-right"
											type="number"
											name="numberOfAppointments"
											@blur="saveReport"
										>
										</b-form-input>
									</b-form-group> 
								</b-col>
								<b-col cols="4" class="my-2">
									<b-form-group class="mr-1" label="Start Receipt No">
										<b-form-input 
											v-model="currentReport.startReceiptNo"
											class="text-right"
											type="text"
											name="startReceiptNo"
											@blur="saveReport"
										>
										</b-form-input>
									</b-form-group> 
									<b-form-group class="mr-1" label="End Receipt No">
										<b-form-input 
											v-model="currentReport.endReceiptNo"
											class="text-right"
											type="text"
											name="endReceiptNo"
											@blur="saveReport"
										>
										</b-form-input>
									</b-form-group> 
								</b-col>

								<b-col cols="4" class="my-2">
									<b-form-group class="mr-1" label="Personal Note">
										<b-form-textarea
											v-model="currentReport.personalNotes"
											placeholder=""
											rows="4"
											max-rows="6"
										></b-form-textarea>
									</b-form-group> 
								</b-col>
							</b-row>
						</b-col>
					</b-row>
				</b-col>
			</b-row>

			<!-- ***  *** -->
			
			<b-row v-if='reportType === 2' class="mx-2">
				<b-col cols="6" class="my-2" style="border-right: solid 1px #ced4da;">
					<label>
						Support Info
					</label>
					<b-row class="justify-content-around">
						<b-form-group class="mr-1" label="Total Offerings">
							<b-input-group prepend="$">
								<b-form-input 
									v-model="currentReport.totalOfferings"
									class="text-right"
									type="text"
									name="totalOfferings"
									lazy-formatter
									:formatter="$formatMoney"
									@blur="saveReport"
								>
								</b-form-input>
							</b-input-group> 
						</b-form-group> 
						<b-form-group class="mr-1" label="Estimated Expenses">
							<b-input-group prepend="$">
								<b-form-input 
									v-model="currentReport.estimatedExpenses"
									class="text-right"
									type="text"
									name="estimatedExpenses"
									lazy-formatter
									:formatter="$formatMoney"
									@blur="saveReport"
								>
								</b-form-input>
							</b-input-group> 
						</b-form-group> 
					</b-row>
					<b-row class="justify-content-around mt-4">
						<b-form-group class="mr-1" label="Receipt Books Needed">
							<b-form-input 
								v-model="currentReport.receiptBooksNeeded"
								class="text-right"
								type="text"
								name="receiptBooksNeeded"
								@blur="saveReport"
							>
							</b-form-input>
						</b-form-group> 
						<b-form-group class="mr-1" label="Commitment Forms Needed">
							<b-form-input 
								v-model="currentReport.commitmentFormsNeeded"
								class="text-right"
								type="text"
								name="commitmentFormsNeeded"
								@blur="saveReport"
							>
							</b-form-input>
						</b-form-group> 
						<b-form-group class="mr-1" label="Expected Date to Field">
							<b-form-datepicker
								required
								v-model="currentReport.expectedDateToField"
								:date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
								locale="en"
								name="expectedDateToField"
								@change="saveReport"
							></b-form-datepicker>
						</b-form-group> 
					</b-row>
				</b-col>
				
				<b-col cols="6"  class="my-2">
					<label>Other</label>
					<b-row class="align-items-center">
						<b-col>
							<b-row class="justify-content-around">
								<b-col cols="4" class="my-2">
									<b-form-group class="mr-1" label="Face-to-Face Appointments">
										<b-form-input 
											v-model="currentReport.numberOfAppointments"
											class="text-right"
											type="number"
											name="numberOfAppointments"
											@blur="saveReport"
										>
										</b-form-input>
									</b-form-group> 
									<b-form-group class="mr-1" label="No of Services / Speaking Opportunities">
										<b-form-input 
											v-model="currentReport.numberOfServices"
											class="text-right"
											type="number"
											name="numberOfServices"
											@blur="saveReport"
										>
										</b-form-input>
									</b-form-group> 
								</b-col>
								<b-col cols="4" class="my-2">
									<b-form-group class="mr-1" label="Letters / Newsletters / Thank you Cards">
										<b-form-input 
											v-model="currentReport.letters"
											class="text-right"
											type="text"
											name="letters"
											@blur="saveReport"
										>
										</b-form-input>
									</b-form-group> 
									<b-form-group class="mr-1" label="Email / Social Media / Other Comms">
										<b-form-input 
											v-model="currentReport.otherComms"
											class="text-right"
											type="text"
											name="endReceiptNo"
											@blur="saveReport"
										>
										</b-form-input>
									</b-form-group> 
									<b-form-group class="mr-1" label="Phone Calls">
										<b-form-input 
											v-model="currentReport.phoneCalls"
											class="text-right"
											type="text"
											name="phoneCalls"
											@blur="saveReport"
										>
										</b-form-input>
									</b-form-group> 
								</b-col>
							</b-row>
						</b-col>
					</b-row>
				</b-col>
			</b-row>

			<!-- ***  *** -->
		
			<b-row v-if='reportType === 3' class="mt-2 mx-2 justify-content-around">
				<b-col cols="12" class="mt-2">
					<p class="text-center">
						General SDR Info
					</p>
				</b-col>

				<b-form-group class="mr-1" label="SDR Number">
					<b-form-input 
						v-model="currentReport.sdrNumber"
						class="text-right"
						type="text"
						name="sdrNumber"
						@blur="saveReport"
					>
					</b-form-input>
				</b-form-group> 

				<b-form-group class="mr-1" label="Field">
					<b-form-input 
						v-model="currentReport.field"
						class="text-right"
						type="text"
						name="field"
						@blur="saveReport"
					>
					</b-form-input>
				</b-form-group> 

				<b-form-group class="mr-1" label="SDR Date">
					<b-form-datepicker
						v-model="currentReport.sdrDate"
						:date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
						locale="en"
						name="sdrDate"
						@input="saveReport"
					></b-form-datepicker>
				</b-form-group> 

				<b-form-group class="mr-1" label="Date of Disbursement">
					<b-form-datepicker
						required
						v-model="currentReport.disbursementDate"
						:date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
						locale="en"
						name="disbursementDate"
						@change="saveReport"
					></b-form-datepicker>
				</b-form-group> 
			</b-row>
		
			<b-row v-if='reportType === 3' class="mx-2 justify-content-around">
				<b-form-group class="mr-1" label="Receiving Funds">
					<b-input-group prepend="$">
						<b-form-input 
							v-model="currentReport.receivingFunds"
							class="text-right"
							type="text"
							name="receivingFunds"
							lazy-formatter
							:formatter="$formatMoney"
							@blur="saveReport"
						>
						</b-form-input>
					</b-input-group> 
				</b-form-group> 

				<b-form-group class="mr-1" label="Receiving Funds Designated For">
					<b-form-input 
						v-model="currentReport.receivingFundsDescription"
						class="text-right"
						type="text"
						name="receivingFundsDescription"
						@blur="saveReport"
					>
					</b-form-input>
				</b-form-group> 

				<b-form-group class="mr-1" label="Reference">
					<b-form-input 
						v-model="currentReport.sdrReferenceNumber"
						class="text-right"
						type="text"
						name="sdrReferenceNumber"
						@blur="saveReport"
					>
					</b-form-input>
				</b-form-group> 

				<b-form-group class="mr-1" label="Date of Special Check">
					<b-form-datepicker
						required
						v-model="currentReport.specialCheckDate"
						:date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
						locale="en"
						name="specialCheckDate"
						@change="saveReport"
					></b-form-datepicker>
				</b-form-group> 
			</b-row>

			<div v-if='reportType === 3' class="sub-card">
				<b-row v-if='reportType === 3' class="mx-2 justify-content-around">
					<b-col cols="12" class="mt-2">
						<p class="text-center">
							SDR Account Info
						</p>
					</b-col>

					<b-form-group class="mr-1" label="Purpose">
						<b-form-input 
							v-model="currentReport.purpose"
							class="text-right"
							type="text"
							name="purpose"
							@blur="saveReport"
						>
						</b-form-input>
					</b-form-group> 

					<b-form-group class="mr-1" label="Account Charged">
						<b-form-input 
							v-model="currentReport.accountCharged"
							class="text-right"
							type="text"
							name="accountCharged"
							@blur="saveReport"
						>
						</b-form-input>
					</b-form-group> 

					<b-col cols="2">
						<b-form-group class="mr-1" label="Class">
							<b-form-input 
								v-model="currentReport.class"
								class="text-right"
								type="text"
								name="class"
								@blur="saveReport"
							>
							</b-form-input>
						</b-form-group> 
					</b-col>

					<b-col cols="2">
						<b-form-group class="mr-1" label="Source">
							<b-form-input 
								v-model="currentReport.source"
								class="text-right"
								type="text"
								name="source"
								@blur="saveReport"
							>
							</b-form-input>
						</b-form-group> 
					</b-col>

					<b-form-group class="mr-1" label="Amount">
						<b-input-group prepend="$">
							<b-form-input 
								v-model="currentReport.sdrAmount"
								class="text-right"
								type="text"
								name="sdrAmount"
								lazy-formatter
								:formatter="$formatMoney"
								@blur="saveReport"
							>
							</b-form-input>
						</b-input-group> 
					</b-form-group> 
				</b-row>
			</div>

			<!-- ***  *** -->

			<b-row v-if='reportType === 4' class="ml-2 mr-2 justify-content-between">
				<b-col cols="2" class="my-2">
					<b-form-group class="mr-1" label="Institution">
						<!-- NEED TO CHANGE THIS TO AN INPUT SELECT OF ACCOUNT NAME AND ACCOUNT NUMBER -->
							<b-input-group>
								<b-form-input 
									class="text-right"
									type="text" 
									v-model="currentReport.institution" 
									name="institution"
									@blur="saveReport"
								>
								</b-form-input>
							</b-input-group>
						</b-form-group> 
					</b-col>
					<b-col cols="2" class="my-2">
						<b-form-group class="mr-1" label="Account">
							<b-input-group>
								<b-form-input 
									class="text-right"
									type="text" 
									v-model="currentReport.account" 
									name="account"
									@blur="saveReport"
								>
								</b-form-input>
							</b-input-group>
						</b-form-group> 
				</b-col>
				<b-col cols="3" class="my-2">
					<b-form-group label="Field">
						<b-form-select
							:options="countries"
							v-model="currentReport.field"
							name="field"
						></b-form-select>
					</b-form-group> 
				</b-col>
			</b-row>

			<b-row v-if='reportType === 4' class="mx-2 justify-content-around">
				<b-col cols="2" class="my-2">
					<b-form-group class="mr-1" label="US Bank Funds">
						<b-input-group prepend="$">
							<b-form-input 
								v-model="currentReport.usBankFunds"
								class="text-right"
								type="text"
								name="usBankFunds"
								lazy-formatter
								:formatter="$formatMoney"
								@blur="saveReport"
							>
							</b-form-input>
						</b-input-group>
					</b-form-group> 
				</b-col>
				<b-col cols="2" class="my-2">
					<b-form-group class="mr-1" label="Local Bank Funds">
						<b-input-group prepend="$">
							<b-form-input 
								v-model="currentReport.localBankFunds"
								class="text-right"
								type="text"
								name="localBankFunds"
								lazy-formatter
								:formatter="$formatMoney"
								@blur="saveReport"
							>
							</b-form-input>
						</b-input-group>
					</b-form-group> 
				</b-col>
				<b-col cols="2" class="my-2">
					<b-form-group class="mr-1" label="Petty Cash Funds">
						<b-input-group prepend="$">
							<b-form-input 
								v-model="currentReport.pettyCashFunds"
								class="text-right"
								type="text" 
								name="pettyCashFunds"
								lazy-formatter
								:formatter="$formatMoney"
								@blur="saveReport"
							>
							</b-form-input>
						</b-input-group>
					</b-form-group> 
				</b-col>
				<b-col cols="2" class="my-2">
					<b-form-group class="mr-1" label="LFTL SDR Balance">
						<b-input-group prepend="$">
							<b-form-input 
								v-model="currentReport.LFTLsdrBalance"
								class="text-right"
								type="text"
								name="LFTLsdrBalance"
								lazy-formatter
								:formatter="$formatMoney"
							>
							</b-form-input>
						</b-input-group>
					</b-form-group> 
				</b-col>
				<b-col cols="2" class="my-2">
					<b-form-group class="mr-1" label="non-LFTL SDR Balance">
						<b-input-group prepend="$">
							<b-form-input 
								v-model="currentReport.nonLFTLsdrBalance"
								class="text-right"
								type="text"
								name="nonLFTLsdrBalance"
								lazy-formatter
								:formatter="$formatMoney"
								@blur="saveReport"
							>
							</b-form-input>
						</b-input-group>
					</b-form-group> 
				</b-col>
			</b-row>
			
			<b-row class="mx-2">
				<StatementInfoRow v-bind:currentReport="currentReport" @showStatementModal="showStatementModal" />
			</b-row>
		</div>
		
		<StatementModal 
			ref="statementModal" 
			@refresh="refresh"
			v-bind:statement="selectedStatement"
			v-bind:currentReport="currentReport" 
			v-bind:reportType="reportType"
		/>
	</div>	
</template>

<script>
	import StatementModal from "../Modals/StatementModal";
	import { COUNTRIES } from "@/constants/statesAndCountries";
	import StatementInfoRow from '../../../StatementInfoRow.vue';
	export default  {
		name: 'reportMoreInfo',

		components: {
			StatementModal,
			StatementInfoRow,
		},

		props: {
			currentReport: Object,
			reportType: Number,
		},

		created() {
			if (this.currentReport.statements.length) {
				this.statements = this.currentReport.statements;
			}
		},

		data() {
			return {
				selectedStatement: {},
				statements: [],
				countries: COUNTRIES.map(c => ({ value: c.name, text: c.name })),
			}
		},

		methods: {
			saveReport() {
				this.$emit("saveReport");
			},

			refresh(savedReport) {
				this.$emit("refresh", savedReport);
			},

			showStatementModal(selectedStatement) {
				if (selectedStatement) {
					this.selectedStatement = selectedStatement;
				} else {
					this.selectedStatement = {}
				}
				this.$refs.statementModal.$refs.statementModal.show();
			},
		},

		computed: {
		}
	}

</script>