<template>
	<div class="main-container">
		<LoadingSpinner v-bind:loading="loading" />
		<TopBar v-if="!loading"/>
		<WebSiteBuilderView />
		<router-view v-if="!loading" />
	</div>
</template>
<script>
	import TopBar from "./TopBar";
	import LoadingSpinner from "./LoadingSpinner";
	import WebSiteBuilderView from "../WebSiteBuilderView";

	export default {
		components: {
			TopBar,
			LoadingSpinner,
			WebSiteBuilderView
		},

		props: {
			loading: Boolean,
		},
		
		name: "Container",
	};
</script>