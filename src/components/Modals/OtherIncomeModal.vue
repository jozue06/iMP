<template>
	<section>
		<b-modal top ref="otherIncomeModal" title="Other Income" hide-footer v-bind:otherIncomeLine="otherIncomeLine" v-bind:currentReport="currentReport">
			<p></p>
			<div>
				<b-row>
					<b-col cols="6">
						<ContactSearchComponent @rowClicked="selected" />
					</b-col>
				</b-row>
			</div>
				<b-row v-if="currentContact" class="align-items-center">
					<b-col>
						<label> Name: </label>
						<div>
							{{ currentContact.firstName }} {{ currentContact.lastName }}
						</div>
						<br>
						<label> phone: </label>
						<br>
						{{ currentContact.phone }}
					</b-col>
					<b-col>
						<label> email: </label>
						<br>
						{{ currentContact.email }}
						<br>
						<label> address: </label>
						<br>
						{{ currentContact.address }},
						{{ currentContact.city }}, 
						{{ currentContact.postalCode }}
						<br>
						{{ currentContact.country }}
						<br>
					</b-col>
					<b-col>
						<label> Name: </label>
						<div>
							{{ currentContact.firstName }} {{ currentContact.lastName }}
						</div>
						<br>
						<label> phone: </label>
						<br>
						{{ currentContact.phone }}
					</b-col>
					<b-button class="mb-2" size="sm" variant="danger" @click="clear">Clear</b-button>
				</b-row>
		</b-modal>
	</section>
</template>

<script>
	import ContactSearchComponent from "../ContactSearchComponent";
	export default  {

		name: 'otherIncomeModal',

		components: {
			ContactSearchComponent
		},

		props: {
			otherIncomeLine: Object,
			currentReport: Object,
		},

		mounted() {

		},

		data() {
			return {
				currentContact: "",
			}
		},

		methods: {
			selected(item) {
				console.log('item?', item);
				this.currentContact = item;
			},

			clear() {
				this.currentContact = "";
			}
		},

		computed: {

		}
}

</script>