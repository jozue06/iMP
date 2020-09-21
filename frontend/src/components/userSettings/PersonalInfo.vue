<template>
	<div>
		<h1>personal-info Component</h1>
		<b-form-group label="First Name">
			<b-form-input
				type="text"
				v-model="currentSettings.firstName"
				placeholder="First Name"
				name="firstName"
			></b-form-input>
		</b-form-group> 
		<b-form-group label="Last Name">
			<b-form-input
				type="text"
				v-model="currentSettings.lastName"
				placeholder="Last Name"
				name="lastName"
			></b-form-input>
		</b-form-group> 
	</div>
</template>

<script>
	export default  {

		name: 'personalInfo',

		components: {

		},

		props: {
			currentSettings: Object,
		},

		mounted() {

		},

		data() {
			return {

			}
		},

		methods: {

		},

		computed: {

		}
}

</script>