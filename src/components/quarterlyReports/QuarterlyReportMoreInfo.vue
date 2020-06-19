<template>
	<div class="sub-card">
		<b-row class="mr-2">
			<b-col class="my-2" style="border-right: solid 1px #ced4da;">
				<label>
					Statment Info
				</label>
				<b-col>
					<b-row v-if="statments.length > 0" class="align-items-center">
						<b-col>
							what?
						</b-col>
					</b-row>
					<b-row v-else class="align-items-center">
						<b-col cols="12">
							<b-button variant="primary" class="m-2" size="sm">+ Add statment info</b-button>
						</b-col>
					</b-row>
				</b-col>
			</b-col>
			<b-col>
				<label>Other</label>
				<b-row v-if="otherIncomeLines.length > 0" class="align-items-center">
					<b-col>
						what?
					</b-col>
				</b-row>
				<b-row v-else class="align-items-center">
					<b-col cols="12">
						<b-button variant="primary" class="m-2" size="sm">+ Add other or misc income</b-button>
					</b-col>
				</b-row>
			</b-col>
		</b-row>
	</div>
</template>

<script>
	export default  {

		name: 'quarterly-report-more-info',

		props: {

		},

		mounted () {

		},

		data () {
			return {
				temp: '',
				statments: [],
				otherIncomeLines: [],
			}
		},

		methods: {

		},

		computed: {

		}
}

</script>

<style lang="scss" scoped>
	#collapse-info > {
		width:  200%;
		display: block !important;
		color: red;
	}
</style>