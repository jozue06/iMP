<template>
	<section>
		<b-form id=login>
			<div v-if="step == 0" class="mx-2">
				<b-row>
					<b-col cols="12">
						<b-form-group label="Username">
							<b-form-input
								type="text"
								v-model="input.username"
								placeholder="Username"
								name="Username"
								autocomplete="off"
							></b-form-input>
						</b-form-group>
					</b-col>
				</b-row>
				<b-button variant="primary" class="mr-4" :disabled="loading" @click="postForgot">
					Forgot
					<b-spinner v-if="loading" small type="grow"></b-spinner>
				</b-button>
			</div>
			<div v-else>
				<b-row>
					<b-col cols="12">
						Please Check your email for a reset link;
					</b-col>
				</b-row>
			</div>
		</b-form>
	</section>
</template>

<script>
	import axios from "axios";
	export default {
		name: 'Forgot',
		data() {
			return {
				loading: false,
				step: 0,
				input: {
					username: "",
				}
			}
		},
		methods: {
			async postForgot() {			
				if (this.input.username != "" ) {
					this.loading = true;
					let obj = {
						username: this.input.username,
					}
					await axios.post('http://localhost:9090/user/forgot', obj).then(res => {
						this.loading = false;
						this.step = 1;
					})
					.catch(e => {						
						this.loading = false;
						if (e.response.status == 401) {
							this.$Notification("Error", `No User Found`, "warning", "", 3000);
							this.input = {}
						}
					});
				} else {
					this.$Notification("Error", `A username and password must be present`, "warning", "", 3000);
				}
			},
		}
	}
</script>

<style scoped>
	#login {
		width: 500px;
		background-color: #FFF;
		border-top: solid 1px #fcd7c7;
		margin: auto;
		margin-top: 200px;
		padding: 20px;
		border-radius: 0.25em
	}
</style>