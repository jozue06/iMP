<template>
	<div>			
		<div v-if="eventLines && eventLines.length > 0">
			<b-button variant="primary" class="float-right m-2" size="sm" @click="showEventModal(null)">Add Event</b-button>
			<b-table
				striped 
				hover 
				ref="eventsTable"
				:items="eventLines" 
				:fields="fields"
				selectable
				@row-selected="onRowSelected"
				selected-variant="danger"
				sort-icon-left
				responsive="sm"
			>
				<template v-slot:cell(date)="data">	
					<span @click="showEventModal(data.item)" class="text-info"> {{ $Moment(data.item.date).format("MMM Do, YY") }} </span>
				</template>
				<template v-slot:cell(time)="data">	
					<span @click="showEventModal(data.item)" class="text-info"> {{ $Moment(data.item.time, "HH:mm:ss").format("h:mm A") }} </span>
				</template>
				<template v-slot:cell()="data">	
					<span @click="showEventModal(data.item)" class="text-info"> {{ data.value }} </span>
				</template>
				<template v-slot:cell(isCompleted)="data">								
					<b-icon class="h4" v-if='data.item.isCompleted === true' icon="check-circle" variant="info"></b-icon>
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
				v-b-modal.confirmDeleteevent
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
			message="No Events Found" 
			subtitle="Click here to Create an Event" 
			v-else
			@handleBtnClick="showEventModal(null)"
		/>

		<ConfirmModal 
			id="confirmDeleteevent"
			title="Delete?" 
			v-bind:message="confirmDeleteMessage" 
			@handleConfirm="handleConfirmDelete" 
		/>

		<ContactEventModal ref="contactEventModal" @doneSaving="doneSaving" v-bind:eventLine="eventLine" v-bind:currentContact="currentContact" />
	</div>
</template>

<script>
	import NoResults from "../Globals/NoResults";
	import { Contacts } from "../../data/contacts";
	import { Events } from "../../data/events";
	import { allowedFields } from "../../constants/tableFields";
	import ContactEventModal from "../Modals/ContactEventModal"
	import ConfirmModal from "../Modals/ConfirmModal";

	export default  {

		name: 'contact-events-tab',
		
		components: {
			NoResults,
			ContactEventModal,
			ConfirmModal,
		},

		props: {
			currentContact: Object,
			eventLines: Array,
		},

		data() {
			return {
				eventLine: {},
				selected: "",
			}
		},

		methods: {
			showEventModal(selectedLine) {
				if (selectedLine) {
					this.eventLine = selectedLine;
				} else {
					this.eventLine  = {}
				}
				this.$refs.contactEventModal.$refs.contactEventModal.show();
			},

			doneSaving() {
				this.clearSelected();				
				this.$emit("refresh");
			},

			onRowSelected(event) {
				this.selected = event;
			},

			selectAllRows() {
				this.$refs.eventsTable.selectAllRows();
			},

			clearSelected() {
				if (this.selected.length) {
					this.$refs.eventsTable.clearSelected();
				}
			},

			handleConfirmDelete() {				
				let ids = this.selected.map(ele => ele._id);
				Events.deleteEvents(ids).then(() => {
					this.$emit("refresh");
					this.$Notification("Deleted", "Deleted the Selected Events", "warning", "", 3000);
				}).catch(e => {
					console.error('e', e);
					throw e;
				});
			},

			toggleComplete() {			
				this.selected.forEach(sel => {
					sel.isCompleted = !sel.isCompleted;
				});
				this.$refs.eventsTable.clearSelected();
			}
		},

		computed: {
			fields() {
				let keys = Object.keys(this.eventLines[0]).map(f => {
					let tmp = {};
					tmp.sortable = true;
					if (allowedFields.eventLines.includes(f)) {
						tmp.key = f;
					} else { 
						tmp.key = "";
					}

					return tmp;
				});
				keys.push("isCompleted");
				return keys;
			},

			confirmDeleteMessage() {
				return "Are you sure you want to delete the selected Events? This cannot be undone";
			},
		}
	}
</script>