<template>
	<section>
		<LoadingSpinner v-bind:loading="loading" />
		<div v-if="!loading" class="main-card">
			<router-link to="/">
				<h1 class="pt-2">Quarterly Reports</h1>
			</router-link>
		
			<div v-if="reports.length > 0">
				<router-link
					to="/quarterlyReport"
					v-slot="{ href, navigate}"
				>
					<b-button :href="href" @click="navigate" variant="primary" class="float-right m-2" size="sm">
						+ New Quarterly Report
					</b-button>
				</router-link>
				<b-table
					striped 
					hover 
					ref="selectableTable"
					selectable
					:items="reports" 
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
							:to="{ name: 'quarterlyReport', params: { reportId: data.item._id } }"
							v-slot="{ href, navigate}"
						>
							<span :href="href" @click="navigate" class="text-info"> {{ data.value }} </span>
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
				v-else-if="reports.length == 0" 
				to="/quarterlyReport"
				v-slot="{ href, navigate}"
			>
				<b-button :href="href" @click="navigate" variant="success" class="m-2" size="sm">
					+ New Quarterly Report
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
	import { QuarterlyReports  } from '../../data/quarterlyReports'
	import { allowedFields } from "../../constants/tableFields";
	import LoadingSpinner from "../Globals/LoadingSpinner";
		
	export default  {
		name: 'quarterlyReportsList',
		components: {
			ConfirmModal,
			NoResults,
			LoadingSpinner,
		},

		mounted () {
			this.loadReports()
		},

		data() {
			return {
				loading: true,
				reports: [],
				confirmDeleteMessage: "Are you sure you want to delete this Quarterly Report? This cannot be un-done",
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
				QuarterlyReports.deleteQuarterlyReport(ids).then(res => {					
					this.refresh();
					this.$Notification("Deleted", "Deleted the Selected Quarterly Reports", "warning", "", 3000);
				}).catch(e => {
					console.error('e', e);
					throw e;
				});
			},

			loadReports() {
				this.loading = true;
				let reports = []; 
				QuarterlyReports.getQuarterlyReports().then(res => {
					res.forEach(report => {
						if (report._id) {
							report.id = report._id;
							reports.push({...report});
						}
					});
					this.loading = false;
				});
				this.reports = reports;
			},

			refresh() {
				this.reports = this.loadReports();
			}
		},

		computed: {
			fields() {
				let keys = Object.keys(this.reports[0]).map(f => {
					let tmp = {};
					tmp.sortable = true;

					if (allowedFields.qtrReports.includes(f)) {
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