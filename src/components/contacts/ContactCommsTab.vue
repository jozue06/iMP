<template>
	<div>
		<div v-if="commsLines.length > 0" class="main-card">
			<b-table
				striped 
				hover 
				ref="commsTable"
				:items="commsLines" 
				:fields="fields"
				sort-icon-left
				responsive="sm"
			>
			</b-table>
		</div>

		<NoResults 
			message="No Communications Found" 
			subtitle="Click here to Create a Communication" 
			v-else
			@handleBtnClick="showCommsModal(null)"
		/>

		<CommsModal ref="commsModal" v-bind:commsLine="commsLine" />
	</div>
</template>

<script>
	import CommsModal from "../Modals/CommsModal";
	import NoResults from "../NoResults";
	import { Contact, ContactComms } from "../../data/models/contactModel";

	export default  {

		name: 'contact-comms-tab',
		
		components: {
			CommsModal,
			NoResults,
		},

		props: {

		},

		mounted () {

		},

		data () {
			return {
				commsLines: [],
				commsLine: {},
			}
		},

		methods: {
			showCommsModal(selectedLine) {
				if (selectedLine == null) {
					this.commsLine = ContactComms.create()
					this.$refs.commsModal.$refs.commsModal.show();
				} else {
					this.commsLine = selectedLine;
					this.$refs.commsModal.$refs.commsModal.show();
				}
			}
		},

		computed: {

		}
}

</script>