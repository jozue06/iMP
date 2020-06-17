<template>
	<div>		
		<div v-if="commsLines && commsLines.length > 0" class="main-card">
			<b-table
				striped 
				hover 
				ref="commsTable"
				:items="commsLines" 
				:fields="fields"
				sort-icon-left
				responsive="sm"
			>

			<template v-slot:cell(date)="data">	
				<span class="text-info"> {{ $Moment(data.item.date).format("MMM Do, YY") }} </span>
			</template>
			<template v-slot:cell(time)="data">	
				<span class="text-info"> {{ $Moment(data.item.time).format("h:mm a") }} </span>
			</template>
			

			</b-table>
		</div>

		<NoResults 
			message="No Communications Found" 
			subtitle="Click here to Create a Communication" 
			v-else
			@handleBtnClick="showCommsModal(null)"
		/>

		<CommsModal ref="commsModal" v-bind:commsLine="commsLine" v-bind:currentContact="currentContact" />
	</div>
</template>

<script>
	import CommsModal from "../Modals/CommsModal";
	import NoResults from "../NoResults";
	import { Contact, ContactComms } from "../../data/models/contactModel";
	import { allowedFields } from "../../constants/tableFields";

	export default  {

		name: 'contact-comms-tab',
		
		components: {
			CommsModal,
			NoResults,
		},

		props: {
			currentContact: Object,
		},

		mounted () {

		},

		data () {
			return {
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
			commsLines() {
				return this.currentContact.communications;
			},

			fields() {				
				let keys = Object.keys(this.commsLines[0]).map(f => {
					let tmp = {};
					tmp.sortable = true;

					if (allowedFields.commsList.includes(f)) {
						tmp.key = f;
					} else { 
						tmp.key = "";
					}

					return tmp;
				});

				return keys;
			}
		}
	}
</script>