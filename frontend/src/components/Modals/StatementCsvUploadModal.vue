<template>
	<b-modal top ref="statementCsvUploadModal" title="Upload Statement CSV" hide-footer>
		<b-form-group class="mr-1" label="Statement CSV">
			<b-form-file
				v-model="selectedFile"
				accept=".csv">
			</b-form-file>
		</b-form-group>
		<b-form-group class="mt-1 mr-1" label="Would you like to utilize Magic Mesh?">
			<b-form-checkbox
				class="float-right"
				switch
				size="lg"
				id="checkbox"
				v-model="useMagicMesh"
				name="checkbox"
				value=true
				unchecked-value=false
			/>
			<label class="mt-3"> 
				Using Magic Mesh will try to automatically find and mesh the contacts from this statement with your contacts
			</label>
		</b-form-group>
		<b-form-group class="mt-1 mr-1" label="Would you like to Automatically create contacts?">
			<b-form-checkbox
				class="float-right"
				switch
				size="lg"
				id="checkbox2"
				v-model="createContacts"
				name="checkbox2"
				value=true
				unchecked-value=false
			/>
			<label class="mt-3"> 
				Using this will create new Contacts from the statement lines that do not exist and add them to your Contact list.
			</label>
		</b-form-group>
		<b-form-group class="mt-2 mr-1">
			<b-button 
				class="float-right" 
				type="submit" 
				@click="upload" 
				variant="primary"
			>
				Upload
			</b-button>
		</b-form-group>
	</b-modal>
</template>

<script>
	import { Statements } from "../../data/statements";

	export default  {
		name: 'statementCsvUploadModal',

		data() {
			return {
				selectedFile: null,
				useMagicMesh: false,
				createContacts: false,
			};
		},

		methods: {
			upload() {
				Statements.uploadStatementCsv(this.selectedFile, this.useMagicMesh, this.createContacts).then(res => {
					this.selectedFile = null;
					this.useMagicMesh = false;
					this.createContacts = false;
					this.$refs.statementCsvUploadModal.hide();
					this.$Notification("Success!", "Your Statement CSV was successfully uploaded", "primary", "", 3000);
				}).catch(e => {
					console.error(' uploadPhoto error ', e);
					this.$Notification("Error", "There was an error uploading your Statement CSV", "warning", "", 6000);
					throw e;
				});
			},
		},
	}

</script>