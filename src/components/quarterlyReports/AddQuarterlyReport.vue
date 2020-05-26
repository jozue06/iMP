<template>
	<section class="add-quarterly-report">
		<!-- <QuarterlyReportTop /> -->
		<QuarterlyReportCard 
			v-on:showAddLineModal='showAddLineModal()'
			v-on:showDeleteLineModal='showDeleteLineModal()'
		/>
		<AddLineModal ref="addLineModal"/>
		<!-- <QuarterlyReportMid 
			v-on:showAddDirectDonorModal='showAddDirectDonorModal()'
			v-on:showAddPersonalOfferingModal='showAddPersonalOfferingModal()'
		/> -->
		<!-- BREAK -->
		<!-- <AddDirectDonorModal ref="addDirectDonorModal"/> -->
		<!-- <b-button type="submit" variant="primary">Submit</b-button> -->
	</section>
</template>

<script>
	import { insertQuarterlyReport } from '@/data/data';
	import "bootstrap/dist/css/bootstrap.css";
	import "bootstrap-vue/dist/bootstrap-vue.css";
	import QuarterlyReportTop from './QuarterlyReportTop'
	import QuarterlyReportCard from './QuarterlyReportCard'
	import QuarterlyReportMid from './QuarterlyReportMid'
	import AddDirectDonorModal from "../Modals/AddDirectDonorModal";
	import AddLineModal from "../Modals/AddLineModal"
	import { findAllQuarterlyReports } from '@/data/data'

	export default {
		components: {
			QuarterlyReportTop,
			QuarterlyReportCard,
			QuarterlyReportMid,
			AddLineModal,
			AddDirectDonorModal
		},

		methods: {
			onSubmit() {
				insertQuarterlyReport(this.form);
			// 	this.form = {};
			// 	this.$nextTick(() => {
			// 		this.$Notification("Success!", "Successfully Added the Contact");
			// 		this.$refs.form.reset();
			// 	});
			},

			showAddDirectDonorModal() {
				this.$refs.addDirectDonorModal.$refs.addDirectDonorModal.show()
			},
			
			showAddPersonalOfferingModal() {
				
			},

			showAddLineModal() {
				this.$refs.addLineModal.$refs.addLineModal.show()
			},

			showDeleteLineModal() {
				// console.log('here showDeleteLineModal');
			},

			findAllQuarterlyReports() {
				findAllQuarterlyReports().then((data) => {	
					// console.log('data ' , data);
					
				});
				return "";
			}
			
		},

		data() {
			return {
				reports: this.findAllQuarterlyReports(),
				form: {},
				// countries: COUNTRIES.map(c => ({ value: c.name, text: c.name })),
				// states: STATES.map(c => ({ value: c.name, text: c.name }))
			};
		},

		watch: {
			quarterlyReport: {
				handler(c) {
					this.form = c || {};
				},
				deep: true,
				immediate: true
			}
		},
	
	};
</script>

<style scoped>
	section {
		float: right;
		width: 80%;
	}

	.mid-section {
		display: flex;
		flex-direction: row;
	}

	.qtr-statements-container {
		width: 40%;
		display: flex;
		flex-direction: column;
		margin-left: 2px;
		border: 1px solid grey;
		border-radius: 5px;
	}

	.qtr-misc-container {
		width: 60%;
		display: flex;
		flex-direction: column;
		margin-left: 2px;
		border: 1px solid grey;
		border-radius: 5px;
	}

	.sub-section {
		width: 100%;
		display: flex;
	} 

	.qtr-container {
		display: flex;
		margin-left: 2px;
		border: 1px solid grey;
		border-radius: 5px;
	}

	.small-grouping {
		max-width: 200px;
		margin-right: 10px;
	}

	.bass-amount {
		margin-left: 40%;
	}
</style>