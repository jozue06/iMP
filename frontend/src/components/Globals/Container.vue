<template>
	<div class="main-container">
		<TopBar />
		<router-view />
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