<template>
	<section>
		<div class="main-card">
			<router-link to="/">
				<h1 class="pt-2">Groups</h1>
			</router-link>	
			{{ $consoleLog('groups ', groups) }}
			
			<div v-if="groups.length > 0">
				<b-button variant="primary" class="float-right m-2" size="sm" @click="showGroupModal(null)">Add Group</b-button>
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
						{{ $consoleLog('data.item', data.item) }}
						
						<span @click="showGroupModal(data.item)" class="text-info">edit</span>
					</template>
					<!-- <template v-slot:cell()="data">
						<router-link
							:to="{ name: 'contactFullView', params: { contactId: data.item._id } }"
							v-slot="{ href, route, navigate}"
						>
							<span :href="href" @click="navigate" class="text-info"> {{ data.value }} </span>
						</router-link>
					</template> -->
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
	import { ContactGroup } from '../../data/models/contactGroupModel';
	import ConfirmModal from '../Modals/ConfirmModal';
	import ContactGroupModal from '../Modals/ContactGroupModal';
	import NoResults from '../NoResults';

	export default  {

		name: 'contact-groups-list',

		props: {

		},

		components: {
			ConfirmModal,
			NoResults,
			ContactGroupModal,
		},

		mounted () {

		},

		data () {
			return {
				groups: this.findAllGroups(),
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
				let groups = []; 
				ContactGroup.find({}).then((data) => {	
					console.log('data from db ' , data);
					
					data.forEach(g => {
						if (g && g.groupName) {
							g.id = g._id;
							groups.push({...g});
						}
					});
				});

				return groups;
			},

			showGroupModal(group) {				
				if (group == null ) {
					group = ContactGroup.create();
					this.selectedGroup = group;
					
				} else {
					ContactGroup.findOne({ _id: group._id }).then((res) => {		
						this.selectedGroup = res;
					});
				}
				this.$refs.groupModal.$refs.groupModal.show()
			},

			handleConfirmDelete() {
				let ids = this.selected.map(ele => ele._id);
				
				ContactGroup.deleteMany({ _id: { $in: ids} }).then(res => {					
					this.refresh();
					this.$Notification("Deleted", "Deleted the Selected Contact Groups", "warning", "", 3000);
				}).catch(e => {
					console.log('e', e);
					throw e;
				});
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
				console.log('refreshing ?? ', );
				
				this.groups = this.findAllGroups();
			}
		},

		computed: {
			fields() {
				let keys = Object.keys(this.groups[0]).map(f => {
					let tmp = {};
					tmp.sortable = true;

					if (f == "groupName") {
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
}

</script>