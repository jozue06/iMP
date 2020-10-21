<template>
	<div class="main-container">
		<LoadingSpinner v-bind:loading="loading" />
		<TopBar v-if="!loading"/>
		<router-view v-if="!loading" />
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