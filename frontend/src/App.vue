<template>
	<div id="app">
		<!-- <Header title="Welcome"/> -->
		<Sidebar sidebarTitle="iMP"/>
		<Container />
		<!-- <router-view /> -->
	</div>
</template>

<script>
	import Container from './components/Container.vue'
	import Sidebar from './components/Sidebar.vue'
	import Header from './components/Header.vue'

	export default {
		name: 'App',
		components: {
			Container,
			Sidebar,
			Header
		},
	}
</script>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
	}

	.side-bar ul {
		list-style-type: none;
		padding: 0;
	}

	.side-bar li {
		display: inline-block;
		margin: 0 10px;
	}
</style>