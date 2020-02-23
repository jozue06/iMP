<template>
	<div class="sidebar clearfix">
		<h1>{{ sidebarTitle }}</h1>
		<SidebarMenuList title="New Records" v-bind:itemList=sectionOneItemList accordianId="collapse-1" />
		<SidebarMenuList title="Import & Export" v-bind:itemList=sectionTwoItemList accordianId="collapse-2" />
	</div>
</template> 

<script>
	import SidebarMenuList from './SidebarMenuList.vue'
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
				sectionOneItemList: {
					el: '#sidebar',
					items: [
						{
							report: 1,
							route: "/addContact",
							childMsg: 'add contact' 
						},
						{
							report: 2,
							route: "/reportName",
							childMsg: 'Start qtr report' 
						},
						{
							report: 3,
							route: "/reportName",
							childMsg: 'Start itn report' 
						},
						{
							report: 4,
							route: "/reportName",
							childMsg: 'Start SDR' 
						},
						{
							report: 5,
							route: "/reportName",
							childMsg: 'Start isti report' 
						},
					]
				},
				sectionTwoItemList: {
					el: '#sidebar',
					items: [
						{
							report: 1,
							route: "/addContact",
							childMsg: 'go' 
						},
						{
							report: 2,
							route: "/reportName",
							childMsg: 'to' 
						},
						{
							report: 3,
							route: "/reportName",
							childMsg: 'here' 
						},
						{
							report: 4,
							route: "/reportName",
							childMsg: 'make SDR' 
						},
						{
							report: 5,
							route: "/reportName",
							childMsg: 'make isti report' 
						},
					]
				}
			}
		}
	};
</script>

<style scoped>
	.sidebar{
		position: fixed;
		float: left;
		width: 15%;
		height: 100%;
		border-right: 0.1em solid #42b983;
	}
</style>