<template>
	<section>
		<h1>statement-view Component</h1>
		<b-button variant="primary" size="md" @click="$refs.statementCsvUploadModal.$refs.statementCsvUploadModal.show()">+ Upload CSV</b-button>
		<StatementCsvUploadModal ref="statementCsvUploadModal" />
	</section>
</template>

<script>
	import StatementCsvUploadModal from '../Modals/StatementCsvUploadModal';
	export default  {

		name: 'statementView',

		components: {
			StatementCsvUploadModal,
		},

		props: {
			currentStatement: Object
		},

		mounted() {

		},

		data() {
			return {
				
			};
		},

		methods: {
		},

		computed: {

		}
}

</script>