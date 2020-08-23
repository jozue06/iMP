<template>
	<div id="app">
		<Sidebar sidebarTitle="iMP"/>
		<Container />
	</div>
</template>

<script>
	import Container from './components/Container.vue'
	import Sidebar from './components/Sidebar.vue'
	import Header from './components/Header.vue'
	import { getSession } from "./utils/session";
	import axios from "axios";

	export default {
		name: 'App',
		components: {
			Container,
			Sidebar,
			Header
		},

		data() {
			return {
				loading: true,
			}
		},

		mounted() {
			getSession().then(res => {				
				if (res == false) {
					this.$router.replace({ name: "login" });
				}
			});
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