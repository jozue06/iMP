<template>

	<b-modal ref="groupModal" hide-footer v-bind:group="group">
		
		<div>
			<p>
				Contact Group Name
			</p>
		</div>
		<b-form-input
			type="text"
			v-model="group.name"
			required
			placeholder="Group Name"
			name="name"
		></b-form-input>
		<b-button class="float-right mt-2" @click="onSave" :disabled="loading" variant="primary">
			Save
			<b-spinner v-if="loading" small type="grow"></b-spinner>				
		</b-button>
	</b-modal>
</template>

<script>
	import { ContactGroups } from '../../data/contactGroups';

	export default  {

		name: 'groupModal',

		props: {
			group: Object
		},

		mounted () {

		},

		data() {
			return {
				loading: false,
			}
		},

		methods: {
			onSave() {				
				this.loading = true;
				ContactGroups.save(this.group).then((res) => {
					this.$Notification("Success!", "Successfully Saved the Contact Group", "primary");
					this.loading = false;
					this.$emit("saveContactGroup");
					this.$refs.groupModal.hide();
				}).catch(e => {
					this.$Notification("Error", `Error Saving Contact Group: ${e}`, "warning", "", 3000);
					this.loading = false;
					throw e;
				});

			}
		},
	}
</script>