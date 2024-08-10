<script lang="ts">
	import './global.css';
	import SideBar from '$lib/components/SideBar.svelte';

	export let data;
</script>

<div class=" flex min-h-screen min-w-screen w-full h-full">
	<SideBar user={data.user}></SideBar>

	<main class="w-full">
		<slot />
	</main>
</div>
