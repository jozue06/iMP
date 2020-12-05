<template>
	<div class="sidebar clearfix">
		<router-link to="/">
			<h1 class="no-active">
				{{ sidebarTitle }}
			</h1>
		</router-link>	
		<SidebarMenuList title="Menu" v-bind:itemList=sections.mainSection accordianId="collapse-1" />
		<!-- <SidebarMenuList title="New Records" v-bind:itemList=sections.newRecordsSection accordianId="collapse-2" /> -->
		<!-- <SidebarMenuList title="Import & Export" v-bind:itemList=sections.importExportSection accordianId="collapse-3" /> -->
		<b-button @click="logout">
			logout
		</b-button>
	</div>
</template> 

<script>
	import SidebarMenuList from './SidebarMenuList.vue';
	import { sidebarSections } from '@/constants/sidebarSections';
	export default {
		name: "sidebar",
		props: {
			sidebarTitle: String
		},
		components: {
			SidebarMenuList
		},
		data() {
			return {
				sections: sidebarSections,
			}
		},
		methods: {
			logout() {	
				localStorage.removeItem("jwt");
				this.$router.replace("/login");
			}
		}
	};
</script>