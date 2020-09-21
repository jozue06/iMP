<template>
	<div class="main-container">
		<router-view />
		<TopBar />
	</div>
</template>
<script>
	import TopBar from "./TopBar";
	export default {
		components: {
			TopBar,
		},
		
		name: "Container",
	};
</script>