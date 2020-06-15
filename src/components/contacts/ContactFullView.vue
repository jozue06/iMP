<template>
	<section>
		<div class="main-card">
			<router-link to="/contacts">
				<h1>{{ currentContact.firstName }}</h1>
			</router-link>	

			<ContactTopCard v-bind:currentContact="currentContact" />
			
			<b-row class="mr-2 ml-2" align-v="center">
				<b-col cols="6" class="test-class">
					<b-tabs content-class="mt-3">
						<b-tab title="District" active>
							<b-form-group label="District">
								<b-form-input
									type="text"
									v-model="currentContact.district"
									required
									placeholder="District?"
									name="disctrict"
								></b-form-input>					
							</b-form-group> 
							</b-tab>
							<b-tab title="Section">
								<b-form-group label="Section">
									<b-form-input
										type="text"
										v-model="currentContact.section"
										required
										placeholder="Section?"
										name="section"
									></b-form-input>
								</b-form-group> 
							</b-tab>
						</b-tabs>	
					</b-col>
				<b-col class="test-class">
					3{{ currentContact.lastName }}
				</b-col>
			</b-row>

			<b-row class="mr-2 ml-2" align-v="center">
				<b-col class="test-class">
					<!-- <p> -->
						checkbox for individual []
					<!-- </p> -->
					<!-- <p> -->
						<br>
						{{ currentContact.firstName }}
						<br>
						{{ currentContact.lastName }}
						<br>
						{{ currentContact.address }}
						<br>
						{{ currentContact.city }}
						<br>
						{{ currentContact.country }}
						<br>
						{{ currentContact.email }}
						<br>
						{{ currentContact.phone }}
					<!-- </p> -->
					<p v-if="currentContact.notes">							
						{{ currentContact.notes.text }}
					</p>
				</b-col>
				<b-col class="test-class">
					<p> other stuffs 1: </p>
					church or org name:
					{{ currentContact.orgName }}
					<br>
					<b-form-group label="District">
						<b-form-input
							type="text"
							v-model="currentContact.district"
							required
							placeholder="District?"
							name="disctrict"
						></b-form-input>					
					</b-form-group> 
					<b-form-group label="Section">
						<b-form-input
							type="text"
							v-model="currentContact.section"
							required
							placeholder="Section?"
							name="section"
						></b-form-input>					
					</b-form-group> 
				</b-col>
				<b-col class="test-class">
					3{{ currentContact.lastName }}
				</b-col>
			</b-row>
			<b-button variant="primary" class="m-2" size="lg" @click="saveContact">Save Changes</b-button>
		</div>
	</section>
</template>

<script>
	import { Contact } from '../../data/models/contactModel'
	import ContactTopCard from "./ContactCardTop"
	export default  {
		components: {
			ContactTopCard,
		},

		name: 'contact-full-view',
		
		props: [],

		mounted () {

		},

		data () {
			return {
				currentContact: {},
			}
		},

		created() {
			if (this.$router.currentRoute.params.contactId) {
				Contact.find( { _id: this.$router.currentRoute.params.contactId }, { populate: true } ).then(res => {
					this.currentContact = res[0];
				}).catch(e => {
					console.log(' Report.find eek ', e);
					throw e;
				});
			}
		},

		methods: {
			saveContact() {
				this.currentContact.save().then(res => {
					this.$Notification("Success!", "Successfully Saved the Contact", "primary");
				}).catch(e => {
					console.log('eek', e);
					throw e;
				});
			}
		},

		computed: {

		}
	}
</script>

<style lang="scss" scoped>
	.test-class {
		margin: 20px;
		box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
		border-radius: 0.25em !important;

	}
</style>