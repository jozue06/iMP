<template>
	<section class="noResults">
		<h4
			class="m-4 text-danger font-italic text-center" 
			v-bind:message="message"
			v-bind:subtitle="subtitle"
			>
			{{ message }}
		</h4>
		<b-button variant="success" @click="handleBtnClick"> {{ subtitle }}</b-button>
	</section>
</template>

<script>
	export default {
	name: "noResults",
	props: {
		message: String,
		subtitle: String,
		linkTo: String,
	},
	methods: {
		handleBtnClick() {
			this.$emit("handleBtnClick");
		}
	}

	}
</script>

<style scoped>
	.noResults {
		float: right;
		width: 100%;
	}
</style>