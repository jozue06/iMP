<template>
	<div class="sub-card" v-bind:currentReport="currentReport">		
		<b-row class="justify-content-around">
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
		<b-row class="mx-2">
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

	</div>
</template>

<script>
	export default  {

		name: 'itinerationReportMoreInfo',

		props: {
			currentReport: Object,
		},

		data() {
			return {
			}
		},

		methods: {
			saveReport() {
				this.$emit("saveReport");
			}
		},
}

</script>