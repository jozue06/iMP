<template>
	<div id="app">
		<!-- <Header title="Welcome"/> -->
		<Sidebar sidebarTitle="iMP"/>
		<Container />
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
		}
	}
</script>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
	.side-bar ul {
		list-style-type: none;
		padding: 0;
	}

	.side-bar li {
		display: inline-block;
		margin: 0 10px;
	}
	
	.side-bar a {
		color: #42b983;
	}
</style>