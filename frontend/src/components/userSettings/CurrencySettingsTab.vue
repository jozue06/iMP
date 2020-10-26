<template>
	<div>
		<div v-if="currentSettings && currentSettings.defaultCurrency">
			<h6 class="text-left mb-4 primary-title">
				<b>Your Default currency is currently: {{currentSettings.defaultCurrency}}</b>
			</h6>
		</div>
	
		<div v-if="currentSettings.userCurrencies && currentSettings.userCurrencies.length">
			<h2>
				Your Currency List:
			</h2>
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
				class="mx-2 my-4" 
				variant="danger" 
				size="sm" 
				:disabled="selected == 0" 
				v-bind:selected="selected"
				v-b-modal.confirmDefaultCurrencyModal>
					Set Default
			</b-button>
			<b-button 
				class="mx-2 my-4" 
				variant="danger" 
				size="sm" 
				:disabled="selected == 0" 
				v-bind:selected="selected"
				v-b-modal.confirmRemoveCurrencyModal>
					Remove
			</b-button>
		</div>
		<div v-else>
			<h2>
				Please select one or more currencies from the supported list to add to your currency settings
			</h2>
		</div>

		<b-row class="justify-content-around">
				<b-col class="my-2">
					<b-button size="sm" v-b-toggle.collapse-info variant="info">Supported Currencies</b-button>
				</b-col>
			</b-row>

			<b-collapse id="collapse-info">
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
			</b-collapse>
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

		<ConfirmModal 
			id="confirmRemoveCurrencyModal" 
			title="Remove the Selected Currency?" 
			v-bind:message="confirmSetDefaultMessage" 
			@handleConfirm="handleConfirmDelete" 
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
					if (!this.currentSettings.userCurrencies.includes(c)) {
						this.currentSettings.userCurrencies.push(c);
					}
				});
				this.selectedToAdd = [];
				this.$emit("saveSettings");
			},

			handleConfirmDelete() {
				this.selected.forEach(c => {
					if (this.currentSettings.userCurrencies.includes(c)) {
						this.currentSettings.userCurrencies.pop(c);
					}
				});
				this.selected = [];
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