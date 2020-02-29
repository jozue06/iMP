<template>
	<section class="contacts">
		<h1>Contacts</h1>
		<b-table 
			striped 
			hover 
			:items="contacts" 
			:fields="fields"
			:sort-by.sync="sortBy"
			:sort-desc.sync="sortDesc"
			sort-icon-left
			responsive="sm"
			>
			</b-table>
	</section>
</template>

<script>
	import "bootstrap/dist/css/bootstrap.css";
	import "bootstrap-vue/dist/bootstrap-vue.css";
	import { findAllContacts } from '@/data/data'
	
	export default {
		components: {
		},
		name: "Contacts",
		methods: {
		},

		data() {
			let contacts = []; 
			findAllContacts((data) => {	
				data.forEach(c => {
					if (c.record.firstName && c.record.lastName) {
						contacts.push({...c.record});
					}
				});
			});
		
			return {
				sortBy: 'firstName',
				sortDesc: false,
				contacts: contacts,
				
			};
		},
		computed: {
			fields() {
				return Object.keys(this.contacts[0]).map(f => {
					let tmp = {};
					tmp.sortable = true;
					tmp.key = f;

					return tmp
				});
			}
		},
		watch: {

		}
	};
</script>

<style scoped>
	section {
		float: right;
		width: 80%;
	}
	.b-table > thead > th {
		vertical-align: middle;
	}
</style>