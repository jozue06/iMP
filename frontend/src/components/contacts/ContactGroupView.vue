<template>
	<section>
		<div class="main-card">
			<h1>{{currentGroup.name}}</h1>
			<div v-if="contactLines.length > 0">
				<b-table
					striped 
					hover 
					ref="contactTable"
					:items="contactLines" 
					:fields="fields"
					sort-icon-left
					responsive="sm"
				>
					<template v-slot:cell(edit)="data">
						<span @click="showContactModal(data.item)" class="text-info custom-hover">edit</span>
					</template>
					<template v-slot:cell()="data">	
						<router-link
							:to="{ name: 'contactFullView', params: { contactId: data.item._id } }"
							v-slot="{ href, navigate}"
						>
							<span :href="href" @click="navigate" class="text-info custom-hover"> {{ data.value }} </span>
						</router-link>
					</template>
					<template v-slot:cell(contactStatus)="data">	
						<b-icon icon="circle-fill" :variant="$GetStatusColor(data.item.contactStatus)"></b-icon>
					</template>
				</b-table>
			</div>
			<NoResults 
				message="No Contacts assigned to this Group" 
				subtitle="Click here to assign a Contact" 
				v-else-if="contactLines.length == 0"
				@handleBtnClick="showContactModal(null)"
			/>
		</div>	
		<ContactModal 
			ref="contactModal" 
			v-bind:contact="selectedContact" 
			@refresh="refresh"
		/>
	</section>
</template>

<script>
	import { ContactGroups } from '../../data/contactGroups';
	import { Contacts } from '../../data/contacts';
	import { allowedFields } from '@/constants/tableFields';
	import NoResults from '../NoResults'
	import ContactModal from '../Modals/ContactModal'

	export default  {

		name: 'contact-group-view',

		components: {
			NoResults,
			ContactModal,
		},

		props: {

		},

		created() {
			if (this.$router.currentRoute.params.groupId) {
				ContactGroups.getContactGroup(this.$router.currentRoute.params.groupId).then(res => {
					this.currentGroup = res;					
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
				selectedContact: {},
				selectMode: 'multi',
			}
		},

		methods: {
			onRowSelected(contact) {
				this.selected = contact;
			},

			selectAllRows() {
				this.$refs.contactTable.selectAllRows();
			},

			clearSelected() {
				this.$refs.contactTable.clearSelected();
			},
			
			showContactModal() {

			},

			refresh() {

			},
		},

		computed: {
			fields() {
				let keys = Object.keys(this.contactLines[0]).map(f => {
					let tmp = {};
					tmp.sortable = true;

					if (allowedFields.groupContactList.includes(f)) {
						tmp.key = f;
					} else { 
						tmp.key = "";
					}

					return tmp;
				});

				keys.unshift("edit");

				return keys;
			}
		}
}

</script>