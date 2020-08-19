<template>
	<section>
		<label>Contact Search</label>
		 <b-form-input v-model="textValue" type="text" @change="onChange" debounce="1000"></b-form-input>
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
					<span @click="rowClicked(data.item)" class="text-info"> {{ data.value }} </span>
				</template>
			</b-table>
	</section>
</template>

<script>
	// import { Contact } from "../data/models/contactModel";
	import { allowedFields } from '@/constants/tableFields';
	export default  {
		
		name: 'contact-search-component',

		components: {

		},

		props: {

		},

		mounted() {

		},

		data() {
			return {
				results: [],
				textValue: ""
			}
		},

		methods: {
			rowClicked(rowItem) {
				this.$emit("rowClicked", rowItem);
				this.results = [];
			},
			
			onChange() {
				setTimeout(this.find(), 5000);
			},

			find() {
				let orArray = [
					{
						firstName: this.textValue.toLowerCase(),
					},
					{
						firstName: this.textValue.toUpperCase(),
					},
					{
						firstName: this.textValue[0].toUpperCase() + this.textValue.slice(1),
					},
					{
						lastName: this.textValue.toLowerCase(),
					},
					{
						lastName: this.textValue.toUpperCase(),
					},
					{
						lastName: this.textValue[0].toUpperCase() + this.textValue.slice(1),
					},
					{
						city: this.textValue.toLowerCase(),
					},
					{
						city: this.textValue.toUpperCase(),
					},
					{
						city: this.textValue[0].toUpperCase() + this.textValue.slice(1),
					},
					{
						country: this.textValue.toLowerCase(),
					},
					{
						country: this.textValue.toUpperCase(),
					},
					{
						country: this.textValue[0].toUpperCase() + this.textValue.slice(1),
					},
					{
						address: this.textValue.toLowerCase(),
					},
					{
						address: this.textValue.toUpperCase(),
					},
					{
						address: this.textValue[0].toUpperCase() + this.textValue.slice(1),
					},
					{
						email: this.textValue.toLowerCase(),
					},
					{
						email: this.textValue.toUpperCase(),
					},
					{
						email: this.textValue[0].toUpperCase() + this.textValue.slice(1),
					},
					{
						phone: this.textValue.toLowerCase(),
					},
					{
						phone: this.textValue.toUpperCase(),
					},
					{
						phone: this.textValue[0].toUpperCase() + this.textValue.slice(1),
					},
					{
						orgName: this.textValue.toLowerCase(),
					},
					{
						orgName: this.textValue.toUpperCase(),
					},
					{
						orgName: this.textValue[0].toUpperCase() + this.textValue.slice(1),
					}
				];
				// Contact.find({ $or: orArray }).then(res => {
				// 	this.results = res;
				// }).catch(e => {
				// 	console.log('eeee' , e);
				// });
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