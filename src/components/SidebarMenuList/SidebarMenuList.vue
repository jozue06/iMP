<template lang="html">
	<section class="sidebar-menu-list">
		<ul id="sidebar">
			<li
				v-for="(item) in items"
				v-bind:item="item"
				v-bind:key="item.report"
			>
				<router-link to="/item.route">
				+ <span class="normal-text">{{ item.childMsg }}</span>
				</router-link>
			</li>
		</ul>
	</section>
</template>

<script>

	export default  {
		name: 'sidebar-menu-list',
		props: [],
		mounted () {
		},
	
		data () {
			return {
				el: '#sidebar',
				items: [
					{
						report: 1,
						route: "/reportName",
						childMsg: 'add contact' 
					},
					{
						report: 2,
						route: "/reportName",
						childMsg: 'Start qtr report' 
					},
					{
						report: 3,
						route: "/reportName",
						childMsg: 'Start itn report' 
					},
					{
						report: 4,
						route: "/reportName",
						childMsg: 'Start SDR' 
					},
					{
						report: 5,
						route: "/reportName",
						childMsg: 'Start isti report' 
					},
				]
			}
		},

		methods: {
			onClick: function (report, childMsg) {
				alert(`going to report # ${report} - ${childMsg}`)
			}
		},

		computed: {

		}
	}
</script>

<style scoped lang="scss">
	.sidebar-menu-list {
		text-align: left;
		ul {
			list-style: none;
		}
		a {
			text-decoration : none;
		}
		.normal-text {
			color: #2c3e50
		}
	}
</style>
