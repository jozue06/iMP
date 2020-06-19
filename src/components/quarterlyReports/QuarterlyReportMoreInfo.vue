<template>
	<div class="sub-card">
		<b-row class="mr-2">
			<b-col class="my-2" style="border-right: solid 1px #ced4da;">
				<p>
					Primary Info
				</p>
				<div class="text-center mr-2">
					<!-- <b-form-checkbox
						size="sm"
						id="checkbox"
						v-model="currentContact.isIndividual"
						name="checkbox"
						value=true
						unchecked-value=false
						@change="isIndividualChanged"
					> -->
						<label class="mt-1"> 
							This is and Individaul Contact
						</label>
					<!-- </b-form-checkbox> -->
				</div>
				<!-- @click="showContactModal" -->
				<b-row  class="align-items-center custom-hover">
					<b-col>
						<label> Name: </label>
						<div>
							<!-- {{ currentContact.firstName }} {{ currentContact.lastName }} -->
						</div>
						<br>
						<label> phone: </label>
						<br>
						<!-- {{ currentContact.phone }} -->
					</b-col>
					<b-col>
						<label> email: </label>
						<br>
						<!-- {{ currentContact.email }} -->
						<br>
						<label> address: </label>
						<!-- <br>
						{{ currentContact.address }},
						{{ currentContact.city }}, 
						{{ currentContact.postalCode }}
						<br>
						{{ currentContact.country }} -->
						<br>
					</b-col>
				</b-row>
			</b-col>
			<b-col class="my-2">
				<!-- <div v-if="!currentContact.isIndividual">
					<b-form-group label="Organization or Church name">
						<b-form-input
							type="text"
							v-model="currentContact.orgName"
							required
							placeholder=""
							name="orgName"
						></b-form-input>
					</b-form-group> 
				</div> -->
				<b-row>
					<b-col>
						<b-form-group label="Secretary name">
							<b-form-input
								type="text"
								v-model="temp"
								required
								placeholder="Secretary?"
								name="secretary"
							></b-form-input>
						</b-form-group> 
					</b-col>
					<b-col>
						<b-form-group label="Missions Contact Name">
							<b-form-input
								type="text"
								v-model="temp"
								required
								placeholder="Missions Contact Name?"
								name="missionsContact"
							></b-form-input>
						</b-form-group>
					</b-col>
				</b-row>
				<!-- <div class="note-container" v-if="currentContact.notes">
					<b-form-textarea
						class="text-center"
						v-model="currentContact.notes.text"
						placeholder="Enter something..."
						rows="1"
						max-rows="2"
					>
					</b-form-textarea>
				</div> -->
			</b-col>
		</b-row>
	</div>
</template>

<script>
	export default  {

		name: 'quarterly-report-more-info',

		props: {

		},

		mounted () {

		},

		data () {
			return {
				temp: '',

			}
		},

		methods: {

		},

		computed: {

		}
}

</script>

<style lang="scss" scoped>
	#collapse-info > {
		width:  200%;
		display: block !important;
		color: red;
	}
</style>