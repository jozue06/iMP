<template>
	<section class="contacts">
		<h1>Contacts</h1>
		<!-- <b-form-group label="Selection mode:" label-cols-md="4">
			<b-form-select v-model="selectMode" :options="modes" class="mb-3"></b-form-select>
		</b-form-group> -->
		<b-table  
			striped 
			hover 
			ref="selectableTable"
			selectable
			:items="contacts" 
			:fields="fields"
			:sort-by.sync="sortBy"
			:sort-desc.sync="sortDesc"
			:select-mode="selectMode"
			@row-selected="onRowSelected"
			selected-variant="danger"
			sort-icon-left
			responsive="sm"
			>
			<template v-slot:cell(selected)="{ rowSelected }">
				<template v-if="rowSelected">
					<span aria-hidden="true">&check;</span>
					<span variant="danger" class="sr-only">Selected</span>
				</template>
				<template v-else>
					<span aria-hidden="true">&nbsp;</span>
					<span class="sr-only">Not selected</span>
				</template>
			</template>
			</b-table>
			<b-button size="sm" @click="selectAllRows">Select all</b-button>
			<b-button size="sm" @click="clearSelected">Clear selected</b-button>
			<b-button variant="danger" size="sm" @click="deleteSelected">Delete selected</b-button>
	</section>
	
</template>

<script>
	import "bootstrap/dist/css/bootstrap.css";
	import "bootstrap-vue/dist/bootstrap-vue.css";
	import { findAllContacts, deleteContacts } from '@/data/data'
	
	export default {
		components: {
		},
		name: "Contacts",
		methods: {
			onRowSelected(contacts) {
				this.selected = contacts;
			},

			selectAllRows() {
				this.$refs.selectableTable.selectAllRows()
			},

			clearSelected() {
				this.$refs.selectableTable.clearSelected()
			},

			deleteSelected() {
				deleteContacts(this.selected).then(() => {
					this.selected.forEach(selected => {
						const index = this.contacts.findIndex(c => c.id === selected.id)
						this.contacts.splice(index, 1)
					});
				});
			}
		},

		data() {
			let contacts = []; 
			findAllContacts().then((data) => {	
				data.forEach(c => {
					if (c.record.firstName && c.record.lastName) {
						c.record.id = c._id;
						contacts.push({...c.record});
					}
				});
			});

			return {
				sortBy: 'firstName',
				sortDesc: false,
				contacts: contacts,
				selectMode: 'multi',
			};
		},
		
		computed: {
			fields() {
				return Object.keys(this.contacts[0]).map(f => {
					let tmp = {};
					tmp.sortable = true;

					if (f == "id"){
						tmp.key = "";
					} else {
						tmp.key = f;

					}
					return tmp;
				});
			}
		},
	};
</script>

<style scoped>
	section {
		float: right;
		width: 80%;
	}
</style>