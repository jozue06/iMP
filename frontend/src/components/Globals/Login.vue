<template>
	<section>
		<b-form id=login>
			<div class="mx-2">
				<b-row>
					<b-col cols="6">
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
					<b-col cols="6">
						<b-form-group label="Password">
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
				<div v-if="loggingIn">
					<b-button variant="primary" class="mr-4" :disabled="loading" @click="login">
						Login
						<b-spinner v-if="loading" small type="grow"></b-spinner>
					</b-button>

					<b-button variant="secondary" size="sm" class="float-right" type="button" @click="switchToSignUp">
						Sign Up ?
					</b-button>
				</div>
				<div v-else>
					<b-button variant="primary" :disabled="loading" @click="signup">
						Sign Up
						<b-spinner v-if="loading" small type="grow"></b-spinner>
					</b-button>
					<b-button  variant="secondary" size="sm" class="float-right" type="button" @click="switchToSignUp">
						Login ?
					</b-button>
				</div>
				<div class="mt-4 mb-0">
					<router-link to="/forgot">
						<p class="mt-4 mb-0">Forgot Password</p>
					</router-link>	
				</div>
			</div>
		</b-form>
	</section>
</template>

<script>
	import axios from "axios";
	import getApi from "../../utils/getApi"
	export default {
		name: 'Login',
		data() {
			return {
				loggingIn: true,
				loading: false,
				input: {
					username: "",
					password: ""
				}
			}
		},
		methods: {
			async login() {			
				if (this.input.username != "" && this.input.password != "") {
					this.loading = true;
					let obj = {
						username: this.input.username,
						password: this.input.password
					}
					let apiAddress = getApi();
					await axios.post(`${apiAddress}user/login`, obj).then(res => {
						localStorage.setItem("jwt", res.data.token)
						this.loading = false;
						this.$router.replace("/contacts");

					})
					.catch(e => {
						this.loading = false;
						this.$Notification("Error", `${e.response.data.message}` , "warning", "", 6000);
						this.input = {}

					});
				} else {
					this.$Notification("Error", `A username and password must be present`, "warning", "", 6000);
				}
			},

			signup() {
				if (this.input.username != "" && this.input.password != "") {
					this.loading = true;
					let obj = {
						username: this.input.username,
						password: this.input.password
					}
					let apiAddress = getApi();
					axios.post(`${apiAddress}user/register`, obj).then(res => {
						this.loading = false;
						localStorage.setItem("jwt", res.data.token);
						this.$router.replace("/contacts");
					}).catch(e => {
						this.input = {}
						this.$Notification("Error", `${e.response.data.message}`, "warning", "", 6000);
						this.loading = false;
					});
				} else {
					this.$Notification("Error", `A username and password must be present`, "warning", "", 6000);
				}
			},

			switchToSignUp() {
				this.loggingIn = !this.loggingIn;
			}
		}
	}
</script>