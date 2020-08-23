<template>
	<div class="mx-3">
		<b-row align-v="center">
			<b-col class="mid-cards">
				<div class="mt-2">
					<p>
						Secondary Info
					</p>
				</div>
				<b-row @click="showAddAddressModal" v-if="currentContact.secondAddress" class="custom-hover align-items-center mb-2">	
					<b-col>
						<label> address: </label>
						<br>
						{{ currentContact.secondAddress }},
						{{ currentContact.secondCity }},
						{{ currentContact.secondPostalCode }}
						<br>
						{{ currentContact.secondCountry }}
						<br>
					</b-col>
					<b-col>
						<label> email: </label>
						<br>
						{{ currentContact.secondEmail }}
						<br>
						<label> phone: </label>
						<br>
						{{ currentContact.secondPhone }}
					</b-col>
				</b-row>
				<b-row v-else class="align-items-center mb-2">
					<b-col cols="12">
						<b-button variant="primary" class="m-2" size="sm" @click="showAddAddressModal">+ Add Secondary Address</b-button>
					</b-col>
				</b-row>
			</b-col>
			<b-col class="mid-cards">
				<DistrictSelector v-bind:currentContact="currentContact"/>
			</b-col>
		</b-row>
	</div>	
</template>

<script>
	import DistrictSelector from '../DistrictSelector';
	
	export default  {
		name: 'contact-mid-cards',

		components: {
			DistrictSelector
		},

		props: {
			currentContact: Object,
		},

		mounted () {

		},

		data() {
			return {

			}
		},

		methods: {
			showAddAddressModal() {
				this.$emit("showAddAddressModal");
			}
		},
	}
</script>