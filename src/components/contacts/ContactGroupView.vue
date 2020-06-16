<template>
	<section>
		<div class="main-card">
			<h1>{{currentGroup.groupName}}</h1>
			<div v-if="contactLines.length > 0">
				<b-table
					striped 
					hover 
					ref="selectableTable"
					selectable
					:items="contactLines" 
					:fields="fields"
					:select-mode="selectMode"
					@row-selected="onRowSelected"
					selected-variant="danger"
					sort-icon-left
					responsive="sm"
				>
					<template v-slot:cell(edit)="data">	
						<span @click="showGroupModal(data.item)" class="text-info">edit</span>
					</template>
					<template v-slot:cell(groupName)="data">	
						<router-link
							:to="{ name: 'groupView', params: { groupId: data.item._id } }"
							v-slot="{ href, route, navigate}"
						>
							<span :href="href" @click="navigate" class="text-info"> {{ data.item.groupName  }} </span>
						</router-link>
					</template>
					<template v-slot:cell(contacts)="data">
						<p>
							{{ data.item.contacts.length }}
						</p>
					</template>
				</b-table>
			</div>
			<div v-else>
				gruop with no cs
			</div>	
		</div>	
	</section>
</template>

<script>
	import { ContactGroup } from '../../data/models/contactGroupModel';
	export default  {

		name: 'contact-group-view',

		props: {

		},

		created() {
			if (this.$router.currentRoute.params.groupId) {
				ContactGroup.find( { _id: this.$router.currentRoute.params.groupId }, { populate: true } ).then(res => {
					this.currentGroup = res[0];
					this.contactLines = this.currentGroup.contacts;
				}).catch(e => {
					console.log(' Report.find eek ', e);
					throw e;
				});
			}
		},

		data() {
			return {
				contactLines: [],
				currentGroup: {},
				sortBy: 'groupName',
				sortDesc: false,
				selected: "",
				selectMode: 'multi',
			}
		},

		methods: {
			onRowSelected(contact) {
				this.selected = contact;
			},

			selectAllRows() {
				this.$refs.selectableTable.selectAllRows();
			},

			clearSelected() {
				this.$refs.selectableTable.clearSelected();
			},
		},

		computed: {
			fields() {
				console.log('this.contactLines[0]' , this.contactLines);
				let keys;
				if (this.contactLines.length > 0) {
					keys= Object.keys(this.contactLines[0]).map(f => {
						let tmp = {};
						tmp.sortable = true;
						if (f == "groupName") {
							tmp.key = f;
						} else if (f == "contacts") {
							tmp.key = f;
						}  else { 
							tmp.key = "";
						}

						return tmp;
					});

					keys.unshift("edit");
				}

				return keys;
			}
		}
}

</script>