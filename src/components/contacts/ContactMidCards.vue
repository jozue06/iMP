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
					<b-col class="address">
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
				<b-tabs class="mt-3" content-class="mt-2">
					<b-tab title="District" active>
						<b-form-group label="District">
							<b-form-input
								type="text"
								v-model="currentContact.district"
								required
								placeholder="District?"
								name="disctrict"
							></b-form-input>
						</b-form-group> 
					</b-tab>
					<b-tab title="Section">
						<b-form-group label="Section">
							<b-form-input
								type="text"
								v-model="currentContact.section"
								required
								placeholder="Section?"
								name="section"
							></b-form-input>
						</b-form-group> 
					</b-tab>
				</b-tabs>	
			</b-col>
		</b-row>
	</div>	
</template>

<script>

	export default  {
		name: 'contact-mid-cards',

		props: {
			currentContact: Object,
		},

		mounted () {

		},

		data () {
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