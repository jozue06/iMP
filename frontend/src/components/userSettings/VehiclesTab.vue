<template>
	<div>
		<div v-if="currentSettings.vehicles && currentSettings.vehicles.length > 0">
			<b-button size="sm" variant="primary" class="float-right m-2" @click="showVehicleModal(null)"> + Add A Vehicle </b-button>
			<b-table
				striped 
				hover 
				ref="selectableTable"
				selectable
				:items="currentSettings.vehicles" 
				:fields="fields"
				@row-selected="onRowSelected"
				selected-variant="danger"
				sort-icon-left
				responsive="sm"
			>
				<template v-slot:cell(edit)="data">	
					<span @click="showVehicleModal(data.item)" class="text-info">edit</span>
				</template>
				<template v-slot:cell(active)="data">
					<b-icon class="h4" v-if='data.item.active === true' icon="check-circle" variant="info"></b-icon>
					<b-icon class="h4" v-else icon="circle" variant="danger"></b-icon>
				</template>
					<template v-slot:cell(default)="data">
					<b-icon class="h4" v-if='data.item.default === true' icon="check-circle" variant="info"></b-icon>
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
				v-b-modal.confirmModal>
					Delete selected
			</b-button>
		</div>

		<NoResults 
			message="No Vehicles Found" 
			subtitle="Click here to Add a Vehicle" 
			v-else
			@handleBtnClick="showVehicleModal(null)"
		/>

		<ConfirmModal 
			id="confirmModal" 
			title="Delete?" 
			v-bind:message="confirmDeleteMessage" 
			@handleConfirm="handleConfirmDelete" 
		/>

		<VehicleModal ref="vehicleModal" v-bind:currentVehicle="currentVehicle"/>
	</div>
</template>

<script>
	import VehicleModal from "../Modals/VehicleModal";
	import ConfirmModal from "../Modals/ConfirmModal"
	import NoResults from "../Globals/NoResults"
	import { allowedFields } from "../../constants/tableFields";
	export default  {

		name: 'vehicles-tab',

		components: {
			VehicleModal,
			ConfirmModal,
			NoResults
		},

		props: {
			currentSettings: Object,
		},

		mounted() {

		},

		data() {
			return {
				currentVehicle: {},
				selected: "",
			}
		},

		methods: {
			showVehicleModal(selectedVehicle) {
				if (selectedVehicle) {
					this.currentVehicle = selectedVehicle;
				} 

				this.$refs.vehicleModal.$refs.vehicleModal.show();
			},

			onRowSelected(vehicle) {
				this.selected = vehicle;
			},
			
			selectAllRows() {
				this.$refs.selectableTable.selectAllRows();
			},

			clearSelected() {
				this.$refs.selectableTable.clearSelected();
			},

			handleConfirmDelete() {

			}
		},

		computed: {
			fields() {
				let keys = allowedFields.vehicleFields;

				keys.unshift("edit");

				return keys;
			},

			confirmDeleteMessage() {
				return "";
			}
		}
	}
</script>