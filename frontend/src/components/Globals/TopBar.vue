<template>
	<section>
		<b-row align-v="center" class="top-bar">
			<b-col >
				<router-link to="/">
					<b-button size="sm" class="float-left">
						<b-icon icon="house-fill"></b-icon>
					</b-button>
				</router-link>
			</b-col>
			<b-col>
				<router-link :to="{ name: 'settings' }">
					<b-button size="sm" class="float-right">
						Settings
						<b-icon icon="gear-wide-connected"></b-icon>
					</b-button>
				</router-link>
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