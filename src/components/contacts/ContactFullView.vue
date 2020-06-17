<template>
	<section>
		<div class="main-card">
			<router-link to="/contacts">
				<h1>{{ currentContact.firstName }}</h1>
			</router-link>	
			<b-tabs class="ml-1" content-class="ml-0">
				<b-tab title="Contact Info" active>
					<ContactCardTop v-bind:currentContact="currentContact" @showContactModal="showContactModal"/>

					<ContactMidCards v-bind:currentContact="currentContact" @showAddAddressModal="showAddAddressModal"/>
					
					<ContactLowerCards v-bind:currentContact="currentContact" />
					
					<b-button variant="primary" class="m-2" size="lg" @click="saveContact">Save Changes</b-button>
				</b-tab>
				<b-tab title="Communications">
					<ContactCommsTab v-bind:currentContact="currentContact"/>
				</b-tab>
				<b-tab title="Tasks">
					<ContactTasksTab v-bind:currentContact="currentContact"/>
				</b-tab>
			</b-tabs>
		</div>
		<AddAddressModal ref="addAddressModal" v-bind:currentContact="currentContact" @saveContact="saveContact" />
		<ContactModal ref="contactModal" v-bind:contact="currentContact" @refresh="saveContact" />
	</section>
</template>

<script>
	import { Contact } from "../../data/models/contactModel";
	import ContactCardTop from "./ContactCardTop";
	import ContactMidCards from "./ContactMidCards";
	import ContactLowerCards from "./ContactLowerCards";
	import AddAddressModal from "../Modals/AddAddressModal";
	import ContactModal from '../Modals/ContactModal';
	import ContactCommsTab from "./ContactCommsTab";
	import ContactTasksTab from "./ContactTasksTab";

	export default  {
		components: {
			ContactCardTop,
			AddAddressModal,
			ContactModal,
			ContactMidCards,
			ContactLowerCards,
			ContactCommsTab,
			ContactTasksTab
		},

		name: 'contact-full-view',
		
		props: [],

		mounted () {

		},

		data() {
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

</style>