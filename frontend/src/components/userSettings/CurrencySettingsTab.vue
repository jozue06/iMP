<template>
	<div>
		<b-table
			ref="selectableTable"
			selectable
			:items="currencyList" 
			@row-selected="onRowSelected"
			selected-variant="danger"
			sort-icon-left
			responsive="sm"
			sticky-header=true
			:no-border-collapse=true
			select-mode="single"
		/>
		<b-button 
			class="mx-2" 
			variant="danger" 
			size="sm" 
			:disabled="selected == 0" 
			v-bind:selected="selected"
			v-b-modal.confirmCurrencyModal>
				Set Default
		</b-button>

		<ConfirmModal 
			id="confirmCurrencyModal" 
			title="Set Selected Currency as Default?" 
			v-bind:message="confirmSetDefaultMessage" 
			@handleConfirm="handleConfirm" 
		/>
	</div>
</template>

<script>
	import ConfirmModal from "../Modals/ConfirmModal"
	export default  {

		name: 'currency-settings-tab',

		components: {
			ConfirmModal
		},

		props: {
			currencyList: Array
		},

		mounted() {

		},

		data() {
			return {
				selected: [],
			}
		},

		methods: {
			onRowSelected(currency) {
				this.selected = currency;
			},

			handleConfirm() {
				
			}
		},

		computed: {
			confirmSetDefaultMessage() {
				let currencyName;
				if (this.selected.length) {
					currencyName = this.selected[0].name
				}
				return `Are you sure you would like to set ${currencyName} to be your Default Currency?`;
			}
		}
}

</script>