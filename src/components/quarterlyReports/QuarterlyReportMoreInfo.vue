<template>
	<div class="sub-card">
		<b-row class="mx-2">
			<b-col cols="6" class="my-2" style="border-right: solid 1px #ced4da;">
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
			<b-col cols="6">
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
		<b-row class="mx-2 justify-content-around" style="border-top: solid 1px #ced4da;">
			<b-col cols="2" class="my-2">
				<b-form-group class="mr-1" label="non-agwm income">
					<b-input-group prepend="$">
						<b-form-input 
							class="text-right"
							type="text"
							required
							name="codeDescription"
						>
						</b-form-input>
					</b-input-group>
				</b-form-group> 
			</b-col>
			<b-col cols="2" class="my-2">
				<b-form-group class="mr-1" label="SDR numbers">
					<b-input-group>
						<b-form-input 
							class="text-right"
							type="text" 
							required
							name="codeDescription"
						>
						</b-form-input>
					</b-input-group>
				</b-form-group> 
			</b-col>
			<b-col cols="2" class="my-2">
				<b-form-group class="mr-1" label="SDR balance">
					<b-input-group prepend="$">
						<b-form-input 
							class="text-right"
							type="text" 
							required
							name="codeDescription"
						>
						</b-form-input>
					</b-input-group>
				</b-form-group> 
			</b-col>
			<b-col cols="2" class="my-2">
				<b-form-group class="mr-1" label="other funds held">
					<b-input-group prepend="$">
						<b-form-input 
							class="text-right"
							type="text"
							required
							name="codeDescription"
						>
						</b-form-input>
					</b-input-group>
				</b-form-group> 
			</b-col>
		</b-row>
		<b-row class="ml-2 mr-2">
			<b-col cols="4" class="my-2">
				<b-form-group class="mr-1" label="personal offerings retained">
					<b-input-group prepend="$">
						<b-form-input 
							class="text-right"
							type="text"
							required
							name="codeDescription"
						>
						</b-form-input>
					</b-input-group>
				</b-form-group> 
			</b-col>
			<b-col cols="4" class="my-2">
				<b-form-group class="mr-1" label="deficit reimbursement">
					<b-input-group prepend="$">
						<b-form-input 
							class="text-right"
							type="text"
							required
							name="codeDescription"
						>
						</b-form-input>
					</b-input-group>
				</b-form-group> 
			</b-col>
			<b-col cols="4" class="my-2">
				<b-form-group class="mr-1" label="Other AGWM income">
					<b-input-group prepend="$">
						<b-form-input 
							class="text-right"
							type="text"
							required
							name="codeDescription"
						>
						</b-form-input>
					</b-input-group>
				</b-form-group> 
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