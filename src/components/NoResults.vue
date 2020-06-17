<template>
	<div>
		<h4
			class="m-4 text-danger font-italic text-center" 
			v-bind:message="message"
			v-bind:subtitle="subtitle"
			>
			{{ message }}
		</h4>
		<b-button class="mb-2" variant="success" @click="handleBtnClick"> {{ subtitle }}</b-button>
	</div>
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