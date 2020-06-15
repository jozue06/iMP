<template>
	<section>
		<div class="main-card">
			<router-link to="/contacts">
				<h1>{{ currentContact.firstName }}</h1>
			</router-link>	
			
			<router-link to="/getDistricts">
				<h1>GET IT SON</h1>
			</router-link>	

			<ContactTopCard v-bind:currentContact="currentContact" @showContactModal="showContactModal"/>
			<ContactMidCards v-bind:currentContact="currentContact" @showAddAddressModal="showAddAddressModal"/>
			
			<!-- <b-row class="mr-2 ml-2" align-v="center">
				<b-col class="test-class">

						checkbox for individual []

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
			</b-row> -->
			<b-button variant="primary" class="m-2" size="lg" @click="saveContact">Save Changes</b-button>
		</div>
		<AddAddressModal ref="addAddressModal" v-bind:currentContact="currentContact" @saveContact="saveContact" />
		<ContactModal ref="contactModal" v-bind:contact="currentContact" @refresh="saveContact" />
	</section>
</template>

<script>
	import { Contact } from "../../data/models/contactModel";
	import ContactTopCard from "./ContactCardTop";
	import ContactMidCards from "./ContactMidCards";
	import AddAddressModal from "../Modals/AddAddressModal";
	import ContactModal from '../Modals/ContactModal';

	export default  {
		components: {
			ContactTopCard,
			AddAddressModal,
			ContactModal,
			ContactMidCards,
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
					this.$Notification("Error", `Error Saving contact: ${e}`, "warning", "", 5000);
					throw e;
				});
			},

			showContactModal() {
				this.$refs.contactModal.$refs.contactModal.show();
			},

			showAddAddressModal() {				
				this.$refs.addAddressModal.$refs.addAddressModal.show();
			}
		},

		computed: {

		}
	}
</script>

<style lang="scss" scoped>
	/* .test-class {
		margin: 20px;
		box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
		border-radius: 0.25em !important;

	} */
</style>