<template>
	<div>	
		<div v-if="taskLines && taskLines.length > 0" class="main-card">
			<b-table
				striped 
				hover 
				ref="tasksTable"
				:items="taskLines" 
				:fields="fields"
				sort-icon-left
				responsive="sm"
			>
				<template v-slot:cell(date)="data">	
					<span class="text-info"> {{ $Moment(data.item.date._d).format("MM-DD-YYYY") }} </span>
				</template>
				
				<template v-slot:cell()="data">	
					<span class="text-info"> {{ data.value }} </span>
				</template>
			</b-table>
		</div>

		<NoResults 
			message="No Tasks Found" 
			subtitle="Click here to Create a Task" 
			v-else
			@handleBtnClick="showTaskModal(null)"
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

	export default  {

		name: 'contact-tasks-tab',
		
		components: {
			NoResults,
			ContactTaskModal,
		},

		props: {
			currentContact: Object,
			taskLines: Array,
		},

		data() {
			return {
				taskLine: {},
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
			}
		}
	}
</script>