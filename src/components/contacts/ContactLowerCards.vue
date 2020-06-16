<template>
	<div>
		<b-row align-v="center">
			{{ $consoleLog('contact ', currentContact) }}
			
			<b-col class="mid-cards">

				checkbox for individual []

				<!-- <br>
				{{ currentContact.firstName }}
				<br>
				{{ currentContact.lastName }}
				<br>
				{{ currentContact.address }}
				<br>
				{{ currentContact.city }}
				<br>
				{{ currentContact.country }}
				<br>
				{{ currentContact.email }}
				<br>
				{{ currentContact.phone }}

				<p v-if="currentContact.notes">
					{{ currentContact.notes.text }}
				</p> -->
			</b-col>
			<b-col class="mid-cards">
				<p> other stuffs 1: </p>
				<!-- church or org name:
				{{ currentContact.orgName }}
				<br>
				<b-form-group label="District">
					<b-form-input
						type="text"
						v-model="currentContact.district"
						required
						placeholder="District?"
						name="disctrict"
					></b-form-input>
				</b-form-group> 
				<b-form-group label="Section">
					<b-form-input
						type="text"
						v-model="currentContact.section"
						required
						placeholder="Section?"
						name="section"
					></b-form-input>
				</b-form-group>  -->
			</b-col>
			<b-col class="mid-cards">
				<p> Contact Groups</p>
				{{ $consoleLog('contactGroups' , contactGroups) }}
				
				<div v-if="contactGroups.length > 0">
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
	import { ContactGroup } from "../../data/models/contactGroupModel";
	import { Contact } from "../../data/models/contactModel";
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
			}
		},

		created() {
			let groups = []; 
				
			ContactGroup.find({}).then((data) => {				
				data.forEach(g => {
					if (g && g.groupName) {
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
				let foundGroup
				ContactGroup.findOne({ _id: clickedGroup._id }).then(res => {
					foundGroup = res;									
					if (clickedGroup.contacts.includes(this.currentContact._id)) {			
						clickedGroup.contacts.pop(this.currentContact._id);
						this.currentContact.contactGroupIds.pop(foundGroup._id);
					} else {
						clickedGroup.contacts.push(this.currentContact._id);
						this.currentContact.contactGroupIds.push(clickedGroup._id);
					}
					
					foundGroup.contacts = clickedGroup.contacts;
					foundGroup.save().then(res => {						
						this.currentContact.save().then(res => {
							this.$Notification("Success", "Saved the contact and gruoping", "primary", "", 6000);
							this.loading = false;
						}).catch(e => {
							console.log('eeek ', e);
							this.loading = false;
							throw e;
						});
						
					}).catch(e => {
						console.log('eeek ', e);
					})
				});			

				
			}
		},

		computed: {

		}
}

</script>