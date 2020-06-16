<template>

	<b-modal ref="groupModal" hide-footer v-bind:group="group">
		
		<div>
			<p>
				Please enter a Contact Group Name
			</p>
		</div>
		<b-form-input
			type="text"
			v-model="group.groupName"
			required
			placeholder="Group Name"
			name="groupName"
		></b-form-input>
		<b-button class="float-right mt-2" @click="onSave" :disabled="loading" variant="primary">
			Save
			<b-spinner v-if="loading" small type="grow"></b-spinner>				
		</b-button>
	</b-modal>
</template>

<script>
	export default  {

		name: 'groupModal',

		props: {
			group: Object
		},

		mounted () {

		},

		data () {
			return {
				loading: false,
			}
		},

		methods: {
			onSave(s) {
				this.loading = true;
				this.group.save().then((res) => {
					this.$refs.groupModal.hide();
					this.$Notification("Success!", "Successfully Saved the Contact Group", "primary");
					this.loading = false;
					this.$emit("saveContactGroup");
				}).catch(e => {
					this.$Notification("Error", `Error Saving Contact Group: ${e}`, "warning", "", 3000);
					this.loading = false;
					throw e;
				});
			}
		},

		computed: {

		}
}

</script>