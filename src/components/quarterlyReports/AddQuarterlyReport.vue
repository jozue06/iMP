<template>
	<section class="add-quarterly-report">
		<!-- <QuarterlyReportTop /> -->
		<QuarterlyReportCard />
		
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
	
	import QuarterlyReportTop from './QuarterlyReportTop'
	import QuarterlyReportCard from './QuarterlyReportCard'
	import QuarterlyReportMid from './QuarterlyReportMid'
	import AddDirectDonorModal from "../Modals/AddDirectDonorModal";

	export default {
		components: {
			QuarterlyReportTop,
			QuarterlyReportCard,
			QuarterlyReportMid,
			AddDirectDonorModal
		},

		methods: {
			onSubmit() {
			},			
		},

		data() {
			return {
				quarterlyReport: {},
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