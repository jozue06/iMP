<template>
	<section>
		<b-modal v-bind:id="id" v-bind:title="title" ok-variant="danger" v-bind:message="message" @ok="handleConfirm">
			<p>{{ message }}</p>
		</b-modal>
	</section> 
</template>

<script>
	export default {
		name: "ConfirmModal",
		props: {
			id: String,
			title: String,
			message: String
		},
		methods:{
			handleConfirm() {
				this.$emit('handleConfirm');
			}
		}
	};
</script>