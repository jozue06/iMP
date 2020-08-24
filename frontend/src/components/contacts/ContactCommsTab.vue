<template>
	<div>		
		<div v-if="commsLines && commsLines.length > 0">
			<b-button variant="primary" class="float-right m-2" size="sm" @click="showCommsModal(null)">Add Communication</b-button>
			<b-table
				striped 
				hover 
				ref="commsTable"
				:items="commsLines" 
				:fields="fields"
				selectable
				@row-selected="onRowSelected"
				selected-variant="danger"
				sort-icon-left
				responsive="sm"
			>
				<template v-slot:cell(date)="data">
					
					<span @click="showCommsModal(data.item)" class="text-info"> {{ $Moment(data.item.date).format("MMM Do, YY") }} </span>
				</template>
				<template v-slot:cell(time)="data">	
					<span @click="showCommsModal(data.item)" class="text-info"> {{ $Moment(data.item.time, "HH:mm:ss").format("h:mm A") }} </span>
				</template>
				<template v-slot:cell()="data">	
					<span @click="showCommsModal(data.item)" class="text-info"> {{ data.value }} </span>
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
			message="No Communications Found" 
			subtitle="Click here to Create a Communication" 
			v-else
			@handleBtnClick="showCommsModal(null)"
		/>

		<ConfirmModal 
			id="confirmModal" 
			title="Delete?" 
			v-bind:message="confirmDeleteMessage" 
			@handleConfirm="handleConfirmDelete" 
		/>

		<CommsModal ref="commsModal" @doneSaving="doneSaving" v-bind:commsLine="commsLine" v-bind:currentContact="currentContact" />
	</div>
</template>

<script>
	import CommsModal from "../Modals/CommsModal";
	import ConfirmModal from "../Modals/ConfirmModal";
	import NoResults from "../NoResults";
	import { Comms } from "../../data/communications";
	import { allowedFields } from "../../constants/tableFields";

	export default  {

		name: 'contact-comms-tab',
		
		components: {
			CommsModal,
			NoResults,
			ConfirmModal,
		},

		props: {
			commsLines: Array,
			currentContact: Object,
		},

		mounted () {

		},

		data () {
			return {
				commsLine: {},
				selected: [],
			}
		},

		methods: {
			showCommsModal(selectedLine) {
				if (selectedLine) {
					this.commsLine = selectedLine;
				} else {
					this.commsLine = {}
				}
				this.$refs.commsModal.$refs.commsModal.show();	
			},

			showContactModal(item) {			
				if (item) {				
					this.selectedContact = item;
				} else {
					this.selectedContact = {};
				}
				this.$refs.contactModal.$refs.contactModal.show();
			},

			onRowSelected(contact) {
				this.selected = contact;
			},

			selectAllRows() {
				this.$refs.commsTable.selectAllRows();
			},

			clearSelected() {
				if (this.selected.length) {
					this.$refs.commsTable.clearSelected();
				}
			},

			doneSaving() {
				this.clearSelected();
				this.$emit("refresh");
			},

			handleConfirmDelete() {
				let ids = this.selected.map(ele => ele._id);
				Comms.deleteComm(ids).then(() => {
					this.$emit("refresh");
					this.$Notification("Deleted", "Deleted the Selected Communications", "warning", "", 3000);
				}).catch(e => {
					console.log('e', e);
					throw e;
				});
			},

		},

		computed: {
			fields() {
				let keys = Object.keys(this.commsLines[0]).map(f => {
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
			},
			
			confirmDeleteMessage() {
				return "Are you sure you want to delete the selected Communications? This cannot be undone."
			}
		}
	}
</script>