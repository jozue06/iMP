<template>
	<section class="contacts">
		<div class="main-card">
			<router-link to="/">
				<h1 class="pt-2">Contacts</h1>
			</router-link>				
			<div v-if="contacts.length > 0">
				<b-button variant="primary" class="float-right m-2" size="sm" @click="showContactModal(null)">Add Contact</b-button>
				<b-table
					striped 
					hover 
					ref="selectableTable"
					selectable
					:items="contacts" 
					:fields="fields"
					:sort-by.sync="sortBy"
					:sort-desc.sync="sortDesc"
					:select-mode="selectMode"
					@row-selected="onRowSelected"
					selected-variant="danger"
					sort-icon-left
					responsive="sm"
				>
					<template v-slot:cell(edit)="data">
						<span @click="showContactModal(data.item)" class="text-info">edit</span>
					</template>
					<template v-slot:cell()="data">						
						<router-link
							:to="{ name: 'contactFullView', params: { contactId: data.item._id } }"
							v-slot="{ href, route, navigate}"
						>
							<span :href="href" @click="navigate" class="text-info"> {{ data.value }} </span>
						</router-link>
					</template>
				</b-table>
				<b-button class="m-2"  size="sm" @click="selectAllRows">Select all</b-button>
				<b-button class="m-2" size="sm" @click="clearSelected">Clear selected</b-button>
				<b-button 
					class="mx-2" 
					variant="danger" 
					size="sm" 
					:disabled="selected == 0" 
					v-bind:selected="selected"
					v-b-modal.confirmModal>
						Delete selected
				</b-button>
			</div>
			<NoResults 
				message="No Contacts Found" 
				subtitle="Click here to Create a Contact" 
				v-else-if="contacts.length == 0" 
				@handleBtnClick="showContactModal(null)"
			/>
			<ConfirmModal 
				id="confirmModal" 
				title="Delete?" 
				v-bind:message="confirmDeleteMessage" 
				@handleConfirm="handleConfirmDelete" 
			/>
			<ContactModal 
				ref="contactModal" 
				v-bind:contact="selectedContact" 
				@refresh="refresh"
			/>
		</div>
		<!-- <ContactSearchComponent /> -->
	</section>
</template>

<script>
	import ConfirmModal from '../Modals/ConfirmModal'
	import NoResults from '../NoResults'
	import ContactModal from '../Modals/ContactModal'
	// import ContactSearchComponent from '../ContactSearchComponent'
	import { Contacts } from '../../data/contacts'
	import { allowedFields } from '@/constants/tableFields';
	
	export default {
		components: {
			ConfirmModal,
			NoResults,
			ContactModal,
			// ContactSearchComponent,
		},

		name: "Contacts",

		methods: {
			onRowSelected(contact) {
				this.selected = contact;
			},

			selectAllRows() {
				this.$refs.selectableTable.selectAllRows();
			},

			clearSelected() {
				this.$refs.selectableTable.clearSelected();
			},

			handleConfirmDelete() {
				let ids = this.selected.map(ele => ele._id);
				
				// Contact.deleteMany({ _id: { $in: ids} }).then(res => {					
				// 	this.refresh();
				// 	this.$Notification("Deleted", "Deleted the Selected Contacts", "warning", "", 3000);
				// }).catch(e => {
				// 	console.log('e', e);
				// 	throw e;
				// });
			},

			showContactModal(item) {			
				if (item) {				
					this.selectedContact = item;
				} else {
					this.selectedContact = {};
				}
				this.$refs.contactModal.$refs.contactModal.show();
			},

			findAllContacts() {
				let contacts = []; 
				Contacts.getContacts().then((data) => {	
					data.forEach(c => {
						if (c.firstName && c.lastName) {
							c.id = c._id;
							contacts.push({...c});
						}
					});
				});

				return contacts;
			},

			refresh() {
				this.contacts = this.findAllContacts();
			}
		},

		mounted () {
			this.contacts = this.findAllContacts();
		},

		data() {
			return {
				contacts: this.findAllContacts(),
				sortBy: 'firstName',
				sortDesc: false,
				selected: "",
				selectMode: 'multi',
				selectedContact: {},
				confirmDeleteMessage: "Are you sure you want to delete the selected contacts?",
			};
		},
		
		computed: {
			fields() {				
				let keys = Object.keys(this.contacts[0]).map(f => {
					let tmp = {};
					tmp.sortable = true;

					if (allowedFields.contactsList.includes(f)) {
						tmp.key = f;
					} else { 
						tmp.key = "";
					}

					return tmp;
				});

				keys.unshift("edit");

				return keys;
			}
		},
	};
</script>