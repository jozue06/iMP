<template>
	<section>
		<div v-if="logginIn" id="login">
			<h1>Login</h1>
			<form>
				<input type="text" name="username" v-model="input.username" placeholder="Username" />
				<input type="password" name="password" v-model="input.password" placeholder="Password" />
			</form>
			<button type="button" v-on:click="login()">Login</button>
			<button type="button" v-on:click="switchToSignUp()">Sign Up ?</button>
		</div>
		<div v-else id="login">
			<h1>Signup</h1>
			<form>
				<input type="text" name="username" v-model="input.username" placeholder="Username" />
				<input type="password" name="password" v-model="input.password" placeholder="Password" />
			</form>
			<button type="button" v-on:click="signup()">Sign Up</button>
		</div>
	</section>
</template>

<script>
	import axios from "axios";
	export default {
		name: 'Login',
		data() {
			return {
				logginIn: true,
				input: {
					username: "",
					password: ""
				}
			}
		},
		methods: {
			login() {				
				if (this.input.username != "" && this.input.password != "") {
					let obj = {
						username: this.input.username,
						password: this.input.password
					}
					axios.post('http://localhost:9090/user/login', obj).then(res => {
						console.log('res', res);
						localStorage.setItem("jwt", res.token)
						this.$router.replace("/contacts");
					})
					.catch(e => {
						console.log('eeek ', e.response);
						if (e.response.status == 401) {
							this.$Notification("Error", `No User Found`, "warning", "", 3000);
								this.input = {}
						}
					});
				} else {
					this.$Notification("Error", `A username and password must be present`, "warning", "", 3000);
					console.log("A username and password must be present");
				}
			},

			signup() {
				if (this.input.username != "" && this.input.password != "") {
					let obj = {
						username: this.input.username,
						password: this.input.password
					}
					axios.post('http://localhost:9090/user/register', obj).then(res => {
						console.log('res', res);
						this.$emit("authenticated", true);

						this.$router.replace("/contacts");
					}).catch(e => {
						console.log('eeek ', e);
						this.input = {}
						this.$Notification("Error", `${e.response.data.message}`, "warning", "", 3000);

					});
				} else {
					this.$Notification("Error", `A username and password must be present`, "warning", "", 3000);
					console.log("A username and password must be present");
				}
			},

			switchToSignUp() {
				this.logginIn = !this.logginIn;
			}
		}
	}
</script>

<style scoped>
	#login {
		width: 500px;
		border: 1px solid #CCCCCC;
		background-color: #FFFFFF;
		margin: auto;
		margin-top: 200px;
		padding: 20px;
	}
</style>