<template>
	<b-modal size="sm" top ref="statementCsvUploadModal" title="Upload Statement CSV" hide-footer>
		<b-form-group class="mr-1" label="Statement CSV">
			<b-form-file
				@change="selectFile"
				v-model="selectedFile"
				accept=".csv">
			</b-form-file>
		</b-form-group>
		<b-button 
			class="float-right" 
			type="submit" 
			@click="upload" 
			variant="primary"
		>
			Upload
		</b-button>
	</b-modal>
</template>

<script>
	import { Statements } from "../../data/statements";

	export default  {

		name: 'statementCsvUploadModal',

		components: {

		},

		props: {

		},

		mounted() {

		},

		data() {
			return {
				selectedFile: null,
				fileSelected: false,
			};
		},

		methods: {
			selectFile() {
				this.fileSelected = true;
			},

			upload() {
				Statements.uploadStatementCsv(this.selectedFile).then(res => {
					this.$Notifications("Success!", "Your Statement CSV was successfully uploaded", "primary", 3000);
					this.selectedFile = null;
				}).catch(e => {
					console.error(' uploadPhoto error ', e);
					this.$Notifications("Error", "There was an error uploading your Statement CSV", "warning", 6000);
					throw e;
				});
			},
		},

		computed: {

		}
}

</script>