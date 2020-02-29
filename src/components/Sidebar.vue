<template>
	<div class="sidebar clearfix">
		<h1>{{ sidebarTitle }}</h1>
		<SidebarMenuList title="Records" v-bind:itemList=sections.mainSection accordianId="collapse-1" />
		<SidebarMenuList title="New Records" v-bind:itemList=sections.newRecordsSection accordianId="collapse-2" />
		<SidebarMenuList title="Import & Export" v-bind:itemList=sections.importExportSection accordianId="collapse-3" />
	</div>
</template> 

<script>
	import SidebarMenuList from './SidebarMenuList.vue';
	import { sidebarSections } from '@/helpers/sidebarSections';
	export default {
		name: "sidebar",
		props: {
			sidebarTitle: String
		},
		components: {
			SidebarMenuList
		},
		data () {
			return {
				sections: sidebarSections,
			}
		}
	};
</script>

<style scoped>
	.sidebar{
		position: fixed;
		float: left;
		width: 20%;
		height: 100%;
		border-right: 0.1em solid #42b983;
	}
</style>