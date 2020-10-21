<template>
	<div class="main-container">
		<LoadingSpinner v-bind:loading="loading" />
		<TopBar />
		<router-view />
	</div>
</template>
<script>
	import TopBar from "./TopBar";
	import LoadingSpinner from "./LoadingSpinner";

	export default {
		components: {
			TopBar,
			LoadingSpinner,
		},

		props: {
			loading: Boolean,
		},
		
		name: "Container",
	};
</script>