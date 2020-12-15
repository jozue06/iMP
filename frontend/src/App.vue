<template>
	<div id="app">
		<Sidebar v-if="!loading" sidebarTitle="iMP"/>
		<Container v-bind:loading="loading"/>
	</div>
</template>

<script>
	import Container from './components/Globals/Container.vue'
	import Sidebar from './components/Globals/Sidebar.vue'
	import Header from './components/Globals/Header.vue'
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
				theme: "",

			}
		},

		mounted() {
			if (this.$router.currentRoute.params && !this.$router.currentRoute.params.token) {				
				getSession().then(res => {
					if (res == false) {
						this.loading = false;
						this.$router.push("/login");
					} else {
						this.loading = false
						
						this.theme = res.data.theme;
						let bodyElement = document.body;
						bodyElement.classList.add("app-background");
						
						let htmlElement = document.documentElement;
						let theme = this.theme;

						if (theme === 'dark') {
							htmlElement.setAttribute('theme', 'dark')
						} else {
							htmlElement.setAttribute('theme', 'light');
						}
					}
				});
				
			} else {
				this.loading = false;
			}
		},
	}
</script>
<style src='grapesjs/dist/css/grapes.min.css'>
</style>
<style src='grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.css'>
</style>
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