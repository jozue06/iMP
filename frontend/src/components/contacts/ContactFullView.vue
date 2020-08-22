<template>
	<section>
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
					<ContactCommsTab v-bind:currentContact="currentContact"/>
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
	// import { Task } from "../../data/models/taskModel";
	// import { Event } from "../../data/models/contactEventModel";

	export default  {
		components: {
			ContactCardTop,
			AddAddressModal,
			ContactModal,
			ContactMidCards,
			ContactLowerCards,
			ContactCommsTab,
			ContactTasksTab,
			ContactEventsTab
		},

		name: 'contact-full-view',
		
		props: [],

		mounted () {

		},

		data() {
			return {
				currentContact: {},
				taskLines: [],
				eventLines: [],
			}
		},

		created() {
			if (this.$router.currentRoute.params.contactId) {
				Contacts.getContact(this.$router.currentRoute.params.contactId).then(res => {
					console.log('res contact: ', res);
					
					this.currentContact = res;
					// Task.find({_id: {$in: this.currentContact.taskIds}}).then(res => {
					// 	this.taskLines = res
					// });
					// Event.find({_id: {$in: this.currentContact.eventIds}}).then(res => {
					// 	this.eventLines = res
					// });
				}).catch(e => {
					console.log(' Report.find eek ', e);
					throw e;
				});
			}
		},

		methods: {
			saveContact() {						
				// this.currentContact.save().then(res => {
				// 	this.$Notification("Success!", "Successfully Saved the Contact", "primary");
				// }).catch(e => {
				// 	console.log('eek', e);
				// 	this.$Notification("Error", `Error Saving contact: ${e}`, "warning", "", 5000);
				// 	throw e;
				// });
			},

			showContactModal() {
				this.$refs.contactModal.$refs.contactModal.show();
			},

			showAddAddressModal() {				
				this.$refs.addAddressModal.$refs.addAddressModal.show();
			},

			refresh() {
				// Task.find({_id: {$in: this.currentContact.taskIds}}).then(res => {
				// 	this.taskLines = res;
				// });
				// Event.find({_id: {$in: this.currentContact.eventIds}}).then(res => {
				// 	this.eventLines = res;
				// });
			}
		},

		computed: {

		}
	}
</script>