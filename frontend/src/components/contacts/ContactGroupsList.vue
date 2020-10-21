<template>
	<section>
		<LoadingSpinner v-bind:loading="loading" />
		<div class="main-card">
			<router-link to="/">
				<h1 class="pt-2">Groups</h1>
			</router-link>			
			<div v-if="groups.length > 0">
				<b-button variant="primary" class="float-right m-2" size="sm" @click="showGroupModal(null)">+ Add Group</b-button>
				<b-table
					striped 
					hover 
					ref="selectableTable"
					selectable
					:items="groups" 
					:fields="fields"
					:select-mode="selectMode"
					@row-selected="onRowSelected"
					selected-variant="danger"
					sort-icon-left
					responsive="sm"
				>
					<template v-slot:cell(edit)="data">	
						<span @click="showGroupModal(data.item)" class="text-info">edit</span>
					</template>
					<template v-slot:cell(name)="data">	
						<router-link
							:to="{ name: 'groupView', params: { groupId: data.item._id } }"
							v-slot="{ href, navigate}"
						>
							<span :href="href" @click="navigate" class="text-info"> {{ data.item.name  }} </span>
						</router-link>
					</template>
					<template v-slot:cell(contacts)="data">
						<p>
							{{ data.item.contacts.length }}
						</p>
					</template>
				</b-table>
				<b-button class="m-2" size="sm" @click="selectAllRows">Select all</b-button>
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
				subtitle="Click here to Create a Group" 
				v-else-if="groups.length == 0" 
				@handleBtnClick="showGroupModal(null)"
			/>
			<ConfirmModal 
				id="confirmModal" 
				title="Delete?" 
				v-bind:message="confirmDeleteMessage" 
				@handleConfirm="handleConfirmDelete" 
			/>
			<ContactGroupModal 
				v-bind:group="selectedGroup" 
				ref="groupModal"
				@saveContactGroup="refresh"
			/>
		</div>
	</section>
</template>

<script>
	import { ContactGroups } from '../../data/contactGroups';
	import ConfirmModal from '../Modals/ConfirmModal';
	import ContactGroupModal from '../Modals/ContactGroupModal';
	import NoResults from '../Globals/NoResults';
	import LoadingSpinner from "../Globals/LoadingSpinner";
	export default  {

		name: 'contact-groups-list',

		props: {

		},

		components: {
			ConfirmModal,
			NoResults,
			ContactGroupModal,
			LoadingSpinner,
		},

		mounted () {
			this.findAllGroups();
		},
		
		data() {
			return {
				loading: true,
				groups: [],
				sortBy: 'groupName',
				sortDesc: false,
				selected: "",
				selectMode: 'multi',
				selectedGroup: {},
				confirmDeleteMessage: "Are you sure you want to delete the selected contacts?",
			}
		},

		methods: {
			findAllGroups() {
				this.loading = true;
				let groups = []; 
				ContactGroups.getContactGroups().then((data) => {
					data.forEach(g => {
						if (g && g.name) {
							g.id = g._id;
							groups.push({...g});
						}
					});
					this.loading = false;
				});

				this.groups = groups;
			},

			showGroupModal(group) {
				if (group) {
					this.selectedGroup = group;
				} else {
					this.selectedGroup = {};
				}
				this.$refs.groupModal.$refs.groupModal.show()
			},

			handleConfirmDelete() {				
				if (this.selected.find(sel => sel.contacts.length > 0)) {
					return this.$Notification("Deleted", "Cannot delte the Selected Contact Groups", "warning", "There are contacts assigned to one or more of the selected Groups", 3000);
				}
				let ids = this.selected.map(ele => ele._id);
				
				// ContactGroup.deleteMany({ _id: { $in: ids} }).then(res => {
				// 	this.refresh();
				// 	this.$Notification("Deleted", "Deleted the Selected Contact Groups", "warning", "", 3000);
				// }).catch(e => {
				// 	console.error('e', e);
				// 	throw e;
				// });
			},

			onRowSelected(contact) {
				this.selected = contact;
			},

			selectAllRows() {
				this.$refs.selectableTable.selectAllRows();
			},

			clearSelected() {
				this.$refs.selectableTable.clearSelected();
			},

			refresh() {
				this.findAllGroups();
			}
		},

		computed: {
			fields() {
				let keys = Object.keys(this.groups[0]).map(f => {
					let tmp = {};
					tmp.sortable = true;
					if (f == "name") {
						tmp.key = f;
					} else if (f == "contacts") {
						tmp.key = f;
					}  else { 
						tmp.key = "";
					}

					return tmp;
				});

				keys.unshift("edit");

				return keys;
			}
		},
}

</script>