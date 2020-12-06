
<template>
	<b-table
		striped 
		hover 
		ref="selectableTable"
		selectable
		:items="statements" 
		:fields="fields"
		:sort-by.sync="sortBy"
		:sort-desc.sync="sortDesc"
		:select-mode="selectMode"
		@row-selected="onRowSelected"
		selected-variant="danger"
		sort-icon-left
		responsive="sm"
	>
		<template v-slot:cell(amountOne)="data">
			<router-link
				:to="{ name: 'statementView', params: { statementId: data.item._id } }"
				v-slot="{ href, navigate}"
			>
				<span :href="href" @click="navigate" class="text-info"> ${{ $formatMoney(data.value) }} </span>
			</router-link>
		</template>

		<template v-slot:cell(dateOne)="data">
			<router-link
				:to="{ name: 'statementView', params: { statementId: data.item._id } }"
				v-slot="{ href, navigate}"
			>
				<span :href="href" @click="navigate" class="text-info"> {{ data.value }} </span>
			</router-link>
		</template>

		<template v-slot:cell(amountTwo)="data">
			<router-link
				:to="{ name: 'statementView', params: { statementId: data.item._id } }"
				v-slot="{ href, navigate}"
			>
				<span :href="href" @click="navigate" class="text-info"> ${{ $formatMoney(data.value) }} </span>
			</router-link>
		</template>

		<template v-slot:cell(dateTwo)="data">
			<router-link
				:to="{ name: 'statementView', params: { statementId: data.item._id } }"
				v-slot="{ href, navigate}"
			>
				<span :href="href" @click="navigate" class="text-info"> {{ data.value }} </span>
			</router-link>
		</template>

		<template v-slot:cell(amountThree)="data">
			<router-link
				:to="{ name: 'statementView', params: { statementId: data.item._id } }"
				v-slot="{ href, navigate}"
			>
				<span :href="href" @click="navigate" class="text-info"> ${{ $formatMoney(data.value) }} </span>
			</router-link>
		</template>

		<template v-slot:cell(dateThree)="data">
			<router-link
				:to="{ name: 'statementView', params: { statementId: data.item._id } }"
				v-slot="{ href, navigate}"
			>
				<span :href="href" @click="navigate" class="text-info"> {{ data.value }} </span>
			</router-link>
		</template>
		
		<template v-slot:cell(statementLines)="data">
				<router-link
				:to="{ name: 'statementView', params: { statementId: data.item._id } }"
				v-slot="{ href, navigate}"
			>
				<span :href="href" @click="navigate" class="text-info"> {{ data.value.length }} </span>
			</router-link>
		</template>
	</b-table>
</template>

<script>

	import { allowedFields } from "../../constants/tableFields";
	export default  {

		name: 'statementsListTable',

		components: {

		},

		props: {
			statements: Array,
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
				let keys = allowedFields.statements.map(al => {
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