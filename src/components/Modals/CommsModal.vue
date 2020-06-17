<template>
	<section>
		<b-modal centered ref="commsModal" title="comms-modal Component" hide-footer v-bind:commsLine="commsLine">
				<h1>comms-modal Component</h1>
			<b-row>
				<b-col>
					<b-form-group class="date-picker" label="Date">
						<DatePicker
							class="actual"
							v-model="commsLine.date"
						>
						</DatePicker>
					</b-form-group>
				</b-col>
				<b-col>
					<b-form-group class="date-picker" label="Time">
						<TimePicker
							class="actual"
							use12-hours format="h:mm A"
							:minute-step="15"
							v-model="commsLine.time"
						>
						</TimePicker>
					</b-form-group>
				</b-col>
			</b-row>
		</b-modal>
	</section>
</template>

<script>
	import { DatePicker, TimePicker } from 'ant-design-vue';
	export default  {

		name: 'commsModal',
		
		components: {
			DatePicker,
			TimePicker,
		},

		props: {
			commsLine: Object,
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

<style lang="scss" scoped>
	.date-picker {
		width: 130px;
	}

</style>