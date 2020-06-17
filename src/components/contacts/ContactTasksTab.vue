<template>
	<div>
		{{ $consoleLog('taskLines', taskLines) }}
		
		<div v-if="taskLines && taskLines.length > 0" class="main-card">
			<b-table
				striped 
				hover 
				ref="commsTable"
				:items="taskLines" 
				:fields="fields"
				sort-icon-left
				responsive="sm"
			>
				<template v-slot:cell(date)="data">	
					<span class="text-info"> {{ $Moment(data.item.date).format("MMM Do, YY") }} </span>
				</template>
				<template v-slot:cell(time)="data">	
					<span class="text-info"> {{ $Moment(data.item.time).format("h:mm a") }} </span>
				</template>
			</b-table>
		</div>

		<NoResults 
			message="No Tasks Found" 
			subtitle="Click here to Create a Task" 
			v-else
			@handleBtnClick="showCommsModal(null)"
		/>

		<!-- <CommsModal ref="commsModal" v-bind:taskLines="taskLines" v-bind:currentContact="currentContact" /> -->
	</div>
</template>

<script>
	// import CommsModal from "../Modals/CommsModal";
	import NoResults from "../NoResults";
	import { Contact } from "../../data/models/contactModel";
	import { Task } from "../../data/models/taskModel";
	import { allowedFields } from "../../constants/tableFields";

	export default  {

		name: 'contact-comms-tab',
		
		components: {
			NoResults,
		},

		props: {
			currentContact: Object,
		},

		created () {
			// get tasks
		},

		data () {
			return {
				taskLine: {},
			}
		},

		methods: {
			showCommsModal(selectedLine) {
				if (selectedLine == null) {
					this.taskLine = Task.create()
					// this.$refs.commsModal.$refs.commsModal.show();
				} else {
					this.taskLine = selectedLine;
					// this.$refs.commsModal.$refs.commsModal.show();
				}
			}
		},

		computed: {
			taskLines() {
				return this.currentContact.taskIds;
			},

			fields() {				
				let keys = Object.keys(this.taskLines[0]).map(f => {
					let tmp = {};
					tmp.sortable = true;

					if (allowedFields.commsList.includes(f)) {
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