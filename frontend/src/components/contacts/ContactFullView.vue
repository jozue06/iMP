<template>
	<section>
		<LoadingSpinner v-bind:loading="loading" />
		<div class="main-card">
			<router-link to="/contacts">
				<h1>{{ currentContact.firstName }}</h1>
			</router-link>	
			<b-tabs small card>
				<b-tab title="Contact Info" active>
					<ContactCardTop v-bind:currentContact="currentContact" @showContactModal="showContactModal"/>

					<ContactMidCards v-bind:currentContact="currentContact" @showAddAddressModal="showAddAddressModal"/>
					
					<ContactLowerCards v-bind:currentContact="currentContact" />
					
					<b-button variant="primary" class="m-2" size="lg" @click="saveContact">Save Changes</b-button>
				</b-tab>
				<b-tab title="Communications">
					<ContactCommsTab v-bind:currentContact="currentContact" v-bind:commsLines="commsLines" @refresh="refresh"/>
				</b-tab>
				<b-tab title="Tasks">
					<ContactTasksTab v-bind:currentContact="currentContact" v-bind:taskLines="taskLines" @refresh="refresh"/>
				</b-tab>
				<b-tab title="Events">
					<ContactEventsTab v-bind:currentContact="currentContact" v-bind:eventLines="eventLines" @refresh="refresh"/>
				</b-tab>
			</b-tabs>
		</div>
		<AddAddressModal ref="addAddressModal" v-bind:currentContact="currentContact" @saveContact="saveContact" />
		<ContactModal ref="contactModal" v-bind:contact="currentContact" @refresh="saveContact" />
	</section>
</template>

<script>
	import { Contacts } from "../../data/contacts";
	import ContactCardTop from "./ContactCardTop";
	import ContactMidCards from "./ContactMidCards";
	import ContactLowerCards from "./ContactLowerCards";
	import AddAddressModal from "../Modals/AddAddressModal";
	import ContactModal from '../Modals/ContactModal';
	import ContactCommsTab from "./ContactCommsTab";
	import ContactTasksTab from "./ContactTasksTab";
	import ContactEventsTab from "./ContactEventsTab";
	import LoadingSpinner from "../Globals/LoadingSpinner";

	export default  {
		components: {
			ContactCardTop,
			AddAddressModal,
			ContactModal,
			ContactMidCards,
			ContactLowerCards,
			ContactCommsTab,
			ContactTasksTab,
			ContactEventsTab,
			LoadingSpinner,
		},

		name: 'contact-full-view',
		
		props: [],

		mounted () {

		},

		data() {
			return {
				loading: false,
				currentContact: {},
				taskLines: [],
				eventLines: [],
				commsLines: [],
			}
		},

		created() {
			if (this.$router.currentRoute.params.contactId) {
				this.loading = true;
				Contacts.getContact(this.$router.currentRoute.params.contactId).then(res => {
					this.currentContact = res;
					this.eventLines = res.events;
					this.taskLines = res.tasks;
					this.commsLines = res.comms;
					this.loading = false
				}).catch(e => {
					console.error(' Report.find eek ', e);
					this.loading = false
					throw e;
				});
			}
		},

		methods: {
			saveContact() {
				Contacts.save(this.currentContact).then(res => {
					this.$Notification("Success!", "Successfully Saved the Contact", "primary");
				}).catch(e => {
					console.error('eek', e);
					this.$Notification("Error", `Error Saving contact: ${e}`, "warning", "", 5000);
					throw e;
				});
			},

			showContactModal() {
				this.$refs.contactModal.$refs.contactModal.show();
			},

			showAddAddressModal() {				
				this.$refs.addAddressModal.$refs.addAddressModal.show();
			},

			refresh() {
				Contacts.getContact(this.currentContact._id).then(res => {
					this.currentContact = res;
					this.eventLines = res.events;
					this.taskLines = res.tasks;
					this.commsLines = res.comms;
				}).catch(e => {
					console.error(' Report.find eek ', e);
					throw e;
				});
			}
		},
	}
</script>