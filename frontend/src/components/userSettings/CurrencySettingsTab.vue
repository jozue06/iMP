<template>
	<div>
		<div v-if="currentSettings && currentSettings.defaultCurrency">
			<h6 class="text-left mb-4 primary-title">
				<b>Your Default currency is currently: {{currentSettings.defaultCurrency}}</b>
			</h6>
		</div>
		<b-table
			ref="selectableTable"
			selectable
			:items="currencyList" 
			@row-selected="onRowSelectedToAdd"
			selected-variant="danger"
			sort-icon-left
			responsive="sm"
			sticky-header=true
			:no-border-collapse=true
			select-mode="multi"
		/>
			<b-button 
				class="mx-2" 
				variant="danger" 
				size="sm" 
				:disabled="selectedToAdd == 0" 
				v-bind:selectedToAdd="selectedToAdd"
				v-b-modal.confirmCurrencyModal>
					Add To List
			</b-button>
		<div v-if="currentSettings.userCurrencies && currentSettings.userCurrencies.length">
			{{ $consoleLog('currentSettings.userCurrencies list? ', currentSettings.userCurrencies) }}
			
			<b-table
				ref="selectableTable"
				selectable
				:items="currentSettings.userCurrencies" 
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
				v-b-modal.confirmDefaultCurrencyModal>
					Set Default
			</b-button>
		</div>
		<ConfirmModal 
			id="confirmCurrencyModal" 
			title="Add Selected Currency to List?" 
			v-bind:message="confirmAddMessage" 
			@handleConfirm="handleConfirmAdd" 
		/>

		<ConfirmModal 
			id="confirmDefaultCurrencyModal" 
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
			currencyList: Array,
			currentSettings: Object,
		},

		mounted() {

		},

		data() {
			return {
				selected: [],
				selectedToAdd: [],
			}
		},

		methods: {
			onRowSelected(currency) {
				this.selected = currency;
			},

			onRowSelectedToAdd(currency) {
				this.selectedToAdd = currency;
			},

			handleConfirm() {
				this.currentSettings.defaultCurrency = this.selected[0].code;
				this.selected = [];
				this.$emit("saveSettings");
			},

			handleConfirmAdd() {
				this.selectedToAdd.forEach(c => {
					this.currentSettings.userCurrencies.push(c);
				});
				this.selectedToAdd = [];
				this.$emit("saveSettings");
			}
		},

		computed: {
			confirmSetDefaultMessage() {
				let currencyName;
				if (this.selected.length) {
					currencyName = this.selected[0].name
				}
				return `Are you sure you would like to set ${currencyName} to be your Default Currency?`;
			},

			confirmAddMessage() {
				let currencyName;
				if (this.selectedToAdd.length) {
					currencyName = this.selectedToAdd[0].name
				}
				return `Are you sure you would like to add ${currencyName} to be your Currency List?`;
			}
		}
}

</script>