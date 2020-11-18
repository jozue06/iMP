<template>
	<div class="row sub-section text-center"  v-bind:expenseLine="expenseLine">
		<b-form-group class="text-center" label="Code And Description">
			<b-input-group class="text-center">
				<b-form-select
					v-model="expenseLine.code"
					:options="options"
					@change="handleSelected"
				>
				</b-form-select>
			</b-input-group>
		</b-form-group> 
	</div>
</template>

<script>
	import { qtrOptions } from "../../constants/quarterlyReportDefaultCategories";
	import { itinOptions } from "../../constants/itinerationReportDefaultCategories";
	import { instaOptions } from "../../constants/insitutionalReportDefaultCategories";

	export default  {
		name: 'expenseCodeSelector',

		props: {
			expenseLine: Object,
			expenseLineType: Number,
		},

		data() {
			return {
			}
		},

		methods: {
			handleSelected(selectedCode) {
				let selectedOption = this.options.find(o => o.value == selectedCode);				
				this.expenseLine.codeDescription = selectedOption.description;
			}
		},

		computed: {
			options() {
				if (this.expenseLineType == 0) {					
					return qtrOptions.map(op => ({ text: op.code + " " + op.description, value: op.code, description: op.description}));
				}
				
				if (this.expenseLineType == 1) {
					return itinOptions.map(op => ({ text: op.code + " " + op.category, value: op.code, description: op.category}));
				}
				
				if (this.expenseLineType == 4) {
					return instaOptions.map(op => ({ text: op.code + " " + op.description, value: op.code, description: op.description}));
				}
				return [];
			},
		}
	}
</script>