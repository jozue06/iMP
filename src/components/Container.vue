<template>
	<div class="main-container">
		<Header v-bind:title=titleToPass />
		<Sidebar sidebarTitle="iMP"/>
		<router-view />
	</div>
</template>
<script>
	import Header from './Header.vue'
	import Sidebar from './Sidebar.vue'

	export default {
		name: "Container",
		props: {
			titleToPass: String
		},
		components: {
			Header,
			Sidebar,
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.main-container {
		margin-left: 0px;
		margin-right: 0px;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		display: inline-block;
		margin: 0 10px;
	}
	
	a {
		color: #42b983;
	}
</style>