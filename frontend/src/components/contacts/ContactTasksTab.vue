<template>
	<div>	
		<div v-if="taskLines && taskLines.length > 0">
			<b-button variant="primary" class="float-right m-2" size="sm" @click="showTaskModal(null)">+ Add Task</b-button>			
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
				<template v-slot:cell(completed)="data">
					<span @click="mutate(data.item)">
						<b-icon class="h4" v-if='data.item.completed == true' icon="check-circle" variant="info"></b-icon>
						<b-icon class="h4" v-else icon="circle" variant="danger"></b-icon>
					</span>
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
				v-b-modal.confirmDeleteTask
			>
				Delete selected
			</b-button>
			<b-button 
				class="mx-2" 
				variant="info" 
				size="sm" 
				:disabled="selected == 0" 
				v-bind:selected="selected"
				@click="toggleComplete"
			>
				Toggle Completed
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

		<ContactTaskModal ref="contactTaskModal" @doneSaving="doneSaving" v-bind:taskLine="taskLine" v-bind:currentContact="currentContact" />
	</div>
</template>

<script>
	import NoResults from "../Globals/NoResults";
	import { Tasks } from "../../data/tasks";
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
				if (selectedLine) {
					this.taskLine = selectedLine;
				} else {
					this.taskLine  = {}
				}
				this.$refs.contactTaskModal.$refs.contactTaskModal.show();
			},

			onRowSelected(task) {
				this.selected = task;
			},

			selectAllRows() {
				this.$refs.tasksTable.selectAllRows();
			},

			clearSelected() {	
				if (this.selected.length) {			
					this.$refs.tasksTable.clearSelected();
				}
			},

			doneSaving() {
				this.$emit("refresh");
			},

			handleConfirmDelete() {				
				let ids = this.selected.map(ele => ele._id);
				Tasks.deleteTasks(ids).then(res => {
					this.$Notification("Deleted", "Deleted the Selected Tasks", "warning", "", 3000);
					this.$emit("refresh");
				}).catch(e => {
					console.error('e', e);
					throw e;
				});
			},

			mutate(selectedTask) {
				selectedTask.completed = !selectedTask.completed;
				Tasks.save(selectedTask).then(() => {
					this.$Notification("Success!", "Successfully Toggled the Task Completed", "primary");
				}).catch(e => {
					console.error('e', e);
					throw e;
				});
			},

			toggleComplete() {
				this.selected.forEach(sel => {
					sel.completed = !sel.completed;
				});
				let completedToSet = this.selected[0].completed;

				Tasks.toggleMany(this.selected, completedToSet).then(res => {
					this.$Notification("Success!", "Successfully Saved the Tasks", "primary");
				}).catch(e => {
					console.error('e', e);
					throw e;
				});

				this.$refs.tasksTable.clearSelected();
			}
		},

		computed: {
			fields() {
				let keys = allowedFields.taskLines.map(al => {
					let tmp = {};
					tmp.sortable = true;
					tmp.key = al;
					return tmp;
				});
				return keys;
			},

			confirmDeleteMessage() {
				return "Are you sure you want to delete the selected Tasks? This cannot be undone";
			},
		}
	}
</script>