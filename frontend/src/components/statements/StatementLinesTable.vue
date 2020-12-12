<template>
	<div class="main-card" >
		<div class="card-header mt-4">
			<h4>
				Statement Lines
			</h4>
		</div>
		<b-button variant="primary" class="float-right m-2" size="sm" @click="showStatementLineModal(null)">+ Add a Statement Line</b-button>
		<div v-if="statement.statementLines && statement.statementLines.length">
			<b-table 
				striped 
				hover 
				ref="selectableTable"
				selectable
				:items="statement.statementLines" 
				:fields="fields"
				:sort-by.sync="sortBy"
				:sort-desc.sync="sortDesc"
				:select-mode="selectMode"
				@row-selected="onRowSelected"
				selected-variant="danger"
				sort-icon-left
				responsive="sm"
			>
				<template v-slot:cell()="data">
					<span @click="showStatementLineModal(data.item)" class="text-info"> {{ data.value }} </span>
				</template>
				<template v-slot:cell(amount)="data">
					<span @click="showStatementLineModal(data.item)" class="text-info"> ${{ $formatMoney(data.value) }} </span>
				</template>
				<template v-slot:cell(pledgeAmount)="data">
					<span @click="showStatementLineModal(data.item)" class="text-info"> ${{ $formatMoney(data.value) }} </span>
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
			v-else
			message="No Statement Lines Found" 
			subtitle="+ Add a Statement Line" 
			@handleBtnClick="showStatementLineModal(null)"
		/>

		<ConfirmModal 
			id="confirmModal" 
			title="Delete?" 
			message="Are you sure you want to delete the selected Statement Lines? This cannot be undone"
			@handleConfirm="handleConfirmDelete" 
		/>
	</div>	
</template>

<script>
	import { allowedFields } from "../../constants/tableFields";
	import NoResults from "../Globals/NoResults.vue";
	import ConfirmModal from '../Modals/ConfirmModal.vue';

	export default  {

		name: "statementLinesTable",

		components: {
			NoResults,
			ConfirmModal
		},

		props: {
			statement: Object,
			selected: Array,
		},

		mounted() {

		},

		data() {
			return {
				sortBy: '',
				sortDesc: false,
				selectMode: 'multi',
			}
		},

		methods: {
			onRowSelected(line) {
				this.$emit("onRowSelected", line);
			},

			selectAllRows() {
				this.$refs.selectableTable.selectAllRows();
			},

			clearSelected() {
				this.$refs.selectableTable.clearSelected();
			},

			showStatementLineModal(item) {
				this.$emit("showStatementLineModal", item);
			},

			handleConfirmDelete() {
				let ids = this.selected.map(ele => ele._id);
				this.$emit("handleConfirmDelete", ids);
			},
		},

		computed: {
			fields() {
				let keys = allowedFields.statementLines.map(al => {
					let tmp = {};
					tmp.sortable = true;
					tmp.key = al;
					return tmp;
				});

				return keys;
			}
		}
}

</script>