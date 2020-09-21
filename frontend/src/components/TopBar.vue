<template>
	<section class="mt-2">
		<b-row class="top-bar">
			<b-col>
				<b-button size="sm" class="float-left">
					<router-link to="/">
						<b-icon icon="house-fill"></b-icon>
					</router-link>
				</b-button>
			</b-col>
			<b-col>
				<b-button size="sm" class="float-right">
					<router-link :to="{ name: 'settings', params: { userId: userId } }">
						Settings
						<b-icon icon="gear-wide-connected"></b-icon>
					</router-link>
				</b-button>
			</b-col>
		</b-row>
	</section>
</template>

<script>
	export default  {

		name: 'topBar',

		components: {

		},

		props: {

		},

		mounted() {

		},

		data() {
			return {
				userId: 0,
			}
		},

		methods: {

		},

		computed: {

		}
}

</script>