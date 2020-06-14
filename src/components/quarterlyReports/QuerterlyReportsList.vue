<template>
	<section class="querterly-reports-list">
		<h1>Querterly Reports</h1>
		{{ $consoleLog("we got reports??? ", reports)}}
		<div v-if="reports.length > 0">
		<b-button variant="primary" class="float-right m-2" size="sm" @click="showReportModal(null)">New Quarterly Report</b-button>
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
				<template v-slot:cell(firstName)="data">
					<b @click="showContactModal(data.item)" class="text-info">{{ data.value }}</b>
				</template>
			</b-table>
			<b-button class="mx-2"  size="sm" @click="selectAllRows">Select all</b-button>
			<b-button class="mx-2" size="sm" @click="clearSelected">Clear selected</b-button>
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
		<router-link
			v-else-if="reports.length == 0" 
			to="/addQuarterlyReport"
			v-slot="{ href, route, navigate}"
		>
			<b-button :href="href" @click="navigate" variant="success" class="m-2" size="sm">
				New Quarterly Report
			</b-button>
		</router-link>
		<ConfirmModal 
			id="confirmModal" 
			title="Delete?" 
			v-bind:message="confirmDeleteMessage" 
			@handleConfirm="handleConfirmDelete" 
		/>
	</section>
</template>

<script>
	import ConfirmModal from '../Modals/ConfirmModal'
	import NoResults from '../NoResults'
	import { QuarterlyReport as Report } from '../../data/models/quarterlyReportModel'
		
	export default  {
		components: {
			ConfirmModal,
			NoResults,
		},
		name: 'querterlyReportsList',
		props: [],
		mounted () {

		},
		data () {
			return {
				reports: this.loadReports(),
				confirmDeleteMessage: "???",
			}
		},
		methods: {
			showReportModal() {

			},

			handleConfirmDelete() {

			},

			loadReports() {
				let reports = []; 
				Report.find({}).then(res => {
					res.forEach(report => {
						if (report._id) {
							report.id = report._id;
							reports.push({...report});
						}
					});
					reports.push(res)
				});
				return reports;
			},
		},
		computed: {
			fields() {
				return Object.keys(this.reports[0]).map(f => {
					let tmp = {};
					tmp.sortable = true;
					
					if (f == "_id" || f == "_schema" || f == "expenseLines") {
						tmp.key = "";
					} else {
						tmp.key = f;
					}
					return tmp;
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	/* .querterly-reports-list {

	} */
</style>