<template>
	<section class="sidebar-menu-list">
		<h5 class="chevron-toggle"
			v-b-toggle="accordianId" 
			:class="visible ? null : 'collapsed'"
			:aria-expanded="visible ? 'true' : 'false'"
			aria-controls="accordianId"
			@click="visible = !visible"
		>
			{{ title }}
		</h5>

		<b-collapse v-bind:id="accordianId">
			<ul id="sidebar">
				<li
					v-for="(item) in itemList.items"
					v-bind:item="item"
					v-bind:key="item.report"
					v-bind:route="item.route"
				>
					<router-link to="/addContact">
						+ <span class="normal-text">{{ item.childMsg }}</span>
					</router-link>
				</li>
			</ul>
		</b-collapse>
	</section>
</template>

<script>
	export default  {
		props: {
			title: String,
			itemList: Object,
			accordianId: String,
		},
		data() {
			return {
				visible: false,
			}
		}
	}
</script>

<style scoped lang="scss">
	.chevron-toggle:after {
		content: "X";
		float: left;
		padding-left: 10px;
		padding-right: 0;
		color: red;
		transition: transform 0.5s;
		transform-origin: -10px -10px;
	}

	.chevron-toggle.collapsed:after {
		transform: rotateZ(90deg);
	}

	.sidebar-menu-list {
		padding-top: 2%;
		text-align: left;

		ul {
			list-style: none;
		}

		a {
			text-decoration : none;
		}

		.normal-text {
			color: #42b983;
		}

		h5 {
			text-align: center;
		}
	}
</style>