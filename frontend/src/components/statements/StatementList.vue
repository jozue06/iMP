<template>
	<section>
		<LoadingSpinner v-bind:loading="loading" />
		<div v-if="!loading" class="main-card">
			<router-link to="/">
				<h1 class="pt-2">Statements</h1>
			</router-link>
		
			<div v-if="statements.length > 0">
				<router-link
					to="/statementView"
					v-slot="{ href, navigate}"
				>
					<b-button :href="href" @click="navigate" variant="primary" class="float-right m-2" size="sm">
						+ New Manual Statement
					</b-button>
				</router-link>
				<b-table
					striped 
					hover 
					ref="selectableTable"
					selectable
					:items="statements" 
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
						<router-link
							:to="{ name: 'statementView', params: { statementId: data.item._id } }"
							v-slot="{ href, navigate}"
						>
							<span :href="href" @click="navigate" class="text-info"> {{ data.value }} </span>
						</router-link>
					</template>
					<template v-slot:cell(month)="data">
							<router-link
							:to="{ name: 'statementView', params: { statementId: data.item._id } }"
							v-slot="{ href, navigate}"
						>
							<span :href="href" @click="navigate" class="text-info"> {{ $GetMonth(data.value) }} </span>
						</router-link>
					</template>
				</b-table>
				<b-button class="m-2" size="sm" @click="selectAllRows">Select all</b-button>
				<b-button class="m-2" size="sm" @click="clearSelected">Clear selected</b-button>
				<b-button 
					class="m-2" 
					variant="danger" 
					size="sm" 
					:disabled="selected == 0" 
					v-bind:selected="selected"
					v-b-modal.confirmModal>
						Delete selected
				</b-button>
			</div>
			<router-link
				v-else-if="statements.length == 0" 
				to="/statementView"
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

	export default  {
		name: 'statementList',
		components: {
			ConfirmModal,
			NoResults,
			LoadingSpinner,
		},

		mounted () {
			this.loadStatements()
		},

		data() {
			return {
				loading: true,
				statements: [],
				confirmDeleteMessage: "Are you sure you want to delete this Statement? This cannot be un-done",
				selected: "",
				sortBy: '',
				sortDesc: false,
				selectMode: 'multi',
			}
		},

		methods: {
			onRowSelected(report) {
				this.selected = report;
			},

			selectAllRows() {
				this.$refs.selectableTable.selectAllRows();
			},

			clearSelected() {
				this.$refs.selectableTable.clearSelected();
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
			fields() {
				let keys = Object.keys(this.statements[0]).map(f => {
					let tmp = {};
					tmp.sortable = true;

					if (allowedFields.itinReports.includes(f)) {
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