<template>
	<div>	
		<div v-if="taskLines && taskLines.length > 0">
			<b-table
				striped 
				hover 
				ref="tasksTable"
				:items="taskLines" 
				:fields="fields"
				selectable
				@row-selected="onRowSelected"
				selected-variant="danger"
				sort-icon-left
				responsive="sm"
			>
				<template v-slot:cell(date)="data">	
					<span @click="showTaskModal(data.item)" class="text-info"> {{ $Moment(data.item.date).format("MMM Do, YY") }} </span>
				</template>
				
				<template v-slot:cell()="data">	
					<span @click="showTaskModal(data.item)" class="text-info"> {{ data.value }} </span>
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
				v-b-modal.confirmDeleteTask>
					Delete selected
			</b-button>
		</div>

		<NoResults 
			message="No Tasks Found" 
			subtitle="Click here to Create a Task" 
			v-else
			@handleBtnClick="showTaskModal(null)"
		/>

		<ConfirmModal 
			id="confirmDeleteTask"
			title="Delete?" 
			v-bind:message="confirmDeleteMessage" 
			@handleConfirm="handleConfirmDelete" 
		/>

		<ContactTaskModal ref="contactTaskModal" v-bind:taskLine="taskLine" v-bind:currentContact="currentContact" />
	</div>
</template>

<script>
	import NoResults from "../NoResults";
	import { Contact } from "../../data/models/contactModel";
	import { Task } from "../../data/models/taskModel";
	import { allowedFields } from "../../constants/tableFields";
	import ContactTaskModal from "../Modals/ContactTaskModal"
	import ConfirmModal from "../Modals/ConfirmModal";

	export default  {

		name: 'contact-tasks-tab',
		
		components: {
			NoResults,
			ContactTaskModal,
			ConfirmModal,
		},

		props: {
			currentContact: Object,
			taskLines: Array,
		},

		data() {
			return {
				taskLine: {},
				selected: "",
			}
		},

		methods: {
			showTaskModal(selectedLine) {
				if (selectedLine == null) {
					this.taskLine = Task.create()
					this.$refs.contactTaskModal.$refs.contactTaskModal.show();
				} else {
					this.taskLine = selectedLine;
					this.$refs.contactTaskModal.$refs.contactTaskModal.show();
				}
			},

			onRowSelected(task) {
				this.selected = task;
			},

			selectAllRows() {
				this.$refs.tasksTable.selectAllRows();
			},

			clearSelected() {
				this.$refs.tasksTable.clearSelected();
			},

			handleConfirmDelete() {				
				let ids = this.selected.map(ele => ele._id);
				ids.forEach(id => {
					this.currentContact.taskIds.pop(id);
				})
				
				this.currentContact.save().then(res => {
					this.$Notification("Deleted", "Deleted the Selected Tasks", "warning", "", 3000);
				}).catch(e => {
					console.log('e', e);
					throw e;
				});

				Task.deleteMany({_id: {$in: ids}});
			},
		},

		computed: {
			fields() {				
				let keys = Object.keys(this.taskLines[0]).map(f => {
					let tmp = {};
					tmp.sortable = true;					
					if (allowedFields.taskLines.includes(f)) {
						tmp.key = f;
					} else { 
						tmp.key = "";
					}

					return tmp;
				});
				
				return keys;
			},

			confirmDeleteMessage() {
				return "Are you sure you want to delete the selected Tasks? This cannot be undone";
			}
		}
	}
</script>