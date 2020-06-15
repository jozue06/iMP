<template lang="html">
	<div class="main-card">
		<b-row  @click="showContactModal" class="mx-2">
			<b-col class="my-2" style="border-right: solid 1px #ced4da;">
				<p>
					primary address
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
							This is and Individaul Contact
						</label>
					</b-form-checkbox>
				</div>
				<b-row class="align-items-center custom-hover">
					<b-col>
						<br>
						<label> first name: </label>
						<br>
						{{ currentContact.firstName }}
						<br>
						<label> last name: </label>
						<br>
						{{ currentContact.lastName }}
					</b-col>	
					<b-col>
						<label> address: </label>
						<br>
						{{ currentContact.address }}
						<br>
						{{ currentContact.city }}
						<br>
						{{ currentContact.postalCode }}
						<br>
						{{ currentContact.country }}
						<br>
					</b-col>
					<b-col>
						<label> email: </label>
						{{ currentContact.email }}
						<br>
						<label> phone: </label>
						<br>
						{{ currentContact.phone }}
					</b-col>
				</b-row>
			</b-col>
			<b-col class="my-2">
				<div v-if="!currentContact.isIndividual">
					church or org name
					{{ currentContact.orgName }}
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
		<ContactModal ref="contactModal" v-bind:contact="currentContact" @refresh="saveContact" />
	</div>
</template>

<script>
	import ContactModal from '../Modals/ContactModal';

	export default  {
		name: 'contact-card-top',

		components: {
			ContactModal,
		},

		props: {
			currentContact: Object,
		},

		data () {
			return {
				isIndividual: "",
			}
		},

		methods: {
			showContactModal() {
				this.$refs.contactModal.$refs.contactModal.show();
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

<style scoped lang="scss">
	.note-container {
		border: solid 1px #ced4da;
		border-radius: .25em;
	}
</style>