<template>
	<div class="mx-3">
		<b-row align-v="center">			
			<b-col class="low-cards">
				<label>Contactability Status</label>
				<br>
				<b-icon icon="circle-fill" :variant="$GetStatusColor(currentContact.contactStatus)"></b-icon>
				{{ $GetStatus(currentContact.contactStatus)}}
				<b-form-select
					v-model="currentContact.contactStatus"
					:options="statusOptions"
				>
				</b-form-select>
			</b-col>
			<b-col class="low-cards">
				<p> Financials</p>
				<b-form-group label="Account Number">
					<b-form-input
						type="text"
						v-model="currentContact.accountNumber"
						placeholder="Account Number"
						name="accountNumber"
					></b-form-input>
				</b-form-group> 
				<b-form-group label="Commitment Amount">
					<b-input-group prepend="$">
						<b-form-input
							class="text-right"
							type="text"
							v-model="currentContact.commitmentAmt" 
							placeholder="0.00"
							name="commitmentAmt"
							lazy-formatter
							:formatter="$formatMoney"
						></b-form-input>
					</b-input-group>
				</b-form-group>
			</b-col>
			
			<b-col class="low-cards group-card">
				<p> Contact Groups</p>				
				<div v-if="contactGroups.length > 0" class="mb-2">
					<b-list-group>
						<b-list-group-item 
							v-for="group in contactGroups" 
							:key="group.name" 
							:active="currentContact.contactGroups.includes(group._id)"
							@click="toggleGroupAssign(group)"
						>
							{{ group.name }}
							<b-badge v-if="currentContact.contactGroups.includes(group._id)" variant="secondary" pill>
								Assigned
							</b-badge>
						</b-list-group-item>
					</b-list-group>
				</div>
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import { ContactGroups } from "../../data/contactGroups";
	import { Contacts } from "../../data/contacts";
	import statusCodes from "../../constants/contactStatusCodes"
	export default  {

		name: 'contact-lower-cards',

		props: {
			currentContact: Object
		},

		mounted () {

		},

		data() {
			return {
				contactGroups: [],
				loading: false,
				statusCodes: statusCodes,
				selectedStatus: this.currentContact.status,
			}
		},

		created() {
			let groups = []; 
				
			ContactGroups.getContactGroups().then((data) => {
				data.forEach(g => {
					if (g && g.name) {
						g.id = g._id;
						groups.push({...g});
					}
				});
			});

			this.contactGroups = groups;
		},

		methods: {
			toggleGroupAssign(clickedGroup) {
				this.loading = true;
				
				if (clickedGroup.contacts.includes(this.currentContact._id) || this.currentContact.contactGroups.pop(clickedGroup._id)) {
					clickedGroup.contacts.pop(this.currentContact._id);
					this.currentContact.contactGroups.pop(clickedGroup._id);
				} else {
					clickedGroup.contacts.push(this.currentContact._id);
					this.currentContact.contactGroups.push(clickedGroup._id);
				}
				ContactGroups.save(clickedGroup).then(res => {
					
				});
			},
		},

		computed: {
			statusOptions() {
				return statusCodes.map(code => ({value: code, text: this.$GetStatus(code)}))
			}
		}
}

</script>

<style lang="scss" scoped>
	.group-card {
		overflow: scroll;
	}
</style>