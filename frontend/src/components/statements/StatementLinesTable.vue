<template>
	<div class="main-card">
		<div class="card-header mt-4">
			<h4>
				Statement Lines
			</h4>
		</div>
		<b-table v-if="statement.statementLines"
			striped 
			hover 
			ref="selectableTable"
			selectable
			:items="statement.statementLines" 
			:fields="fields"
			:sort-by.sync="sortBy"
			:sort-desc.sync="sortDesc"
			:select-mode="selectMode"
			@row-selected="onRowSelected"
			selected-variant="danger"
			sort-icon-left
			responsive="sm"
		>
			<template v-slot:cell()="data">
				<span class="text-info"> {{ data.value }} </span>
			</template>
			<template v-slot:cell(amount)="data">
				<span class="text-info"> ${{ $formatMoney(data.value) }} </span>
			</template>
			<template v-slot:cell(pledgeAmount)="data">
				<span class="text-info"> ${{ $formatMoney(data.value) }} </span>
			</template>
		</b-table>
	</div>	
</template>

<script>
	import { allowedFields } from "../../constants/tableFields";

	export default  {

		name: 'statementLinesTable',

		components: {

		},

		props: {
			statement: Object,
			selected: Array,
		},

		mounted() {

		},

		data() {
			return {
				sortBy: '',
				sortDesc: false,
				selectMode: 'multi',
			}
		},

		methods: {
			onRowSelected(line) {
				this.$emit("onRowSelected", line);
			},
		},

		computed: {
			fields() {
				let keys = allowedFields.statementLines.map(al => {
					let tmp = {};
					tmp.sortable = true;
					tmp.key = al;
					return tmp;
				});

				return keys;
			}
		}
}

</script>