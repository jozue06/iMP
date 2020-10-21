<template>
	<div v-bind:loading="loading" class="text-center">		
		<b-spinner class="ml-6" style="width: 13rem; height: 13rem;" variant="primary" v-if="loading" large type="grow"></b-spinner>
	</div>
</template>

<script>
	export default  {
		name: 'loadingSpinner',
		props: {
			loading: Boolean,
		},
	}
</script>