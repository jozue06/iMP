<template>
	<div class="main-container">
		<router-view @authenticated="setAuthenticated" />
		<router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace>Logout</router-link>
	</div>
</template>
<script>
	export default {
		name: "Container",

		data() {
			return {
				authenticated: false,
			}
		},

		mounted() {
			if (!this.authenticated) {
				this.$router.replace({ name: "login" });
			}
		},
		
		methods: {
			setAuthenticated(status) {
				this.authenticated = status;
			},
			
			logout() {
				this.authenticated = false;
			}
		}
	};
</script>