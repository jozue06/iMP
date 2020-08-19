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
							:formatter="formatMoney"
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
							:key="group.groupName" 
							:active="currentContact.contactGroupIds.includes(group._id)"
							@click="toggleGroupAssign(group)"
						>
							{{ group.groupName }}
							<b-badge v-if="currentContact.contactGroupIds.includes(group._id)" variant="secondary" pill>
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
	// import { ContactGroup } from "../../data/models/contactGroupModel";
	// import { Contact } from "../../data/models/contactModel";
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
				
			// ContactGroup.find({}).then((data) => {				
			// 	data.forEach(g => {
			// 		if (g && g.groupName) {
			// 			g.id = g._id;
			// 			groups.push({...g});
			// 		}
			// 	});
			// });

			this.contactGroups = groups;
		},

		methods: {
			toggleGroupAssign(clickedGroup) {
				this.loading = true;
				let foundGroup
				// ContactGroup.findOne({ _id: clickedGroup._id }).then(res => {
				// 	foundGroup = res;									
				// 	if (clickedGroup.contacts.includes(this.currentContact._id)) {			
				// 		clickedGroup.contacts.pop(this.currentContact._id);
				// 		this.currentContact.contactGroupIds.pop(foundGroup._id);
				// 	} else {
				// 		clickedGroup.contacts.push(this.currentContact._id);
				// 		this.currentContact.contactGroupIds.push(clickedGroup._id);
				// 	}
					
				// 	foundGroup.contacts = clickedGroup.contacts;
				// 	foundGroup.save().then(res => {						
				// 		this.currentContact.save().then(res => {
				// 			this.$Notification("Success", "Saved the contact and gruoping", "primary", "", 6000);
				// 			this.loading = false;
				// 		}).catch(e => {
				// 			console.log('eeek ', e);
				// 			this.loading = false;
				// 			throw e;
				// 		});
						
				// 	}).catch(e => {
				// 		console.log('eeek ', e);
				// 	})
				// });
			},

			formatMoney(amount) {
				if (isNaN(Number(amount))) {
					return 0;
				}
				let value = Number(amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
				return Number(value);
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