<template>
	<div>	
		<div v-if="taskLines && taskLines.length > 0">
			<b-button variant="primary" class="float-right m-2" size="sm" @click="showTaskModal(null)">Add Task</b-button>

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
					<b-icon class="h4" v-if='data.item.completed == true' icon="check-circle" variant="info"></b-icon>
					<b-icon class="h4" v-else icon="circle" variant="danger"></b-icon>
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
	import NoResults from "../NoResults";
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
				if (selectedLine == null) {
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

			doneSaving() {
				this.clearSelected();
				this.$emit("refresh");
			},

			handleConfirmDelete() {				
				let ids = this.selected.map(ele => ele._id);
				Tasks.deleteTasks(ids).then(res => {
					this.$Notification("Deleted", "Deleted the Selected Tasks", "warning", "", 3000);
					this.$emit("refresh");
				}).catch(e => {
					console.log('e', e);
					throw e;
				});
			},

			toggleComplete() {
				this.selected.forEach(sel => {
					sel.completed = !sel.completed;
				});
				this.currentContact.save().then(res => {
					this.$Notification("Success!", "Successfully Saved the Contact", "primary");
				}).catch(e => {
					console.log('e', e);
					throw e;
				});
				this.$refs.tasksTable.clearSelected();
			}
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
			},
		}
	}
</script>