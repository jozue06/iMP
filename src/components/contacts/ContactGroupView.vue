<template>
	<section>
		<div class="main-card">
			<h1>{{currentGroup.groupName}}</h1>
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
						<span @click="showContactModal(data.item)" class="text-info">edit</span>
					</template>
						<template v-slot:cell(firstName)="data">	
						<router-link
							:to="{ name: 'contactFullView', params: { contactId: data.item._id } }"
							v-slot="{ href, route, navigate}"
						>
							<span :href="href" @click="navigate" class="text-info"> {{ data.item.firstName }} </span>
						</router-link>
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
	import { ContactGroup } from '../../data/models/contactGroupModel';
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