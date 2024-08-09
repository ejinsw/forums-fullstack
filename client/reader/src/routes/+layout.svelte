<script>
	import './global.css';
	import SideBar from '$lib/components/SideBar.svelte';
</script>

<div class=" flex min-h-screen min-w-screen w-full h-full">
	<SideBar class=""></SideBar>

	<main>
		<slot />
	</main>
</div>
