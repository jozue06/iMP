<template>
	<div>
		<b-row class="justify-content-around">
			<b-col cols="2" class="my-2">
				<b-form-group>
					<label>Cents Per Mile</label>
					<b-input-group prepend="$">
						<b-form-input 
							v-model=currentSettings.carCentsPerMile
							class="text-right"
							type="text" 
							name="carCentsPerMile"
							lazy-formatter
							:formatter="$formatMoney"
						>
						</b-form-input>
					</b-input-group>
				</b-form-group> 
			</b-col>
			<b-col cols="2" class="my-2">
				<b-form-group>
					<label>trailerCentsPerMile</label>
					<b-input-group prepend="$">
						<b-form-input 
							v-model=currentSettings.trailerCentsPerMile
							class="text-right"
							type="text" 
							name="trailerCentsPerMile"
							lazy-formatter
							:formatter="$formatMoney"
						>
						</b-form-input>
					</b-input-group>
				</b-form-group> 
			</b-col>
			<b-col cols="2" class="my-2">
				<b-form-group>
					<label>trailerLodgingPrice</label>
					<b-input-group prepend="$">
						<b-form-input 
							v-model=currentSettings.trailerLodgingPrice
							class="text-right"
							type="text" 
							name="trailerLodgingPrice"
							lazy-formatter
							:formatter="$formatMoney"
						>
						</b-form-input>
					</b-input-group>
				</b-form-group> 
			</b-col>
		</b-row>
		<b-row class="justify-content-around">
			<b-col cols="2" class="my-2">
				<b-form-group>
					<label>totalPledgesRequired</label>
					<b-input-group prepend="$">
						<b-form-input 
							v-model=currentSettings.totalPledgesRequired
							class="text-right"
							type="text" 
							name="totalPledgesRequired"
							lazy-formatter
							:formatter="$formatMoney"
						>
						</b-form-input>
					</b-input-group>
				</b-form-group> 
			</b-col>
				<b-col cols="2" class="my-2">
				<b-form-group>
					<label>totalCashRequired</label>
					<b-input-group prepend="$">
						<b-form-input 
							v-model=currentSettings.totalCashRequired
							class="text-right"
							type="text" 
							name="totalCashRequired"
							lazy-formatter
							:formatter="$formatMoney"
						>
						</b-form-input>
					</b-input-group>
				</b-form-group> 
			</b-col>
		</b-row>
	</div>
		<!-- {{currentSettings.carCentsPerMile}}
		{{currentSettings.trailerCentsPerMile}}
		{{currentSettings.trailerLodgingPrice}}
		{{currentSettings.totalPledgesRequired}}
		{{currentSettings.totalCashRequired}} -->

</template>

<script>
	export default  {

		name: 'itineration-settings-tab',

		components: {

		},

		props: {
			currentSettings: Object
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