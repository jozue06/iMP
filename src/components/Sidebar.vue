<template>
  <div style="width: 200px;">
	<h1>Some Text</h1>
    <SidebarMenuList />
  </div>
</template>

<script>
    import SidebarMenuList from './SidebarMenuList/SidebarMenuList.vue'
	export default {
		name: "sidebar",
		props: {
			
        },
        components: {
            SidebarMenuList
        }
	};
</script>