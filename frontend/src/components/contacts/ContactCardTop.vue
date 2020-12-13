<template>
	<div class="main-card">
		<b-row class="mx-2">
			<b-col class="my-2">
				<p>
					Primary Info
				</p>
				<div class="text-center mr-2">
					<b-form-checkbox
						size="sm"
						id="checkbox"
						v-model="currentContact.isIndividual"
						name="checkbox"
						value=true
						unchecked-value=false
						@change="isIndividualChanged"
					>
						<label class="mt-1"> 
							This is and Individual Contact
						</label>
					</b-form-checkbox>
				</div>
				<b-row @click="showContactModal" class="align-items-center custom-hover">
					<b-col>
						<label> Name: </label>
						<div>
							{{ currentContact.firstName }} {{ currentContact.lastName }}
						</div>
						<br>
						<label> phone: </label>
						<br>
						{{ currentContact.phone }}
					</b-col>
					<b-col>
						<label> email: </label>
						<br>
						{{ currentContact.email }}
						<br>
						<label> address: </label>
						<br>
						{{ currentContact.address }},
						{{ currentContact.city }}, 
						{{ currentContact.postalCode }}
						<br>
						{{ currentContact.country }}
						<br>
					</b-col>
				</b-row>
			</b-col>
			<b-col class="my-2">
				<div v-if="!currentContact.isIndividual">
					<b-form-group label="Organization or Church name">
						<b-form-input
							type="text"
							v-model="currentContact.orgName"
							required
							placeholder=""
							name="orgName"
						></b-form-input>
					</b-form-group> 
				</div>
				<b-row>
					<b-col>
						<b-form-group label="Secretary name">
							<b-form-input
								type="text"
								v-model="currentContact.secretary"
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
								v-model="currentContact.missionsContact"
								required
								placeholder="Missions Contact Name?"
								name="missionsContact"
							></b-form-input>
						</b-form-group>
					</b-col>
				</b-row>
				<div class="note-container" v-if="currentContact.notes">
					<b-form-textarea
						class="text-center"
						v-model="currentContact.notes.text"
						placeholder="Enter something..."
						rows="1"
						max-rows="2"
					>
					</b-form-textarea>
				</div>
			</b-col>
		</b-row>
	</div>
</template>

<script>
	export default  {
		name: 'contact-card-top',

		props: {
			currentContact: Object,
		},

		data() {
			return {
				isIndividual: "",
			}
		},

		methods: {
			showContactModal() {
				this.$emit("showContactModal");
			},
			
			isIndividualChanged(isIndividual) {
				if (isIndividual == "true") {
					this.currentContact.isIndividual = true;
				} else {
					this.currentContact.isIndividual = false
				}
			},

			saveContact() {
				this.$emit("saveContact");
			}
		},
	}
</script>