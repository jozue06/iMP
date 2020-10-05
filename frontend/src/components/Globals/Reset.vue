<template>
	<section>		
		<b-form id=login>
			<div class="mx-2">
				<b-row>
					<b-col cols="12">
						<b-form-group label="New Password">
							<b-form-input
								type="password"
								v-model="input.password"
								placeholder="Password"
								name="Username"
								autocomplete="off"
							></b-form-input>
						</b-form-group>
					</b-col>
				</b-row>
				<b-button variant="primary" class="mr-4" :disabled="loading" @click="reset">
					Reset Password
					<b-spinner v-if="loading" small type="grow"></b-spinner>
				</b-button>
			</div>
		</b-form>
	</section>
</template>

<script>
	import axios from "axios";
	import getApi from "../../utils/getApi"
	export default {
		name: 'Reset',
		data() {
			return {
				logginIn: true,
				loading: false,
				input: {
					username: "",
				}
			}
		},
		methods: {
			async reset() {			
				if (this.input.password != "") {
					this.loading = true;
					let obj = {
						password: this.input.password,
						token: this.$router.currentRoute.params.token
					}
					let apiAddress = getApi();
					await axios.post(`${apiAddress}user/reset`, obj).then(res => {
						this.loading = false;
						this.$router.replace("/login");
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