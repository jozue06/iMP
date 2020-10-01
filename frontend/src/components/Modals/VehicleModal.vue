<template>
	<section>
		<b-modal top ref="vehicleModal" title="Vehicle Info" hide-footer v-bind:currentVehicle="currentVehicle">

		</b-modal>

	</section>
</template>

<script>
	export default  {

		name: 'vehicleModal',

		components: {
			
		},

		props: {
			currentVehicle: Object,
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