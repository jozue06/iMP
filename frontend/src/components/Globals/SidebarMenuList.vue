<template>
	<div class="sidebar-menu-list">
		<h5
			v-b-toggle=accordianId
		>
			{{ title }}
		</h5>
		<hr />
		<b-collapse v-bind:id="accordianId" accordion="my-accordion">
			<ul id="sidebar">
				<li 
					v-for="(item) in itemList.items"
					v-bind:item="item"
					v-bind:key="item.report"
				>
					<router-link exact :to="{ path: item.route}">
						<span class="not-green">+</span> <span>{{ item.childMsg }}</span>
					</router-link>
				</li>
			</ul>
		</b-collapse>
	</div>
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
	.sidebar-menu-list {
		padding-top: 2%;
		text-align: left;

		ul {
			list-style: none;
			padding-left: 20%;
		}
		
		h5 {
			padding-left: 10%;
		}
	}
</style>