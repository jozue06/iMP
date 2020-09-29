<template>
	<section class="mt-3">
		<b-tabs small card>
			<b-tab title="Personal Info" active>
				<PersonalInfo v-bind:currentSettings="currentSettings"/>
			</b-tab>
		</b-tabs>
	</section>
</template>

<script>
	import PersonalInfo from "./PersonalInfo"
	import { Settings } from "../../data/userSettings"
	export default  {

		name: 'userSettings',

		components: {
			PersonalInfo
		},

		props: {

		},

		mounted() {
			Settings.getSettings().then(res => {			
				this.currentSettings = res.settings ? res.settings : {};
			});
		},

		data() {
			return {
				currentSettings: {},
			}
		},

		methods: {

		},

		computed: {

		}
}

</script>