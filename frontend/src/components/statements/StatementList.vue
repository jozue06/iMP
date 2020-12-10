<template>
	<section>
		<LoadingSpinner v-bind:loading="loading" />
		<div v-if="!loading" class="main-card">
			<router-link to="/">
				<h1 class="pt-2">Statements</h1>
			</router-link>
		
			<div v-if="statements.length > 0">
				<router-link
					to="/statementCard"
					v-slot="{ href, navigate}"
				>
					<b-button :href="href" @click="navigate" variant="primary" class="float-right m-2" size="sm">
						+ New Manual Statement
					</b-button>
				</router-link>

				<b-button variant="primary" size="md" @click="$refs.statementCsvUploadModal.$refs.statementCsvUploadModal.show()">+ Upload CSV</b-button>
				<StatementCsvUploadModal ref="statementCsvUploadModal" />
				<StatementsListTable ref="statementsListTable" v-bind:statements="statements" @onRowSelected="onRowSelected" v-bind:selected="selected" />
				<b-button class="m-2" size="sm" @click="selectAllRows">Select all</b-button>
				<b-button class="m-2" size="sm" @click="clearSelected">Clear selected</b-button>				
				
				<b-button 
					class="m-2" 
					variant="danger" 
					size="sm" 
					:disabled="selected.length == 0" 
					v-b-modal.confirmModal>
						Delete selected
				</b-button>
			</div>
			<router-link
				v-else-if="statements.length == 0" 
				to="/statementCard"
				v-slot="{ href, navigate}"
			>
				<b-button :href="href" @click="navigate" variant="success" class="m-2" size="sm">
					+ New Manual Statement
				</b-button>
			</router-link>
			<ConfirmModal 
				id="confirmModal" 
				title="Delete?" 
				v-bind:message="confirmDeleteMessage" 
				@handleConfirm="handleConfirmDelete" 
			/>
		</div>
	</section>
</template>

<script>
	import ConfirmModal from '../Modals/ConfirmModal'
	import NoResults from '../Globals/NoResults'
	import { Statements  } from '../../data/statements'
	import { allowedFields } from "../../constants/tableFields";
	import LoadingSpinner from "../Globals/LoadingSpinner";
	import StatementsListTable from "./StatementsListTable";
	import StatementCsvUploadModal from '../Modals/StatementCsvUploadModal';

	export default  {
		name: 'statementList',
		components: {
			ConfirmModal,
			NoResults,
			LoadingSpinner,
			StatementsListTable,
			StatementCsvUploadModal,
		},

		mounted () {
			this.loadStatements()
		},

		data() {
			return {
				loading: true,
				statements: [],
				selected: [],
				confirmDeleteMessage: "Are you sure you want to delete this Statement? This cannot be un-done",
			}
		},

		methods: {
			onRowSelected(line) {
				this.selected = line;
			},

			selectAllRows() {			
				this.$refs.statementsListTable.$refs.selectableTable.selectAllRows();
			},

			clearSelected() {
				this.$refs.statementsListTable.$refs.selectableTable.clearSelected();
			},
			
			handleConfirmDelete() {
				let ids = this.selected.map(ele => ele._id);
				Statements.deleteStatements(ids).then(res => {					
					this.refresh();
					this.$Notification("Deleted", "Deleted the Selected Statements", "warning", "", 3000);
				}).catch(e => {
					console.error('e', e);
					throw e;
				});
			},

			loadStatements() {
				this.loading = true;
				let statements = []; 
				Statements.getStatements().then(res => {
					this.statements = res;
					this.loading = false;
				});
			},

			refresh() {
				this.loadStatements();
			}
		},

		computed: {
		}
	}
</script>