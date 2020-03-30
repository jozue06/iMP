<template>
	<section class="contacts">
		<h1>Contacts</h1>
		<div v-if="contacts.length > 0">
			<!-- <b-form-group label="Selection mode:" label-cols-md="4">
				<b-form-select v-model="selectMode" :options="modes" class="mb-3"></b-form-select>
			</b-form-group> -->
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
				<template v-slot:cell(selected)="{ rowSelected }">
					<template v-if="rowSelected">
						<span aria-hidden="true">&check;</span>
						<span variant="danger" class="sr-only"></span>
					</template>
					<template v-else>
						<span aria-hidden="true">&nbsp;</span>
					</template>
				</template>
			</b-table>
			<b-button class="mx-2"  size="sm" @click="selectAllRows">Select all</b-button>
			<b-button class="mx-2" size="sm" @click="clearSelected">Clear selected</b-button>
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
			linkTo="/addContact" 
			message="No Contacts Found" 
			subtitle="Click here to Create a Contact" 
			v-else-if="contacts.length == 0" 
			@handleBtnClick="handleBtnClick"
		/>
		<ConfirmModal 
			id="confirmModal" 
			title="Delete?" 
			v-bind:message="confirmDeleteMessage" 
			@handleConfirm="handleConfirmDelete" 
		/>
		<AddContactModal ref="addContactModal" @submit="handleSubmit"/>
	</section>
</template>

<script>
	import "bootstrap/dist/css/bootstrap.css";
	import "bootstrap-vue/dist/bootstrap-vue.css";
	import { findAllContacts, deleteContacts } from '@/data/data'
	import ConfirmModal from '../Modals/ConfirmModal'
	import NoResults from '../NoResults'
	import AddContactModal from '../Modals/AddContactModal'
	
	export default {
		components: {
			ConfirmModal,
			NoResults,
			AddContactModal
		},
		name: "Contacts",
		methods: {
			onRowSelected(contact) {
				this.selected = contact;
			},

			selectAllRows() {
				this.$refs.selectableTable.selectAllRows()
			},

			clearSelected() {
				this.$refs.selectableTable.clearSelected()
			},

			handleConfirmDelete() {
				deleteContacts(this.selected).then(() => {
					this.selected.forEach(selected => {
						const index = this.contacts.findIndex(c => c.id === selected.id)
						this.contacts.splice(index, 1)
					});
					this.$Notification("Deleted", "Deleted the Selected Contacts", "warning", "", 3000);
				});
			},

			handleBtnClick() {
				this.$refs.addContactModal.$refs.addContactModal.show()
			},

			handleSubmit() {
				this.contacts = this.findAllContacts();
				this.$Notification("Success!", "Successfully Added the Contact");
			},

			findAllContacts() {
				let contacts = []; 
				findAllContacts().then((data) => {	
					data.forEach(c => {
						if (c.record.firstName && c.record.lastName) {
							c.record.id = c._id;
							contacts.push({...c.record});
						}
					});
				});
				return contacts;
			}
		},

		data() {		
			return {
				contacts: this.findAllContacts(),
				sortBy: 'firstName',
				sortDesc: false,
				selected: "",
				selectMode: 'multi',
				confirmDeleteMessage: "Are you sure you want to delete the selected contacts?",
			};
		},
		
		computed: {
			fields() {
				return Object.keys(this.contacts[0]).map(f => {
					let tmp = {};
					tmp.sortable = true;

					if (f == "id"){
						tmp.key = "";
					} else {
						tmp.key = f;

					}
					return tmp;
				});
			}
		},
	};
</script>

<style scoped>
	section {
		float: right;
		width: 80%;
	}
	.noResults {
		float: right;
		width: 100%;
	}
</style>