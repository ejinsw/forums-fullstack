<script lang="ts">
	import { goto } from '$app/navigation';
	import ContentHolder from '$lib/components/ContentHolder.svelte';

	export let data;

</script>

<div class="m-4 flex flex-col gap-4">
	<ContentHolder items={data.posts} title="Recent Posts" link="/posts/recent" />
	
</div>