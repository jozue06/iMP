<template>
	<section>
		<h1>statement-view Component</h1>
		<div class="row sub-section">
			<!-- v-if="!previewPath"  -->
			<b-form-group class="mr-1" label="Statement CSV">
				<b-form-file
					@change="selectFile"
					v-model="selectedFile"
					accept=".csv">
				</b-form-file>
			</b-form-group>
			<!-- <div v-else>
				<img :src=previewPath alt="left" style="max-width:350px; max-height:350px">
				<b-button @click="deleteImage" class="float-right" variant="danger"> X </b-button>
			</div> -->

			<b-button 
				class="float-right" 
				type="submit" 
				@click="upload" 
				variant="primary"
			>
				Upload
			</b-button>
		</div>
	</section>
</template>

<script>
	import { Statements } from "../../data/statements";


	export default  {

		name: 'statementView',

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
					console.log('res ? ', res);
					
					// this.expenseLine = res;
					// this.needsUpload = false;
					// this.selectedFile = null;
					// this.showUploadBtn = false;
				}).catch(e => {
					console.error(' uploadPhoto error ', e);
				});
			},
		},

		computed: {

		}
}

</script>