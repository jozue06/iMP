<template>
	<div class="main-card" >
		<div class="card-header mt-4">
			<h4>
				Statement Lines
			</h4>
		</div>
		<b-table v-if="statement.statementLines && statement.statementLines.length"
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
				<span @click="showStatementLineModal(data.item)" class="text-info"> {{ data.value }} </span>
			</template>
			<template v-slot:cell(amount)="data">
				<span @click="showStatementLineModal(data.item)" class="text-info"> ${{ $formatMoney(data.value) }} </span>
			</template>
			<template v-slot:cell(pledgeAmount)="data">
				<span @click="showStatementLineModal(data.item)" class="text-info"> ${{ $formatMoney(data.value) }} </span>
			</template>
		</b-table>

		<NoResults 
			v-else
			message="No Statement Lines Found" 
			subtitle="+ Add a Statement Line" 
			@handleBtnClick="showStatementLineModal(null)"
		/>
	</div>	
</template>

<script>
	import { allowedFields } from "../../constants/tableFields";
		import NoResults from "../Globals/NoResults.vue";

	export default  {

		name: "statementLinesTable",

		components: {
			NoResults

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

			showStatementLineModal(item) {
				this.$emit("showStatementLineModal", item);
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