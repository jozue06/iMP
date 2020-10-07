<template>
	<section>
		<div class="main-card">
			<div class="mt-4">
				<ReportTop v-bind:currentReport="currentReport" :reportType=2 linkTo="/MAReports"/>
			</div>

			<b-row class="justify-content-around">
				<b-col class="my-2">
					<b-button size="sm" v-b-toggle.collapse-info variant="info">More Details</b-button>
				</b-col>
			</b-row>

			<b-collapse id="collapse-info">
				<ReportMoreInfo v-bind:currentReport="currentReport" :reportType=2 @saveReport="saveReport"/>
			</b-collapse>

			<b-card title="Prayer Requests & Comments">
				<b-form-textarea
					class="text-center"
					v-model="currentReport.comments"
					placeholder="Leave a note or a prayer request ..."
					rows="6"
					max-rows="12"
					debounce="2000"
					@blur="saveReport"
				>
				</b-form-textarea>
			</b-card>
		</div>	
	</section>
</template>

<script>
	import moment from 'moment';
	import ReportTop from "../Globals/ReportTop";
	import ReportMoreInfo from "../Globals/ReportMoreInfo";
	import ConfirmModal from "../Modals/ConfirmModal";
	import { MAReports } from "../../data/maReports"


	export default {
		components: {
			ReportTop,
			ReportMoreInfo,
		},

		methods: {
			formatDate(dateTimeObject) {
				return moment(dateTimeObject).format('YYYY');
			},

			saveReport() {
				MAReports.save(this.currentReport).then(res => {
					this.$Notification("Success", "Succesfully Saved the MA Report", "primary");
				}).catch(e => {
					console.error('eeek error saving report', e);
					throw e;
				});
			}
		},
		
		data() {
			return {
				loading: false,
				currentReport: {},
			};
		},

		created() {
			if (this.$router.currentRoute.params.reportId || this.$router.currentRoute.query.reportId) {
				let reportId;
				if (this.$router.currentRoute.params.reportId) {
					reportId = this.$router.currentRoute.params.reportId;
					this.$router.push({ path: 'MAReport', query: { reportId: reportId}});
				} else {
					reportId = this.$router.currentRoute.query.reportId;
				}
				
				MAReports.getMaReport(reportId).then(res => {
					this.currentReport = res;
				}).catch(e => {
					console.error(' Report.find eek ', e);
				});
			} else {
				this.currentReport = {
					month: 1,
					year: moment().format("YYYY"),
				};
			}
		},

		computed: {
		}
	}
</script>