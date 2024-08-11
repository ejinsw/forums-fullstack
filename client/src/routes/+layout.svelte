<script lang="ts">
	import './global.css';
	import SideBar from '$lib/components/SideBar.svelte';

	export let data;
</script>

<div class="flex min-h-screen min-w-screen w-full h-full">
	<div class="sticky top-0 h-screen">
		<SideBar user={data.user}></SideBar>
	</div>

	<main class="w-full min-h-full">
		<slot />
	</main>
</div>
