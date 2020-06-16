<template>
	<div>
			<b-row align-v="center">
				<b-col class="mid-cards">

						checkbox for individual []

						<br>
						{{ currentContact.firstName }}
						<br>
						{{ currentContact.lastName }}
						<br>
						{{ currentContact.address }}
						<br>
						{{ currentContact.city }}
						<br>
						{{ currentContact.country }}
						<br>
						{{ currentContact.email }}
						<br>
						{{ currentContact.phone }}

					<p v-if="currentContact.notes">
						{{ currentContact.notes.text }}
					</p>
				</b-col>
				<b-col class="mid-cards">
					<p> other stuffs 1: </p>
					church or org name:
					{{ currentContact.orgName }}
					<br>
					<b-form-group label="District">
						<b-form-input
							type="text"
							v-model="currentContact.district"
							required
							placeholder="District?"
							name="disctrict"
						></b-form-input>
					</b-form-group> 
					<b-form-group label="Section">
						<b-form-input
							type="text"
							v-model="currentContact.section"
							required
							placeholder="Section?"
							name="section"
						></b-form-input>
					</b-form-group> 
				</b-col>
				<b-col class="mid-cards">
					3{{ currentContact.lastName }}
				</b-col>
			</b-row>
	</div>
</template>

<script>
	export default  {

		name: 'contact-lower-cards',

		props: {
			currentContact: Object
		},

		mounted () {

		},

		data () {
			return {

			}
		},

		methods: {

		},

		computed: {

		}
}

</script>