<template>
	<section>
		<b-form-group label="Contact Search">
			<b-input-group >
				<template #append>
					<b-input-group-text v-if="searchLoading"><b-spinner></b-spinner></b-input-group-text>
					<b-input-group-text v-else><b-icon icon="search"></b-icon></b-input-group-text>
				</template>
				
				<b-form-input class="no-glow" v-model="textValue" type="text" @update="onChange" debounce="1000"></b-form-input>
			</b-input-group>
		</b-form-group>
		<div v-if="results.length == 0 && textValue && !searchLoading && !selectedContact">
			<span class="text-info"> No Results Found </span>
		</div>
		
		<b-table
			striped 
			hover 
			:items="results"
			:fields="fields"
			ref="searchResultsTable"
			sort-icon-left
			responsive="sm"
		>
			<template v-slot:cell()="data">
				<span @click="contactClicked(data.item)" class="text-info"> {{ data.value }} </span>
			</template>
		</b-table>
	</section>
</template>

<script>
	import { Contacts } from "../../data/contacts";
	import { allowedFields } from '@/constants/tableFields';
	export default  {
		name: 'contactSearchComponent',

		data() {
			return {
				results: [],
				textValue: "",
				searchLoading: false,
				selectedContact: false,
			}
		},

		methods: {
			contactClicked(rowItem) {
				this.$emit("contactClicked", rowItem);
				this.selectedContact = true;
				this.results = [];
			},
			
			onChange() {
				this.searchLoading = true;
				setTimeout(this.find(), 1000);
			},

			find() {
				Contacts.search(this.textValue).then(foundContacts => {
					this.results = foundContacts;
					this.searchLoading = false;
				}).catch(e => {
					console.error('eel ', e);
					this.searchLoading = false;
				});
			}
		},

		computed: {
			fields() {
				if (this.results.length) {
					let keys = Object.keys(this.results[0]).map(f => {
							let tmp = {};
						tmp.sortable = true;

						if (allowedFields.searchResults.includes(f)) {
							tmp.key = f;
						} else { 
							tmp.key = "";
						}

						return tmp;
					});

					return keys;
				} 
				return [];
			}
		}
	}
</script>

<style lang="scss" scoped>
	.input-group-text {
		height: 38px;
	}
</style>